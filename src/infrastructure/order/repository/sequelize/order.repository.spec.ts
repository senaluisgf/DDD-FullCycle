import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order Repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync()
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('c1', 'Customer 1');
    const address = new Address('Street 1', 1, 'City 1', 'Country 1', 'Zipcode 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('p1', 'Product 1', 100);
    await productRepository.create(product);

    const sut = new OrderRepository();
    const item1 = new OrderItem('i1', product.name, product.id, product.price, 1);
    const order = new Order('o1', customer.id, [item1])
    await sut.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      items: [
        {
          id: item1.id,
          name: item1.name,
          price: item1.price,
          quantity: item1.quantity,
          order_id: order.id,
          product_id: product.id
        }
      ]
    })
  });

  it("Should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('c1', 'Customer 1');
    const address = new Address('Street 1', 1, 'City 1', 'Country 1', 'Zipcode 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('p1', 'Product 1', 100);
    await productRepository.create(product);

    const sut = new OrderRepository();
    const item1 = new OrderItem('i1', product.name, product.id, product.price, 1);
    const order = new Order('o1', customer.id, [item1])
    await sut.create(order);

    const orderFound = await sut.find(order.id);

    expect(orderFound).toStrictEqual(order);
  });

  it("Should return all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('c1', 'Customer 1');
    const address = new Address('Street 1', 1, 'City 1', 'Country 1', 'Zipcode 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('p1', 'Product 1', 100);
    await productRepository.create(product);

    const sut = new OrderRepository();
    const item1 = new OrderItem('i1', product.name, product.id, product.price, 1);
    const item2 = new OrderItem('i2', product.name, product.id, product.price, 2);
    const order1 = new Order('o1', customer.id, [item1])
    const order2 = new Order('o2', customer.id, [item2])
    await sut.create(order1);
    await sut.create(order2);

    const orders = await sut.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  })

  it("Should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer('c1', 'Customer 1');
    const address1 = new Address('Street 1', 1, 'City 1', 'Country 1', 'Zipcode 1');
    customer1.changeAddress(address1);
    await customerRepository.create(customer1);

    const productRepository = new ProductRepository();
    const product1 = new Product('p1', 'Product 1', 100);
    const product2 = new Product('p2', 'Product 2', 200);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const sut = new OrderRepository();
    const item1 = new OrderItem('i1', product1.name, product1.id, product1.price, 1);
    const item2 = new OrderItem('i2', product2.name, product2.id, product2.price, 2);
    const order = new Order('o1', customer1.id, [item1])
    await sut.create(order);

    //verifica se o order encontrado é o mesmo que foi criado
    let orderFound = await sut.find(order.id);
    expect(orderFound).toStrictEqual(order);

    //altera o order
    order.changeItems([item1, item2]);
    await sut.update(order);

    orderFound = await sut.find(order.id);

    expect(orderFound.items.length).toBe(2);
    expect(orderFound.total()).toBe(500);
    expect(orderFound.items).toContainEqual(item1);
    expect(orderFound.items).toContainEqual(item2);
  })

  it("Should throw an error when order is not found", async () => {
    const sut = new OrderRepository();

    expect(async () => {
      await sut.find('-1');
    }).rejects.toThrow('Order not found');
  });
});
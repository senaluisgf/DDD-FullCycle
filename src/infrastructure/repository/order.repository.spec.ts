import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

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
});

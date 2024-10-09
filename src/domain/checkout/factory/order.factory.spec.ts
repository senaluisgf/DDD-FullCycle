import CustomerFactory from "../../customer/factory/customer.factory";
import ProductFactory from "../../product/factory/product.factory";
import OrderFactory from "./order.factory";

describe("Order factory unit tests", () => {
  it("should create an order with a customer and products", () => {
    const customer = CustomerFactory.create("Customer");
    const product = ProductFactory.create('a', 'Product A', 100);
    const order = OrderFactory.create({
      customerId: customer.id,
      items: [
        {
          name: product.name,
          productId: product.id,
          quantity: 1,
          price: product.price,
        },
      ],
    });

    expect(order.id).toBeDefined();
    expect(order.customerId).toBe(customer.id);

    expect(order.items.length).toBe(1);
    expect(order.items[0].id).toBeDefined();
    expect(order.items[0].productId).toBe(product.id);
    expect(order.items[0].name).toBe(product.name);
    expect(order.items[0].price).toBe(product.price);
    expect(order.items[0].quantity).toBe(1);
  });
});

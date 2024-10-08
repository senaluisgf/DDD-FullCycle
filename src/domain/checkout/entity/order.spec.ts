import Order from "./order";
import OrderItem from "./order_item";

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Order('', 'c1', []);
    }).toThrow('Id is required');
  });

  it('should throw error when customerId is empty', () => {
    expect(() => {
      new Order('o1', '', []);
    }).toThrow('CustomerId is required');
  });

  it('should throw error when items is empty', () => {
    expect(() => {
      new Order('o1', 'c1', []);
    }).toThrow('Items are required');
  });

  it('should calculate total', () => {
    const item = new OrderItem('i1', 'Item 1', 'p1', 100, 2);
    const item2 = new OrderItem('i2', 'Item 2', 'p2', 200, 2);
    const order = new Order('o1', 'c1', [item, item2]);
    expect(order.total()).toBe(600);
  });

  it('should throw error remove items ', () => {
    expect(() => {
      const item = new OrderItem('i1', 'Item 1', 'p1', 100, 1);
      const order = new Order('o1', 'c1', [item]);
      order.changeItems([]);
    }).toThrow('Items are required');
  });
});
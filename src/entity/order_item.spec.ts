import OrderItem from "./order_item";

describe('Order Item unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new OrderItem('', 'Item 1', 'p1', 10, 1);
    }).toThrow('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new OrderItem('oi1', '', 'p1', 10, 1);
    }).toThrow('Name is required');
  });

  it('should throw error when productId is empty', () => {
    expect(() => {
      new OrderItem('oi1', 'Item 1', '', 10, 1);
    }).toThrow('ProductId is required');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => {
      new OrderItem('oi1', 'Item 1', 'p1', -10, 1);
    }).toThrow('Price must be greater than zero');
  });

  it('should throw error when quantity is less than zero', () => {
    expect(() => {
      new OrderItem('oi1', 'Item 1', 'p1', 10, -1);
    }).toThrow('Quantity must be greater than zero');
  });

  it('should calculate total', () => {
    const item = new OrderItem('oi1', 'Item 1', 'p1', 10, 2);
    expect(item.orderItemTotal()).toBe(20);
  });
});
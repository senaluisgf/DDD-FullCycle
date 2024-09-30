import Product from "./product";

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Product('', 'Product 1', 100);
    }).toThrow('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Product('p1', '', 100);
    }).toThrow('Name is required');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => {
      new Product('p1', 'Product 1', -1);
    }).toThrow('Price must be greater than zero');
  });

  it('Should throw error when try to change name to empty', () => {
    expect(() => {
      const product = new Product('p1', 'Product 1', 100);
      product.changeName('');
    }).toThrow('Name is required');
  });

  it('should change name', () => {
    const product = new Product('p1', 'Product 1', 100);
    product.changeName('Product 2');
    expect(product.name).toBe('Product 2');
  });

  it('should throw error when try to change price to less than zero', () => {
    expect(() => {
      const product = new Product('p1', 'Product 1', 100);
      product.changePrice(-1);
    }).toThrow('Price must be greater than zero');
  });

  it('should change price', () => {
    const product = new Product('p1', 'Product 1', 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});

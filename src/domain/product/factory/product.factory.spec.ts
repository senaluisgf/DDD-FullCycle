import ProductFactory from "./product.factory";

describe('Product factory unit tests', () => {
  it('should create a product a', () => {
    const product = ProductFactory.create('a', 'Product A', 100);

    expect(product.id).toBeDefined();
    expect(product.constructor.name).toBe('Product');
    expect(product.name).toBe('Product A');
    expect(product.price).toBe(100);
  });

  it('should create a product b', () => {
    const product = ProductFactory.create('b', 'Product B', 100);

    expect(product.id).toBeDefined();
    expect(product.constructor.name).toBe('ProductB');
    expect(product.name).toBe('Product B');
    expect(product.price).toBe(200);
  });

  it('should throw an error when product type is not supported', () => {
    expect(() => ProductFactory.create('c', 'Product C', 100)).toThrow('Product type not supported');
  });
});
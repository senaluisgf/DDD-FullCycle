export default class OrderItem {
  private _id: string;
  private _productId: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(id: string, name: string, productId: string, price: number, quantity: number) {
    this._id = id;
    this._productId = productId;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
    if (this._productId.length === 0) {
      throw new Error('ProductId is required');
    }
    if (this._price <= 0) {
      throw new Error('Price must be greater than zero');
    }
    if (this._quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }

  get price(): number {
    return this._price;
  }
}

import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate();
  }
  validate() {
    if (!this._id.length) {
      throw new Error('Id is required');
    }
    if (!this._customerId.length) {
      throw new Error('CustomerId is required');
    }
    if (this._items.length === 0) {
      throw new Error('Items are required');
    }
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }
}

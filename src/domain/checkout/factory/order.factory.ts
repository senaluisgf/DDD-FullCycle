import { v4 as uuid } from "uuid";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
interface OrderFactoryProps {
  customerId: string;
  items: {
    name: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
}

export default class OrderFactory {
  public static create(props: OrderFactoryProps): Order {
    const items = props.items.map((item) => {
      return new OrderItem(uuid(), item.name, item.productId, item.price, item.quantity);
    });
    return new Order(uuid(),props.customerId, items);
  }
}
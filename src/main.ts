import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer1 = new Customer('c1', 'Luis Sena');
const address1 = new Address('rua 1', 1, "Manaus", "Brasil", '12345-678');
customer1.Address = address1;
customer1.activate();

const item1 = new OrderItem('oi1', 'item 1', 10);
const item2 = new OrderItem('oi2', 'item 2', 20);
const order1 = new Order('o1', customer1.id, [item1, item2])
import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

const customer1 = new Customer('c1', 'Luis Sena');
const address1 = new Address('rua 1', 1, "Manaus", "Brasil", '12345-678');
customer1.address = address1;
customer1.activate();

const item1 = new OrderItem('oi1', 'item 1', 'p1', 10, 1);
const item2 = new OrderItem('oi2', 'item 2', 'p2', 20, 2);
const order1 = new Order('o1', customer1.id, [item1, item2])
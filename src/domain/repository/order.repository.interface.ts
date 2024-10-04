import Order from "../entity/order";
import RepositoryInterface from "./repository-interface";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {
  create(entity: Order): Promise<void>;
  update(entity: Order): Promise<void>;
  find(id: string): Promise<Order>;
  findAll(): Promise<Order[]>;
}
import { Transaction } from "sequelize";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        product_id: item.productId,
        order_id: entity.id
      }))
    }, {
      include: [{ model: OrderItemModel }]
    });
  }

  async update(entity: Order): Promise<void> {
    // Inicia uma transação
    await OrderModel.sequelize.transaction(async (t: Transaction) => {
      // Atualiza a ordem principal
      await OrderModel.update(
        {
          customer_id: entity.customerId,
        },
        {
          where: { id: entity.id },
          transaction: t,
        }
      );

      // Remove todos os itens existentes da ordem
      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction: t,
      });

      // Insere os novos itens da ordem
      await OrderItemModel.bulkCreate(
        entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          product_id: item.productId,
          order_id: entity.id,
        })),
        { transaction: t }
      );
    });
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findByPk(id, {
        include: [{ model: OrderItemModel }]
      });
    } catch (error) {
      throw new Error('Order not found');
    }

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items
        .map((item) => new OrderItem(
          item.id,
          item.name,
          item.product_id,
          item.price,
          item.quantity,
        ))
    );
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }]
    });

    return orderModels.map((orderModel) => new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items
        .map((item) => new OrderItem(
          item.id,
          item.name,
          item.product_id,
          item.price,
          item.quantity,
        ))
    ));
  }
}
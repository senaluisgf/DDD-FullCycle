import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.address.street,
      number: entity.address.number,
      city: entity.address.city,
      country: entity.address.country,
      zipcode: entity.address.zipcode,
    })
  }

  async update(entity: Customer): Promise<void> {
    return
  }

  async find(id: string): Promise<Customer> {
    return
  }

  async findAll(): Promise<Customer[]> {
    return
  }
}
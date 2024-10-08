import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";

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
    try {
      await CustomerModel.findByPk(entity.id);
    } catch (error) {
      throw new Error("Customer not found");
    }

    await CustomerModel.update({
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.address.street,
      number: entity.address.number,
      city: entity.address.city,
      country: entity.address.country,
      zipcode: entity.address.zipcode,
    }, { where: { id: entity.id } });
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findByPk(id);
    } catch (error) {
      throw new Error('Customer not found');
    }

    const customer = new Customer(customerModel.id, customerModel.name);
    customer.addRewardPoints(customerModel.rewardPoints);
    customer.addRewardPoints(customerModel.rewardPoints);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.city,
      customerModel.country,
      customerModel.zipcode,
    )
    customer.changeAddress(address);
    if (customerModel.active) {
      customer.activate();
    }

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    return customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      customer.addRewardPoints(customerModel.rewardPoints);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.city,
        customerModel.country,
        customerModel.zipcode,
      );
      customer.changeAddress(address)
      if (customerModel.active) {
        customer.activate()
      }
      return customer;
    })
  }
}
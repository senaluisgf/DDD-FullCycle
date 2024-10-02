import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer Repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync()
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('c1', 'Customer 1');
    const address = new Address('street 1', 1, 'city 1', 'country 1', 'zipcode 1');
    customer.changeAddress(address);

    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findByPk('c1');

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: 'street 1',
      number: 1,
      city: 'city 1',
      country: 'country 1',
      zipcode: 'zipcode 1',
      active: false,
      rewardPoints: 0,
    })
  })
});
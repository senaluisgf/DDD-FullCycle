import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer Repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
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
  });

  it("Should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('c1', 'Customer 1');
    const address1 = new Address('street 1', 1, 'city 1', 'country 1', 'zipcode 1');
    const address2 = new Address('street 2', 2, 'city 2', 'country 2', 'zipcode 2');
    customer.changeAddress(address1);

    await customerRepository.create(customer);
    let customerModel = await CustomerModel.findByPk('c1');

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
    });

    customer.changeName('Customer 1 updated');
    customer.changeAddress(address2);

    await customerRepository.update(customer);
    customerModel = await CustomerModel.findByPk('c1');

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: 'Customer 1 updated',
      street: 'street 2',
      number: 2,
      city: 'city 2',
      country: 'country 2',
      zipcode: 'zipcode 2',
      active: false,
      rewardPoints: 0,
    });
  });

  it("Should find a customer", async () => {
    const sut = new CustomerRepository();
    const customer = new Customer('c1', 'Customer 1');
    const address = new Address('street 1', 1, 'city 1', 'country 1', 'zipcode 1');
    customer.changeAddress(address);
    customer.activate();
    await sut.create(customer);

    const customerFound = await sut.find(customer.id);

    expect(customer).toStrictEqual(customerFound);
  });

  it("Should throw an error when customer is not found", async () => {
    const sut = new CustomerRepository();

    expect(async () => {
      await sut.find('-1');
    }).rejects.toThrow('Customer not found')
  });

  it("Should return all customers", async () => {
    const sut = new CustomerRepository();
    const customer1 = new Customer('c1', 'Customer 1');
    const customer2 = new Customer('c2', 'Customer 2');
    const address1 = new Address('stree 1', 1, 'city 1', 'country 1', 'zipcode 1');
    const address2 = new Address('stree 2', 2, 'city 2', 'country 2', 'zipcode 2');
    customer1.changeAddress(address1);
    customer2.changeAddress(address2);
    await sut.create(customer1);
    await sut.create(customer2);

    const customerModels = await sut.findAll();

    expect(customerModels.length).toBe(2);
    expect(customerModels).toContainEqual(customer1);
    expect(customerModels).toContainEqual(customer2);
  });
});
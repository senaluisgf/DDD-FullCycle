import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      new Customer('', "Luis Sena");
    }).toThrow("Id is required");
  });
  it("Should throw error when name is empty", () => {
    expect(() => {
      new Customer('c1', "");
    }).toThrow("Name is required");
  });

  it("Should create a deactive customer and change name", () => {
    let customer = new Customer('c1', 'Luis Sena');
    expect(customer.isActive()).toBe(false)

    customer.changeName('Guilherme');

    expect(customer.name).toBe('Guilherme')
  })

  it("Should throw error when try activate a customer without address", () => {
    expect(() => {
      let customer = new Customer('c1', 'Luis Sena');
      customer.activate();
    }).toThrow('Address is mandatory to activate a customer')
  });

  it("Should activate customer", () => {
    const customer = new Customer('c1', 'Luis Sena');
    const address = new Address('rua 1', 1, "cidade 1", "pais 1", '1')
    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive()).toBe(true);
  })

  it("Should deactivate customer", () => {
    const customer = new Customer('c1', 'Luis Sena');
    const address = new Address('rua 1', 1, "cidade 1", "pais 1", '1')
    customer.changeAddress(address);
    customer.activate();

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  })
  
  it("Should throw error when reward points is negative", () => {
    expect(() => {
      let customer = new Customer('c1', 'Luis Sena');
      customer.addRewardPoints(-100);
    }).toThrow("Reward points cannot be negative");
  })

  it("Should add reward points", () => {
    const customer = new Customer('c1', 'Luis Sena');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(100);

    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(200);
  })
});

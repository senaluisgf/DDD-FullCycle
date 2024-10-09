import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Customer");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer");
    expect(customer.constructor.name).toBe("Customer");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Street 1", 1, "City 1", "Country 1", "Zipcode 1");
    const customer = CustomerFactory.createWithAddress("Customer", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer");
    expect(customer.constructor.name).toBe("Customer");
    expect(customer.address).toEqual(address);
  });
});
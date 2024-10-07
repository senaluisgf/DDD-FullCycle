import EventDispatcher from "../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";

describe("Customer created event tests", () => {
  it("should be able to create a customer created event instance", () => {
    const eventDispatcher = new EventDispatcher();
    const eventLog1Handler = new EnviaConsoleLog1Handler();
    const eventLog2Handler = new EnviaConsoleLog2Handler();
    const spyLog1Handler = jest.spyOn(eventLog1Handler, "handle");
    const spyLog2Handler = jest.spyOn(eventLog2Handler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", eventLog2Handler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyLog1Handler).toHaveBeenCalledTimes(1);
    expect(spyLog2Handler).toHaveBeenCalledTimes(1);
  });
});

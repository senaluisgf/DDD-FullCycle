import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should be able to register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toContainEqual(eventHandler);
  });

  it("should be able to unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toContainEqual(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(0);
  });

  it("should be able to unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toHaveLength(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toContainEqual(eventHandler);

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers).toEqual({});
  });

  it("should be able to notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(spyEventHandler).toHaveBeenCalledTimes(0);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 100,
    });

    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
  });
});

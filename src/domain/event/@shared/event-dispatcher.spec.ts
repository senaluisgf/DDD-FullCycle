import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
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
});

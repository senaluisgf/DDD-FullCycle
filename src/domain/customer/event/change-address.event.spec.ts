import EventDispatcher from "../../@shared/event/event-dispatcher";
import ChangeAddressEvent from "./change-address.event";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";

describe("Change address event tests", () => {
  it("should be able to create a change address event instance", () => {
    const eventDispatcher = new EventDispatcher();
    const eventLogHandler = new EnviaConsoleLogHandler();
    const spyLogHandler = jest.spyOn(eventLogHandler, "handle");

    eventDispatcher.register("ChangeAddressEvent", eventLogHandler);

    const changeAddressEvent = new ChangeAddressEvent({
      id: "1",
      name: "Customer 1",
      address: "Address 1",
    });

    eventDispatcher.notify(changeAddressEvent);

    expect(spyLogHandler).toHaveBeenCalledTimes(1);
  });
});
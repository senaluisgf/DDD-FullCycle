class Customer {
  private _id: string;
  private _name: string;
  private _address: string = "";
  private _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (!this._name.length) {
      throw new Error("Name is required");
    }
    if (!this._id.length) {
      throw new Error("Id is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (!this._address.length) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }
  deactivate() {
    this._active = false;
  }

  get name(): string {
    return this._name
  }
}
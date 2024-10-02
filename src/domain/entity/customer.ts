import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

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
    if (this._rewardPoints < 0) {
      throw new Error("Reward points cannot be negative");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (!this._address) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }
  deactivate() {
    this._active = false;
  }
  isActive(): boolean {
    return this._active;
  }
  changeAddress(address: Address) {
    this._address = address;
  }
  addRewardPoints(points: number) {
    this._rewardPoints += points;
    this.validate();
  }

  get name(): string {
    return this._name
  }
  get id(): string {
    return this._id
  }
  get rewardPoints(): number {
    return this._rewardPoints;
  }
  get address(): Address {
    return this._address;
  }
}
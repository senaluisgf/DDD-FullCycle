export default class Address {
  private _street: string;
  private _number: number;
  private _city: string;
  private _country: string;
  private _zipcode: string;

  constructor(street: string, number: number, city: string, country: string, zipcode: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._country = country;
    this._zipcode = zipcode;
    this.validate();
  }

  validate() {
    if (!this._street.length) {
      throw new Error("Street is required");
    }
    if (this._number === 0) {
      throw new Error("Number is required");
    }
    if (!this._city.length) {
      throw new Error("City is required");
    }
    if (!this._country.length) {
      throw new Error("Country is required");
    }
    if (!this._zipcode.length) {
      throw new Error("Zip code is required");
    }
  }

  toString() {
    return `${this._street}, ${this._number} - ${this._city}/${this._country} - ${this._zipcode}`
  }

  get street(): string {
    return this._street;
  }
  get number(): number {
    return this._number;
  }
  get city(): string {
    return this._city;
  }
  get country(): string {
    return this._country;
  }
  get zipcode(): string {
    return this._zipcode;
  }
}
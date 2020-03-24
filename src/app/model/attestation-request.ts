import {Reason} from './reason';

export class AttestationRequest {
  fullname: string;
  birthdate: string;
  address: Address;
  reason: Reason;
}

export class Address {
  // -- adresse complete
  public label: string;
  public name: string;
  public postcode: string;
  public city: string;

  constructor()
  constructor(label: string, name: string, postcode: string, city: string)
  constructor(label?: string, name?: string, postcode?: string, city?: string) {
    this.label = label;
    this.name = name;
    this.postcode = postcode;
    this.city = city;
  }
}


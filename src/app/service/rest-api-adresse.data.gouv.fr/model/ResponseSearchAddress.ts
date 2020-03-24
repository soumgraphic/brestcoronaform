import {Deserializable} from '../../../model/deserializable';

export class ResponseSearchAddress implements Deserializable {
  type: string;
  version: string;
  features: Features[];

  deserialize(input: any): this {
    Object.assign(this, input);

    // Iterate over all features in response and map them to a proper Features model
    this.features = input.features.map(f => new Features().deserialize(f));

    return this;
  }
}

export class Features implements Deserializable {
  properties: Properties;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.properties = new Properties().deserialize(input.properties);
    return this;
  }
}

export class Properties implements Deserializable {
  label: string;
  name: string;
  postcode: string;
  city: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  getFullAddress() {
    return this.name + ' ' + this.postcode + ' ' + this.city;
  }
}

import {Adapter} from './adapter';
import {Injectable} from '@angular/core';
import {Address} from '../../../model/attestation-request';
import {Properties} from '../model/ResponseSearchAddress';

@Injectable({
  providedIn: 'root'
})
export class AddressAdapter implements Adapter<Address> {
  adapt(prop: Properties): Address {
    return new Address(prop.label, prop.name, prop.postcode, prop.city);
  }
}

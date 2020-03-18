import {Reason} from './reason';

export class AttestationRequest {
  fullname: string;
  birthdate: string;
  address: string;
  city: string;
  postalcode: string;
  reason: Reason;
}

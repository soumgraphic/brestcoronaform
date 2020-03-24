import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AppConstants} from '../../utils/AppConstants';
import {catchError, map, retry} from 'rxjs/operators';
import {Address} from '../../model/attestation-request';
import {ResponseSearchAddress} from './model/ResponseSearchAddress';
import {plainToClass} from 'class-transformer';
import {AddressAdapter} from './adapter/address-adapter';

@Injectable({
  providedIn: 'root'
})
export class SearchAddressService {

  constructor(private http: HttpClient, private addressAdapter: AddressAdapter) { }

  private static extractData(res: Response) {
    return res || { };
  }

  /*
  private mapDataToAddress(res: Response) {
    addresses: Address[];
    if (res) {

    }

  }
  */

  /*
  searchFrenchAddress(addressLabel: string): Observable<any> {
    const URL =  AppConstants.URL_API_ADRESSE_GOUV_FR + 'search/?q=' + addressLabel;
    return this.http.get(URL).pipe(
      map(SearchAddressService.extractData));
  }
  */

  /*
  searchFrenchAddress(addressLabel: string): Observable<ResponseSearchAddress> {
    const URL =  AppConstants.URL_API_ADRESSE_GOUV_FR + 'search/?q=' + addressLabel;
    return this.http.get<ResponseSearchAddress>(URL).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  */

  /*
    searchFrenchAddress(addressLabel: string): Observable<ResponseSearchAddress> {
    const URL =  AppConstants.URL_API_ADRESSE_GOUV_FR + 'search/?q=' + addressLabel;
    return this.http.get<ResponseSearchAddress>(URL).pipe(
      map(data => new ResponseSearchAddress().deserialize(data)),
      catchError(this.handleError)
    );
  }
   */

  searchFrenchAddress(addressName: string): Observable<Address[]> {
    const URL =  AppConstants.URL_API_ADRESSE_GOUV_FR + 'search/?q=' + addressName;
    // First Call with api adresse gouv model
    return this.http.get<ResponseSearchAddress>(URL).pipe(
      map(dataResponse => {
        // API Call response getting
        const searchResponse = new ResponseSearchAddress().deserialize(dataResponse);
        // Call to addressAdapter for mapper properties -> address
        return searchResponse.features.map( f => this.addressAdapter.adapt(f.properties));
      }),
      catchError(this.handleError)
    );
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}

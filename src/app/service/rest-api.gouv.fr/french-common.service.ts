import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AppConstants} from '../../utils/AppConstants';

@Injectable({
  providedIn: 'root'
})
export class FrenchCommonService {

  constructor(private http: HttpClient) { }

  private static extractData(res: Response) {
    return res || { };
  }

  searchFrenchCommon(commonName: string): Observable<any> {
    const URL =  'communes' + '?nom=' + commonName + AppConstants.URL_API_GOUV_FR_JSON_FORMAT + AppConstants.URL_API_GOUV_FR_GEOMETRY;
    return this.http.get(AppConstants.URL_API_GOUV_FR + URL).pipe(
      map(FrenchCommonService.extractData));
  }
}

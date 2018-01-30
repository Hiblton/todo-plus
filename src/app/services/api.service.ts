import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getMethod(url: string, options: Object = {}): Observable<any> {
    return this.http.get(url, options).map((res: Response) => res)
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Server error');
      });
  }

  postMethod(url: string, data: Object = {}, options: Object = {}): Observable<any> {
    return this.http.post(url, data, options).map((res: Response) => res)
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Server error');
      });
  }

  putMethod(url: string, data: Object = {}, options: Object = {}): Observable<any> {
    return this.http.put(url, data, options).map((res: Response) => res)
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Server error');
      });
  }

  deleteMethod(url: string, options: Object = {}): Observable<any> {
    return this.http.delete(url, options).map((res: Response) => res)
      .catch((error: any) => {
        return Observable.throw(error.json() || 'Server error');
      });
  }

}

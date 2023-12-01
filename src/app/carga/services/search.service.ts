import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public urlBase: string = environments.urlBase;

  constructor(
    private http: HttpClient
  ) { }

  searchNumber( num_part: string ): Observable<any> {
    return this.http.get(`${this.urlBase}/get-part-information/${num_part}`);
  }
}

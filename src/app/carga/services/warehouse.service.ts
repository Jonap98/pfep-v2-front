import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  public urlBase: string = environments.urlBase;
  public user: string = localStorage.getItem('usuario') ?? '';

  constructor(
    private http: HttpClient
  ) { }

  searchNumber( num_part: string ): Observable<any> {
    return this.http.get(`${this.urlBase}/warehouse/${num_part}`);
  }

  editarInfo( reg: string, part_number: string, ubicacion: string, std_pack: string, min_ubicacion: string ): Observable<any> {
    const data = {
      reg,
      part_number,
      ubicacion,
      std_pack,
      min_ubicacion,
      usuario: this.user,
    };

    return this.http.post(`${this.urlBase}/warehouse/update`, data);
  }

  cargarInfo( part_number: string, ubicacion: string, std_pack: string, min_ubicacion: string ): Observable<any> {
    const data = {
      part_number,
      ubicacion,
      std_pack,
      min_ubicacion,
      usuario: this.user,
    };

    return this.http.post(`${this.urlBase}/warehouse/store`, data);
  }


}

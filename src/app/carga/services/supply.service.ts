import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {

  public urlBase: string = environments.urlBase;
  public user: string = localStorage.getItem('usuario') ?? '';

  constructor(
    private http: HttpClient
  ) { }

  searchNumber( num_part: string ): Observable<any> {
    return this.http.get(`${this.urlBase}/supply/search/${num_part}`);
  }

  editarUbicacion( ubicacion: any ): Observable<any> {

    const data = {
      ubicacion,
      usuario: this.user,
    }

    return this.http.post(`${this.urlBase}/supply/update`, data);

  }

  registrarUbicacion(
    ubicacion: any
  ): Observable<any> {

    const data = {
      part_number: ubicacion.part_number,
      where_used_item: ubicacion.where_used_item,
      delivery_location: ubicacion.delivery_location,
      where_used_line: ubicacion.where_used_line,
      route: ubicacion.route,
      method_of_part_delivery: ubicacion.method_of_part_delivery,
      stop: ubicacion.stop,
      max_units_per_route: ubicacion.max_units_per_route,
      min_units_per_route: ubicacion.min_units_per_route,
      sequenced_part: ubicacion.sequenced_part,
      usuario: this.user,
    };

    return this.http.post(`${this.urlBase}/supply/store`, data);

  }

  eliminarUbicacion( ubicacion: string ): Observable<any> {
    const data = {
      folio: ubicacion,
      usuario: this.user,
    }
    return this.http.post(`${this.urlBase}/supply/delete`, data)
  }


}

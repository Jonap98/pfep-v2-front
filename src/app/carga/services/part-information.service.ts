import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartInformationService {
  public urlBase: string = environments.urlBase;
  public user: string = localStorage.getItem('usuario') ?? '';

  constructor(
    private http: HttpClient
  ) {}

  searchNumber( num_part: string ): Observable<any> {
    return this.http.get(`${this.urlBase}/get-part-information/${num_part}`);
  }

  editarInfo( reg: string, part_number: string, part_description: string, material_group: string, familia: string ): Observable<any> {
    const data = {
      reg,
      part_number,
      part_description,
      material_group,
      familia,
      usuario: this.user,
    }

    return this.http.post(`${this.urlBase}/part-information/update`, data);
  }

  cargarInfo( part_number: string, part_description: string, material_group: string, familia: string ): Observable<any> {
    const data = {
      part_number,
      part_description,
      material_group,
      familia,
      usuario: this.user,
    }

    return this.http.post(`${this.urlBase}/part-information/store`, data);
  }
}

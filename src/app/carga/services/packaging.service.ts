import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { Packaging } from '../interfaces/packaging.interface';

@Injectable({
  providedIn: 'root'
})
export class PackagingService {
  public urlBase: string = environments.urlBase;
  public user: string = localStorage.getItem('usuario') ?? '';

  constructor(
    private http: HttpClient
  ) {}

  searchNumber( num_part: string ): Observable<any> {
    return this.http.get(`${this.urlBase}/packaging/${num_part}`);
  }

  editarInfo( empaque: Packaging ): Observable<any> {

    const data = {
      reg: empaque.reg,
      part_number: empaque.part_number,
      part_weight: empaque.part_weight,
      part_uom: empaque.part_uom,
      part_length: empaque.part_length,
      part_width: empaque.part_width,
      part_height: empaque.part_height,
      unit_load_description: empaque.unit_load_description,
      bc_per_unit_load: empaque.bc_per_unit_load,
      pieces_pallet: empaque.pieces_pallet,
      mixed_load: empaque.mixed_load,
      unit_load_length: empaque.unit_load_length,
      unit_load_width: empaque.unit_load_width,
      unit_load_heght1: empaque.unit_load_heght1,
      unit_load_diameter: empaque.unit_load_diameter,
      base_container_description: empaque.base_container_description,
      qty_base_container: empaque.qty_base_container,
      base_container_length: empaque.base_container_length,
      base_container_width: empaque.base_container_width,
      base_container_height: empaque.base_container_height,
      base_container_diameter: empaque.base_container_diameter,
      vendor: empaque.vendor,
      usuario: this.user,
    }

    return this.http.post(`${this.urlBase}/packaging/update`, data);

   }

   registrarInfo( empaque: Packaging ): Observable<any> {

    const data = {
      part_number: empaque.part_number,
      part_weight: empaque.part_weight,
      part_uom: empaque.part_uom,
      part_length: empaque.part_length,
      part_width: empaque.part_width,
      part_height: empaque.part_height,
      unit_load_description: empaque.unit_load_description,
      bc_per_unit_load: empaque.bc_per_unit_load,
      pieces_pallet: empaque.pieces_pallet,
      mixed_load: empaque.mixed_load,
      unit_load_length: empaque.unit_load_length,
      unit_load_width: empaque.unit_load_width,
      unit_load_heght1: empaque.unit_load_heght1,
      unit_load_diameter: empaque.unit_load_diameter,
      base_container_description: empaque.base_container_description,
      qty_base_container: empaque.qty_base_container,
      base_container_length: empaque.base_container_length,
      base_container_width: empaque.base_container_width,
      base_container_height: empaque.base_container_height,
      base_container_diameter: empaque.base_container_diameter,
      vendor: empaque.vendor,
      usuario: this.user,
    }

    return this.http.post(`${this.urlBase}/packaging/store`, data);

   }
}

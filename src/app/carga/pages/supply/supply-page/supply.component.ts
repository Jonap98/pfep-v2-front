import { Component, OnInit } from '@angular/core';
import { SupplyService } from '../../../services/supply.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Supply } from '../../../interfaces/supply.interface';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.css']
})
export class SupplyComponent implements OnInit {

  public supplyLocations: Supply[] = [];

  public number: string = '';

  constructor(
    private router: Router,
    private supplyService: SupplyService
  ) {

    this.number = localStorage.getItem('part_number') ?? '';

  }

  public list = [];

  ngOnInit(): void {
    if( this.number != '' ) {
      this.supplyService.searchNumber( this.number ).subscribe( resp => {
        if( resp.data ) {
          this.supplyLocations = resp.data;
        }
      })
    }

  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  visibleEdit: boolean = false;
  edit(registro: any): void {
    this.visibleEdit = true;
    this.ubicacion = registro;
  }

  visibleDelete: boolean = false;
  deleteLocation( registro: any ): void {
    this.ubicacion = registro
    this.visibleDelete = true;
  }

  onNext(): void {
    this.router.navigate(['./carga/warehouse', this.supplyLocations[0]]);

  }

  registrarUbicacion( ubicacion: any ): void {
    this.supplyService.registrarUbicacion( ubicacion ).subscribe( resp => {

      this.launchSnackbar( resp.msg );

      this.supplyLocations.unshift( resp.data );

      this.visible = false;
    });

  }

  public ubicacion?: Supply;

  editarUbicacion( ubicacion: any ): void {

    this.supplyService.editarUbicacion( ubicacion ).subscribe( resp => {

      if( resp.data ) {
        this.supplyLocations = this.supplyLocations.map( location => {
          if( location.folio == resp.data.folio )
            return resp.data;
          return location;
        });

      }

      this.launchSnackbar( resp.msg );

      this.visibleEdit = false;

    });

  }

  eliminarUbicacion( ubicacion: string ): void {

    this.supplyService.eliminarUbicacion( ubicacion ).subscribe( resp => {

      if( resp.data ) {
        this.supplyLocations = this.supplyLocations.filter( location => {
          return location.folio != ubicacion;
        });
      }

      this.launchSnackbar( resp.msg );

      this.visibleDelete = false;

    });

  }

  public snackbarMessage: string = '';
  public success: boolean = false;
  launchSnackbar( message: string ) {
    this.snackbarMessage = message;
    this.success = true;

    setTimeout(() => {
      this.success = false;
    }, 3000);
  }

}

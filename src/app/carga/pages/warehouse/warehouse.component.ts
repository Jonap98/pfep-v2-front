import { Component, OnInit } from '@angular/core';
import { SupplyService } from '../../services/supply.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WarehouseService } from '../../services/warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  public warehouseForm?: FormGroup;

  public number: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private warehouseService: WarehouseService
  ) {
    this.number = localStorage.getItem('part_number') ?? '';

    this.warehouseForm = this.fb.group({
      num_part: [this.number ?? '', [ Validators.required ]],
      ubicacion: ['', [ Validators.required ]],
      std_pack: ['', [ Validators.required ]],
      min_ubicacion: ['', [ Validators.required ]],
      is_editing: [false, [ Validators.required ]],
    });
  }

  ngOnInit(): void {
    if( this.number != '' ) {
      this.warehouseService.searchNumber( this.number ).subscribe( resp => {
        if( resp.data ) {
          this.warehouseForm = this.fb.group({
            reg: [ resp.data.reg ?? '' ],
            num_part: [ resp.data.part_number ?? '' ],
            ubicacion: [ resp.data.d_pick_location ?? '' ],
            std_pack: [ resp.data.std_pack ?? '' ],
            min_ubicacion: [ resp.data.min_ubicacion ?? '' ],
            is_editing: [true]
          });
        }
      });
    }

  }

  isValidField( field: string ): boolean | null {
    return this.warehouseForm!.controls[field].errors && this.warehouseForm!.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if( !this.warehouseForm!.controls[field] ) return null;

    const errors = this.warehouseForm!.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Debe ingresar al menos ${ errors['minlength'].requiredLength } caracteres`;
      }
    }

    return null;
  }

  onNext(): void {

    if( this.warehouseForm!.invalid ) {
      this.warehouseForm!.markAllAsTouched();

      return
    }

    if( this.warehouseForm!.value.is_editing == true ) {

      this.warehouseService.editarInfo(
        this.warehouseForm!.value.reg,
        this.warehouseForm!.value.num_part,
        this.warehouseForm!.value.ubicacion,
        this.warehouseForm!.value.std_pack,
        this.warehouseForm!.value.min_ubicacion,
       ).subscribe( resp => {

        this.launchSnackbar(resp.msg);

        this.router.navigate(['./carga/packaging']);

      });

      return

    }

    this.warehouseService.cargarInfo(
      this.warehouseForm!.value.num_part,
      this.warehouseForm!.value.ubicacion,
      this.warehouseForm!.value.std_pack,
      this.warehouseForm!.value.min_ubicacion,
     ).subscribe( resp => {

      this.launchSnackbar(resp.msg);

      this.router.navigate(['./carga/packaging']);

      return;


    });

  }

  public success: boolean = false;
  public snackbarMessage: string = '';

  launchSnackbar( message: string ) {
    this.snackbarMessage = message;
    this.success = true;

    setTimeout(() => {
      this.success = false;
    }, 3000);
  }

}

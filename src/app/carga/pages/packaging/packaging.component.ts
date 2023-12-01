import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PackagingService } from '../../services/packaging.service';

@Component({
  selector: 'app-packaging',
  templateUrl: './packaging.component.html',
  styleUrls: ['./packaging.component.css']
})
export class PackagingComponent implements OnInit {

  public packagingForm?: FormGroup;
  public datos: any;

  public number: string = '';

  constructor(
    private fb: FormBuilder,
    private packagingService: PackagingService
  ) {

    this.number = localStorage.getItem('part_number') ?? '';

    this.packagingForm = this.fb.group({
      part_number: [this.number ?? '', [ Validators.required ]],
      part_weight: ['', [ Validators.required ]],
      part_uom: ['', [ Validators.required ]],
      part_length: ['', [ Validators.required ]],
      part_width: ['', [ Validators.required ]],
      part_height: ['', [ Validators.required ]],
      unit_load_description: ['', [ Validators.required ]],
      bc_per_unit_load: ['', [ Validators.required ]],
      pieces_pallet: ['', [ Validators.required ]],
      mixed_load: ['', [ Validators.required ]],
      unit_load_length: ['', [ Validators.required ]],
      unit_load_width: ['', [ Validators.required ]],
      unit_load_heght1: ['', [ Validators.required ]],
      unit_load_diameter: ['', [ Validators.required ]],
      base_container_description: ['', [ Validators.required ]],
      qty_base_container: ['', [ Validators.required ]],
      base_container_length: ['', [ Validators.required ]],
      base_container_width: ['', [ Validators.required ]],
      base_container_height: ['', [ Validators.required ]],
      base_container_diameter: ['', [ Validators.required ]],
      vendor: ['', [ Validators.required ]],
      is_editing: [ false, [ Validators.required ] ]
    });
  }

  ngOnInit(): void {
     this.packagingService.searchNumber( this.number ).subscribe( resp => {

      if( resp.data ) {
        this.packagingForm = this.fb.group({
          reg: [ resp.data.reg ?? '' ],
          part_number: [ resp.data.part_number ?? '' ],
          part_weight: [ resp.data.part_weight ?? '' ],
          part_uom: [ resp.data.part_uom ?? '' ],
          part_length: [ resp.data.part_length ?? '' ],
          part_width: [ resp.data.part_width ?? '' ],
          part_height: [ resp.data.part_height ?? '' ],
          unit_load_description: [ resp.data.unit_load_description ?? '' ],
          bc_per_unit_load: [ resp.data.bc_per_unit_load ?? '' ],
          pieces_pallet: [ resp.data.pieces_pallet ?? '' ],
          mixed_load: [ resp.data.mixed_load ?? '' ],
          unit_load_length: [ resp.data.unit_load_length ?? '' ],
          unit_load_width: [ resp.data.unit_load_width ?? '' ],
          unit_load_heght1: [ resp.data.unit_load_heght1 ?? '' ],
          unit_load_diameter: [ resp.data.unit_load_diameter ?? '' ],
          base_container_description: [ resp.data.base_container_description ?? '' ],
          qty_base_container: [ resp.data.qty_base_container ?? '' ],
          base_container_length: [ resp.data.base_container_length ?? '' ],
          base_container_width: [ resp.data.base_container_width ?? '' ],
          base_container_height: [ resp.data.base_container_height ?? '' ],
          base_container_diameter: [ resp.data.base_container_diameter ?? '' ],
          vendor: [ resp.data.vendor ?? '' ],
          is_editing: [ true ],
        });
      }
     });



  }

  isValidField( field: string ): boolean | null {
    return this.packagingForm!.controls[field].errors && this.packagingForm!.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if( !this.packagingForm!.controls[field] ) return null;

    const errors = this.packagingForm!.controls[field].errors || {};

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

  onSubmit(): void {

    if( this.packagingForm!.invalid ) {
      this.packagingForm!.markAllAsTouched();

      return;
    }

    if( this.packagingForm!.value.is_editing == true ) {

      this.packagingService.editarInfo( this.packagingForm!.value ).subscribe( resp => {
        this.launchSnackbar( resp.msg );
      });

      return;

    }

    this.packagingService.registrarInfo( this.packagingForm!.value ).subscribe( resp => {
      this.launchSnackbar( resp.msg );

      return;
    })


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

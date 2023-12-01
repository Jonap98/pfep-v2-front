import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supply } from 'src/app/carga/interfaces/supply.interface';

@Component({
  selector: 'editar-ubicacion',
  templateUrl: './editar-ubicacion.component.html',
  styleUrls: ['./editar-ubicacion.component.css'],
})
export class EditarUbicacionComponent implements OnInit {


  public ubicacionForm?: FormGroup;

  @Input()
  public ubicacion: any;

  @Output()
  public onEdit = new EventEmitter();

  public part_number: string = '';

  constructor(
    private fb: FormBuilder
  ) {
    this.part_number = localStorage.getItem('part_number') ?? '';
  }

  ngOnInit(): void {

    this.ubicacionForm = this.fb.group({
      folio: [this.ubicacion.folio, Validators.required],
      num_parte: [this.part_number, Validators.required],
      ubicacion: [this.ubicacion.where_used_line, Validators.required],
      tramo: [this.ubicacion.delivery_location, Validators.required],
      brazo: [this.ubicacion.where_used_item, Validators.required],
      ruta: [this.ubicacion.route, Validators.required],
      metodo_surtido: [this.ubicacion.method_of_part_delivery, Validators.required],
      stop: [this.ubicacion.stop, Validators.required],
      max: [this.ubicacion.max_units_per_route, Validators.required],
      min: [this.ubicacion.min_units_per_route, Validators.required],
      secuenciado: [this.ubicacion.sequenced_part, Validators.required],
    });

  }

  isValidField( field: string ): boolean | null {
    return this.ubicacionForm!.controls[field].errors && this.ubicacionForm!.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if( !this.ubicacionForm!.controls[field] ) return null;

    const errors = this.ubicacionForm!.controls[field].errors || {};

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

  public ubicacionData?: Supply;
  onSubmit(): void {

    if( this.ubicacionForm!.invalid ) {
      this.ubicacionForm!.markAllAsTouched();

      return;
    }

    this.ubicacionData = {
      folio: this.ubicacionForm!.value.folio,
      part_number: this.ubicacionForm!.value.num_parte,
      where_used_item: this.ubicacionForm!.value.ubicacion,
      delivery_location: this.ubicacionForm!.value.tramo,
      where_used_line: this.ubicacionForm!.value.brazo,
      route: this.ubicacionForm!.value.ruta,
      method_of_part_delivery: this.ubicacionForm!.value.metodo_surtido,
      stop: this.ubicacionForm!.value.stop,
      max_units_per_route: this.ubicacionForm!.value.max,
      min_units_per_route: this.ubicacionForm!.value.min,
      sequenced_part: this.ubicacionForm!.value.secuenciado,
    };

    this.onEdit.emit( this.ubicacionData );

  }

}

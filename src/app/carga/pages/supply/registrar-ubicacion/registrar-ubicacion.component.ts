import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supply } from 'src/app/carga/interfaces/supply.interface';

@Component({
  selector: 'registrar-ubicacion',
  templateUrl: './registrar-ubicacion.component.html',
  styleUrls: ['./registrar-ubicacion.component.css']
})
export class RegistrarUbicacionComponent implements OnInit {

  public ubicacionForm?: FormGroup;

  @Output()
  public onRegister = new EventEmitter();

  public part_number: string = '';

  constructor(
    private fb: FormBuilder
  ) {
    this.part_number = localStorage.getItem('part_number') ?? '';
  }

  ngOnInit(): void {

    this.ubicacionForm = this.fb.group({
      num_parte: [this.part_number, Validators.required],
      ubicacion: ['', Validators.required],
      tramo: ['', Validators.required],
      brazo: ['', Validators.required],
      ruta: ['', Validators.required],
      metodo_surtido: ['', Validators.required],
      stop: ['', Validators.required],
      max: ['', Validators.required],
      min: ['', Validators.required],
      secuenciado: ['', Validators.required],
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

    this.onRegister.emit( this.ubicacionData );

    // this.ubicacionForm!.reset();

  }

}

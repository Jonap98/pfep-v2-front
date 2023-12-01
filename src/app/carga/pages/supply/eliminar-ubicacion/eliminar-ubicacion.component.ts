
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'eliminar-ubicacion',
  templateUrl: './eliminar-ubicacion.component.html',
  styleUrls: ['./eliminar-ubicacion.component.css'],
})
export class EliminarUbicacionComponent {

  public ubicacionForm?: FormGroup;

  public selectedLocation: any;

  @Input()
  public ubicacion: any;

  @Output()
  public onDelete = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {

    this.selectedLocation = this.ubicacion;

  }

  onSubmit(): void {

    this.onDelete.emit( this.ubicacion.folio );

  }
}

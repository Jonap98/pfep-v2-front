import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartInformation } from '../../interfaces/part_information.interface';
import { map, pipe, tap } from 'rxjs';
import { SupplyService } from '../../services/supply.service';
import { Supply } from '../../interfaces/supply.interface';
import { PartInformationService } from '../../services/part-information.service';

@Component({
  selector: 'app-parts-information',
  templateUrl: './parts-information.component.html',
  styleUrls: ['./parts-information.component.css']
})
export class PartsInformationComponent implements OnInit {

  public partInfoForm?: FormGroup;

  public partSelected?: PartInformation;
  public number: string = '';

  public locations: Supply[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private partInformationService: PartInformationService
  ) {

    this.number = localStorage.getItem('part_number') ?? '';

    this.partInfoForm = this.fb.group({
      num_part: [this.number ?? '', [ Validators.required ] ],
      descripcion: ['', [ Validators.required ] ],
      familia: ['', [ Validators.required ] ],
      grupo: ['', [ Validators.required ] ],
      is_editing: [ false, [ Validators.required ] ],
    });

  }

  ngOnInit(): void {
    if( this.number != '' ) {
      this.partInformationService.searchNumber( this.number ).subscribe( resp => {
        if( resp.data ) {
          this.partInfoForm = this.fb.group({
            reg: [resp.data.reg ?? ''],
            num_part: [resp.data.part_number ?? ''],
            descripcion: [resp.data.part_description ?? ''],
            familia: [resp.data.family ?? ''],
            grupo: [resp.data.material_group ?? ''],
            is_editing: [true]
          });
        }
      });
    }

  }

  isValidField( field: string ): boolean | null {
    return this.partInfoForm!.controls[field].errors && this.partInfoForm!.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if( !this.partInfoForm!.controls[field] ) return null;

    const errors = this.partInfoForm!.controls[field].errors || {};

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

    if( this.partInfoForm!.invalid ) {
      this.partInfoForm!.markAllAsTouched();

      return;
    }

    if( this.partInfoForm!.value.is_editing == true ) {

      this.partInformationService.editarInfo(
        this.partInfoForm!.value.reg,
        this.partInfoForm!.value.num_part,
        this.partInfoForm!.value.descripcion,
        this.partInfoForm!.value.grupo,
        this.partInfoForm!.value.familia,
       ).subscribe( resp => {

        this.launchSnackbar(resp.msg);

        this.router.navigate(['./carga/supply']);


      });

      return;

    }

    this.partInformationService.cargarInfo(
      this.partInfoForm!.value.num_part,
      this.partInfoForm!.value.descripcion,
      this.partInfoForm!.value.grupo,
      this.partInfoForm!.value.familia,
     ).subscribe( resp => {

      this.launchSnackbar(resp.msg);

      this.router.navigate(['./carga/supply']);


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

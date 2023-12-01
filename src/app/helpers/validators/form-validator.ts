import { FormGroup } from "@angular/forms";

export class FormValidator {

  isValidField( field: string, form: FormGroup ): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  getFieldError( field: string, form: FormGroup ): string | null {
    if( !form.controls[field] ) return null;

    const errors = form.controls[field].errors || {};

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
}

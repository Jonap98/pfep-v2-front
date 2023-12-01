import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  public loginForm?: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [ '', [ Validators.required, Validators.email ]],
      password: [ '', [ Validators.required ]]
    });
  }

  onLogin(): void {
    if( this.loginForm!.invalid ) {
      this.launchSnackbar('Inicio de sesión inválido, por favor revise sus credenciales nuevamente');

      this.loginForm!.reset();
      return;
    }

    this.authService.login(this.loginForm!.value.email, this.loginForm!.value.password)
      .subscribe( user => {
        if( !user.token ) {
          this.launchSnackbar('Inicio de sesión inválido, por favor revise sus credenciales nuevamente');

          this.loginForm!.reset();
          return;
        }

        this.router.navigate(['/']);

      })
  }

  isValidField( field: string ): boolean | null {
    return this.loginForm!.controls[field].errors && this.loginForm!.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if( !this.loginForm!.controls[field] ) return null;

    const errors = this.loginForm!.controls[field].errors || {};

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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Observable, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public urlBase = environments.urlBase;

  public user?: User;

  constructor(
    private http: HttpClient
  ) { }

  get currentUser() {
    if( !this.user ) return undefined;

    return structuredClone( this.user );
  }

  login( email: string, password: string ): Observable<User> {
    const data = { email, password };

    return this.http.post<User>( `${this.urlBase}/login`, data ).pipe(
      tap( user => this.user = user ),
      tap( user => {
        if(user.token) {
          localStorage.setItem( 'token', user.token!.toString());
          localStorage.setItem( 'usuario', user.user!.name!.toString());
          localStorage.setItem( 'role', user.user!.role! )
        }
      }),

    )
  }

  register( name: string, email: string, password: string, role: string ): Observable<any> {
    const data = { name, email, password, role };

    return this.http.post( `${this.urlBase}/register`, data );
  }

  getUsers(): Observable<any> {
    return this.http.get( `${this.urlBase}/get-users` );
  }

  checkAuthentication(): Observable<boolean> {
    if( !localStorage.getItem('token') ) return of(false);

    const token = localStorage.getItem('token');

    return of(true);

  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

}

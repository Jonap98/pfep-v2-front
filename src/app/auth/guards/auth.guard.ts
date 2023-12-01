import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, Route, UrlSegment, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => {
          if( !isAuthenticated )
            this.router.navigate(['../auth']);
        }),
      )
  }

  canMatch( route: Route, segments: UrlSegment[] ): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

  canActivate: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean | Observable<boolean> => {
    return this.checkAuthStatus();
  }
}

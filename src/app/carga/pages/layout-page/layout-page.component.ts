import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {

  public isAuthenticated: boolean = false;

  public sidebarItems: any[] = [];
  public navbarItems: any[] = [];

  public items: MenuItem[] | undefined;

  public readOnly: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}


  ngOnInit(): void {

    this.authService.checkAuthentication().subscribe(
      resp => this.isAuthenticated = resp
    );

    this.sidebarItems = this.isAuthenticated ?
      [
        {
          label: 'Búsqueda',
          url: 'search',
          // readonly: true,
        },
        {
            label: 'NPI',
            url: 'parts-information',
            // readonly: true,
        },
        {
            label: 'Surtimiento',
            url: 'supply',
            // readonly: true,
        },
        {
            label: 'Almacén',
            url: 'warehouse',
            // readonly: true,
        },
        {
            label: 'Empaque',
            url: 'packaging',
            // readonly: true,
        }
      ] : [
        {
          label: 'Búsqueda',
          url: 'search'
        },
      ];

      this.navbarItems = !this.isAuthenticated ? [
        { label: 'Login', icon: 'area', url: '../auth' },
      ] : [];

      this.items = [
        {
          label: 'Búsqueda',
          routerLink: 'search'
        },
        {
            label: 'NPI',
            routerLink: 'parts-information'
        },
        {
            label: 'Surtimiento',
            routerLink: 'supply'
        },
        {
            label: 'Almacén',
            routerLink: 'warehouse'
        },
        {
            label: 'Empaque',
            routerLink: 'packaging'
        }
      ];

  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['./auth']);
  }

}

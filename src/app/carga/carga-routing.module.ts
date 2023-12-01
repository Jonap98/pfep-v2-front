import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PartsInformationComponent } from './pages/parts-information/parts-information.component';
import { SupplyComponent } from './pages/supply/supply-page/supply.component';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';
import { PackagingComponent } from './pages/packaging/packaging.component';
import { SearchComponent } from './pages/search/search.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [ AuthGuard ],
        canMatch: [ AuthGuard ]
      },
      {
        path: 'parts-information',
        component: PartsInformationComponent,
        canActivate: [ AuthGuard ],
        canMatch: [ AuthGuard ]
      },
      {
        path: 'supply',
        component: SupplyComponent,
        canActivate: [ AuthGuard ],
        canMatch: [ AuthGuard ]
      },
      {
        path: 'warehouse',
        component: WarehouseComponent,
        canActivate: [ AuthGuard ],
        canMatch: [ AuthGuard ]
      },
      {
        path: 'packaging',
        component: PackagingComponent,
        canActivate: [ AuthGuard ],
        canMatch: [ AuthGuard ]
      },
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargaRoutingModule { }

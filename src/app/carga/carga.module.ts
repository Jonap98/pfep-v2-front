import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargaRoutingModule } from './carga-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PartsInformationComponent } from './pages/parts-information/parts-information.component';
import { PackagingComponent } from './pages/packaging/packaging.component';
import { SupplyComponent } from './pages/supply/supply-page/supply.component';
import { WarehouseComponent } from './pages/warehouse/warehouse.component';
import { SearchComponent } from './pages/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';

import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { RegistrarUbicacionComponent } from './pages/supply/registrar-ubicacion/registrar-ubicacion.component';
import { ButtonModule } from 'primeng/button';
import { EditarUbicacionComponent } from './pages/supply/editar-ubicacion/editar-ubicacion.component';
import { EliminarUbicacionComponent } from './pages/supply/eliminar-ubicacion/eliminar-ubicacion.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    PartsInformationComponent,
    PackagingComponent,
    SupplyComponent,
    WarehouseComponent,
    SearchComponent,
    RegistrarUbicacionComponent,
    EditarUbicacionComponent,
    EliminarUbicacionComponent
  ],
  imports: [
    CommonModule,
    CargaRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    StepsModule,
    // ToastModule,
    TableModule,
    DialogModule
  ]
})
export class CargaModule { }

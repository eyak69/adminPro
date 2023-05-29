import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './agregar/agregar.component';
import { ListarComponent } from './listar/listar.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SucursalRoutingModule } from './sucursal-routing.module';

@NgModule({
  declarations: [
    AgregarComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SharedModule
  ],
  exports: [
    SucursalRoutingModule,
  ]
})
export class SucursalModule { }

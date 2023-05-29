import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './agregar/agregar.component';
import { ListarComponent } from './listar/listar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProvinciaRoutingModule } from './provincia-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';

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
    ProvinciaRoutingModule
  ]
})
export class ProvinciaModule { }

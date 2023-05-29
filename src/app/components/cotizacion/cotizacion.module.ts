import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import { AgregarComponent } from './agregar/agregar.component';
import { CotizacionRoutingModule } from './cotizacion-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';




@NgModule({
  declarations: [
    ListarComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    CotizacionRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SharedModule,
  ]
})
export class CotizacionModule { }

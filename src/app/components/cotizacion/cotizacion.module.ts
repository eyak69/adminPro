import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './listar/listar.component';
import { AgregarComponent } from './agregar/agregar.component';
import { CotizacionRoutingModule } from './cotizacion-routing.module';



@NgModule({
  declarations: [
    ListarComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    CotizacionRoutingModule
  ]
})
export class CotizacionModule { }

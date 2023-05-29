import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './agregar/agregar.component';
import { ListarComponent } from './listar/listar.component';
import { PaisRoutingModule } from './pais-routing.module';



@NgModule({
  declarations: [
    AgregarComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    PaisRoutingModule
  ]
})
export class PaisModule { }

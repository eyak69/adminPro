import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './agregar/agregar.component';
import { ListarComponent } from './listar/listar.component';



@NgModule({
  declarations: [
    AgregarComponent,
    ListarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProvinciaModule { }

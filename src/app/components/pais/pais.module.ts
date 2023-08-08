import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './agregar/agregar.component';
import { ListarComponent } from './listar/listar.component';
import { PaisRoutingModule } from './pais-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AgregarComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    PaisRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SharedModule 
  ]
})
export class PaisModule { }

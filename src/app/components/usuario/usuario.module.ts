import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { UsuarioRoutingModule } from 'src/app/components/usuario/usuario-routing.module';
import { SharedModule } from '../shared/shared.module';

import { RegisterComponent } from 'src/app/components/usuario/register/register.component';
import { ListarComponent } from './listar/listar.component'

@NgModule({
  declarations: [
    RegisterComponent,
    ListarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNgModule,
    UsuarioRoutingModule,
    SharedModule
  ]
})

export class UsuarioModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ListarComponent } from './listar/listar.component';


const routes: Routes = [
    { path: '', component: ListarComponent },
    { path: 'agregar', component: RegisterComponent },
    { path: 'editar/:id', component: RegisterComponent },
    { path: '**', redirectTo: '/notfound' },
  ];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule { }

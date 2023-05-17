import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, distinct, filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SucursalService } from 'src/app/components/sucursal/services/sucursal.service'
import { Usuario } from '../interfaces/usuario';
import { Sucursal } from '../../sucursal/interfaces/sucursal';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private _usuario?: Usuario
  private _baseUrl: string = environment.baseUrl;
  private _sucursal!: Sucursal[];


  constructor(private http: HttpClient,
    private sucursaService: SucursalService) { }

  getUsuario(id: number): Observable<Usuario | null> {
    const url: string = `${this._baseUrl}/user/${id}`;
    return this.http.get<Usuario>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar usuario:', error);
        // Puedes realizar acciones adicionales con el error si es necesario
        // Por ejemplo, enviar un mensaje de error, realizar un registro, etc.
        // Luego, puedes devolver un valor por defecto o un Observable vacío
        // En este ejemplo, devolvemos un Observable vacío utilizando `of()`
        return of(null);
      })
    );
  }

  addUsuario(usuario: Usuario): Observable<Usuario> {
    {
      //var newData: Usuario = { ...usuario }; // Copiar el objeto original
      const url: string = `${this._baseUrl}/auth/register`
      return this.http.post(url, usuario);
    }
  }

  getSucursales(): Observable<Sucursal[]> {
    return this.sucursaService.getSucursales().pipe(
      filter((data: Sucursal[] | null): data is Sucursal[] => data !== null)
    );
  }

}

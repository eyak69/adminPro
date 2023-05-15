import { Injectable } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sucursal } from 'src/app/components/sucursal/interfaces/sucursal'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private _sucursal!: Sucursal[];
  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public get sucursal(): Sucursal[] {
    return this._sucursal;
  }
  public set sucursal(value: Sucursal[]) {
    this._sucursal = value;
  }

  listar(): Observable<Sucursal[] | null> {
   // const url = 'assets/json/sucursales.json'; // Reemplaza 'ruta-del-archivo' con la ubicación real del archivo sucursales.json
   //sucursal
   const url: string = `${this._baseUrl}/sucursal`;

   return this.http.get<Sucursal[]>(url).pipe(
     catchError((error: any) => {
       console.error('Error al buscar sucursales:', error);
       // Puedes realizar acciones adicionales con el error si es necesario
       // Por ejemplo, enviar un mensaje de error, realizar un registro, etc.
       // Luego, puedes devolver un valor por defecto o un Observable vacío
       // En este ejemplo, devolvemos un Observable vacío utilizando `of()`
       return of(null);
     })
   );
/*    return this.http.get<Sucursal[]>(url).pipe(
      map((response: Sucursal[]) => {
        // Puedes realizar cualquier transformación o manipulación necesaria en los datos
        if (response && response.length > 0) {
          this.sucursal = response;
          console.log(this.sucursal)
          return response;
        } else {
          return [];
        }
      })
    );*/
  }
}

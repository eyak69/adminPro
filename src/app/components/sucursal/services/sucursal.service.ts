import { Injectable } from '@angular/core';
import { Observable, of, map, catchError, filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sucursal } from 'src/app/components/sucursal/interfaces/sucursal'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private _sucursal: Sucursal[] = [];
  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public get sucursal(): Sucursal[] {
    return this._sucursal;
  }
  public set sucursal(value: Sucursal[]) {
    this._sucursal = value;
  }

  borrar(id: number): Observable<Sucursal> {
    const url: string = `${this._baseUrl}/sucursal/${id}`;
    return this.http.delete<Sucursal>(url);
    //return this.http.delete<Sucursal>(url, { responseType: 'text' });
  }

  agregar(sucursal: Sucursal): Observable<Sucursal> {
      return this.http.post<Sucursal>(`${this._baseUrl}/sucursal`, sucursal);
  }

  editar(sucursal: Sucursal): Observable<Sucursal> {
    return this.http.put<Sucursal>(`${this._baseUrl}/sucursal/${sucursal.id}`, sucursal);
  }
    
  getSucursales(): Observable<Sucursal[]> {
    // const url = 'assets/json/sucursales.json'; // Reemplaza 'ruta-del-archivo' con la ubicación real del archivo sucursales.json
    //sucursal
    const url: string = `${this._baseUrl}/sucursal`;
    return this.http.get<Sucursal[]>(url).pipe(
      filter((data: Sucursal[] | null): data is Sucursal[] => data !== null)
    );
  }

  getSucursal(id: number): Observable<Sucursal | null> {
    //escribir codigo
    const url: string = `${this._baseUrl}/sucursal/${id}`;
    return this.http.get<Sucursal>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar sucursal:', error);
        // Puedes realizar acciones adicionales con el error si es necesario
        // Por ejemplo, enviar un mensaje de error, realizar un registro, etc.
        // Luego, puedes devolver un valor por defecto o un Observable vacío
        // En este ejemplo, devolvemos un Observable vacío utilizando `of()`
        return of(null);
      }
      )
    );
  }
}


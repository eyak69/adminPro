import { Injectable } from '@angular/core';
import { Observable, of, map, catchError, filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sucursal, SucursalResponse } from 'src/app/components/sucursal/interfaces/sucursal'
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';

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
      console.log(sucursal);
      return this.http.post<Sucursal>(`${this._baseUrl}/sucursal`, sucursal);
  }

  editar(sucursal: Sucursal): Observable<Sucursal> {
    return this.http.put<Sucursal>(`${this._baseUrl}/sucursal/${sucursal.id}`, sucursal);
  }
    
  getSucursales(page?: number, pageSize?: number): Observable<Sucursal[]> {
    const url: string = `${this._baseUrl}/sucursal?page=${page}&pageSize=${pageSize}`;
    return this.http.get<SucursalResponse>(url).pipe(
      map(response => response.data),
      catchError((error: any) => {
        console.error('Error al buscar sucursales:', error);
        return of([]);
      })
    );
  }

  getSucursalesLazy(event?: LazyLoadEvent): Observable<SucursalResponse> {
    const first = event?.first ?? 0;
    const rows = event?.rows ?? 10;
    const page = Math.floor(first / rows) + 1;
    const pageSize = rows;
    const url = `${this._baseUrl}/sucursal?page=${page}&pageSize=${pageSize}`;
  
    return this.http.get<SucursalResponse>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar sucursales:', error);
        return of({
          data: [],
          perPage: 0,
          totalRecords: 0,
          next: 0,
          previous: 0
        });
      })
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


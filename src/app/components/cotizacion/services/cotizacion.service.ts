import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, filter, of } from 'rxjs';
import { Cotizacion, CotizacionResponse } from '../interfaces/cotizacion.interface';
import { LazyLoadEvent } from 'primeng/api';



@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private _baseUrl: string = environment.baseUrl;
  private _cotizacion: Cotizacion[] = [];

  constructor(private http: HttpClient) { }

  
  borrar(id: number): Observable<Cotizacion> {
    const url: string = `${this._baseUrl}/cotizacion/${id}`;
    return this.http.delete<Cotizacion>(url);
    //return this.http.delete<Sucursal>(url, { responseType: 'text' });
  }

  getCotizacion(id:number):Observable<Cotizacion | null> {
    const url: string = `${this._baseUrl}/cotizacion/${id}`;
    return this.http.get<Cotizacion | null>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar moneda:', error);
        return of(null);
      }
      )
    );
  }

  getCotizaciones(): Observable<Cotizacion[]> {
    // const url = 'assets/json/sucursales.json'; // Reemplaza 'ruta-del-archivo' con la ubicación real del archivo sucursales.json
    //sucursal
    const url: string = `${this._baseUrl}/cotizacion`;
    return this.http.get<Cotizacion[]>(url).pipe(
      filter((data: Cotizacion[] | null): data is Cotizacion[] => data !== null)
    );
  } 
  
  getCotizacionesLazy(event?: LazyLoadEvent): Observable<CotizacionResponse> {
    const first = event?.first ?? 0;
    const rows = event?.rows ?? 10;
    const page = Math.floor(first / rows) + 1;
    const pageSize = rows;
    const url = `${this._baseUrl}/cotizacion?page=${page}&pageSize=${pageSize}`;
   //debugger
    return this.http.get<CotizacionResponse>(url).pipe(
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

}

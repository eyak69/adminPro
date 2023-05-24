import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, filter, map, of } from 'rxjs';
import { Cotizacion, CotizacionResponse, Tipo } from '../interfaces/cotizacion.interface';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private _baseUrl: string = environment.baseUrl;
  private _cotizacion: Cotizacion[] = [];
  private _tipos: Tipo[] = [{ tipo: 0, nombre: 'Compra' }, { tipo: 1, nombre: 'Venta' }];



  constructor(private http: HttpClient) { }

  borrar(id: number): Observable<Cotizacion> {
    const url: string = `${this._baseUrl}/cotizacion/${id}`;
    return this.http.delete<Cotizacion>(url);
  }

  editar(cotizacion: Cotizacion): Observable<Cotizacion | {}> {
    const url: string = `${this._baseUrl}/cotizacion/${cotizacion.id}`;
    cotizacion.estado = cotizacion.tipo?.tipo ?? 0;
    console.log(cotizacion);
    return this.http.put<Cotizacion>(url, cotizacion).pipe(
      catchError((error: any) => {
        console.error('Error al editar cotizacion:', error);
        return of({});
      })
    );
  }

  agregar(cotizacion: Cotizacion): Observable<Cotizacion | {}> {
    console.log(cotizacion);
    cotizacion.estado = cotizacion.tipo?.tipo ?? 0;
    return this.http.post<Cotizacion>(`${this._baseUrl}/cotizacion`, cotizacion).pipe(
      catchError((error: any) => {
        console.error('Error al crear cotizacion:', error);
        return of({});
      })
    );
  }

  getCotizacion(id: number): Observable<Cotizacion | null> {
    const url: string = `${this._baseUrl}/cotizacion/${id}`;
    return this.http.get<Cotizacion | null>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar moneda:', error);
        return of(null);
      }),
      map((response: Cotizacion | null) => {
        if (response) {
          response.tipo = this.mapEstadoToTipo(response.estado);
        }
        return response;
      })
    );
  }

  getCotizaciones(): Observable<Cotizacion[]> {
    const url: string = `${this._baseUrl}/cotizacion`;
    return this.http.get<Cotizacion[]>(url).pipe(
      filter((data: Cotizacion[] | null): data is Cotizacion[] => data !== null),
      map((response: Cotizacion[]) => {
        const cotizacionesActualizadas = response.map(cotizacion => ({
          ...cotizacion,
          tipo: this.mapEstadoToTipo(cotizacion.estado),
        }));
        return cotizacionesActualizadas;
      })
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
      }),
      map((response: CotizacionResponse) => {
        const cotizacionesActualizadas = response.data.map(cotizacion => ({
          ...cotizacion,
          tipo: this.mapEstadoToTipo(cotizacion.estado),
        }));
        return {
          ...response,
          data: cotizacionesActualizadas,
        };
      })
    );

  }

  mapEstadoToTipo(estado: number): Tipo {
    if (estado == 0) {
      return { tipo: 0, nombre: 'Compra' };
    } else if (estado == 1) {
      return { tipo: 1, nombre: 'Venta' };
    }
    return { tipo: -1, nombre: 'Desconocido' };
  };

  public get tipos(): Tipo[] {
    return this._tipos;
  }





}

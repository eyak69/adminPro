import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moneda, MonedaResponse } from '../interfaces/moneda.interface';
import { environment } from 'src/environments/environment';
import { Observable, catchError, filter, map, of } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  private _baseUrl: string = environment.baseUrl;
  private _monedas: Moneda[] = [];

  public get monedas(): Moneda[] {
    return this._monedas;
  }
  public set monedas(value: Moneda[]) {
    this._monedas = value;
  }

  constructor(private http: HttpClient) { }


  borrar(id: number): Observable<Moneda> {
    const url: string = `${this._baseUrl}/moneda/${id}`;
    return this.http.delete<Moneda>(url);
  }

  agregar(moneda: Moneda): Observable<Moneda | {}> {
    console.log(moneda);
    return this.http.post<Moneda>(`${this._baseUrl}/moneda`, moneda).pipe(
      catchError((error: any) => {
        console.error('Error al crear moneda:', error);
        return of({});
      })
    );
  }

  getMoneda(id: number): Observable<Moneda | null> {
    //escribir codigo
    const url: string = `${this._baseUrl}/moneda/${id}`;
    return this.http.get<Moneda | null>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar moneda:', error);
        return of(null);
      }
      )
    );
  }

  getMonedasLazy(event?: LazyLoadEvent): Observable<MonedaResponse> {
    const first = event?.first ?? 0;
    const rows = event?.rows ?? 10;
    const page = Math.floor(first / rows) + 1;
    const pageSize = rows;
    const url = `${this._baseUrl}/moneda?page=${page}&pageSize=${pageSize}`;

    return this.http.get<MonedaResponse>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar provincias:', error);
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

  editar(moneda: Moneda): Observable<Moneda | {}> {
    const url: string = `${this._baseUrl}/moneda/${moneda.id}`;
    console.log(moneda);
    return this.http.put<Moneda>(url, moneda).pipe(
      catchError((error: any) => {
        console.error('Error al editar moneda:', error);
        return of({});
      })
    );
  }
}

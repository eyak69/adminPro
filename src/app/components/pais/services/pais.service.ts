import { Injectable } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pais, PaisResponse } from '../interfaces/pais.interface';
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private _paises: Pais[] = [];
  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  borrarPais(id: number): Observable<Pais> {
    const url: string = `${this._baseUrl}/pais/${id}`;
    return this.http.delete<Pais>(url);
  }

  agregarPais(pais: Pais): Observable<Pais | {}> {
    console.log(pais);
    return this.http.post<Pais>(`${this._baseUrl}/pais`, pais).pipe(
      catchError((error: any) => {
        console.error('Error al crear país:', error);
        return of({});
      })
    );
  }

  getPais(id: number): Observable<Pais | null> {
    const url: string = `${this._baseUrl}/pais/${id}`;
    return this.http.get<Pais | null>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar país:', error);
        return of(null);
      })
    );
  }

  getPaises(page?: number, pageSize?: number): Observable<Pais[]> {
    page = 1;
    pageSize = 100;
    const url: string = `${this._baseUrl}/pais?page=${page}&pageSize=${pageSize}`;
    return  this.http.get<PaisResponse>(url).pipe(
      map(response => response.data),
      catchError((error: any) => {
        console.error('Error al buscar países:', error);
        return of([]);
      })
    );
  }

  getPaisesLazy(event?: LazyLoadEvent): Observable<PaisResponse> {
    const first = event?.first ?? 0;
    const rows = event?.rows ?? 10;
    const page = Math.floor(first / rows) + 1;
    const pageSize = rows;
    const url = `${this._baseUrl}/pais?page=${page}&pageSize=${pageSize}`;

    return this.http.get<PaisResponse>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar países:', error);
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

  editarPais(pais: Pais): Observable<Pais | {}> {
    console.log(pais);
    return this.http.put<Pais>(`${this._baseUrl}/pais/${pais.id}`, pais).pipe(
      catchError((error: any) => {
        console.error('Error al editar país:', error);
        return of({});
      })
    );
  }

  public get paises(): Pais[] {
    return this._paises;
  }
  public set paises(value: Pais[]) {
    this._paises = value;
  }
  
}

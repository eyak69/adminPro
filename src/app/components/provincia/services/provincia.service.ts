import { Injectable } from '@angular/core';
import { Observable, of, map, catchError, filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Provincia, ProvinciaResponse } from 'src/app/components/provincia/interfaces/provincia'
import { environment } from 'src/environments/environment';
import { LazyLoadEvent } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private _provincias: Provincia[] = [];
  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  borrar(id: number): Observable<Provincia> {
    const url: string = `${this._baseUrl}/provincia/${id}`;
    return this.http.delete<Provincia>(url);
  }

  agregar(provincia: Provincia): Observable<Provincia|{}> {
    console.log(provincia);
    return this.http.post<Provincia>(`${this._baseUrl}/provincia`, provincia).pipe(
      catchError((error: any) => {
        console.error('Error al crear provincia:', error)
        return of({});
      }
    )
    );
  }

  getProvincia(id: number): Observable<Provincia|{}> {
    //escribir codigo
    const url: string = `${this._baseUrl}/provincia/${id}`;
    return this.http.get<Provincia>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar provincia:', error);
        // Puedes realizar acciones adicionales con el error si es necesario
        // Por ejemplo, enviar un mensaje de error, realizar un registro, etc.
        // Luego, puedes devolver un valor por defecto o un Observable vacío
        // En este ejemplo, devolvemos un Observable vacío utilizando `of()`
        return of({});
      }
      )
    );
  }
  
  getProvincias(page: number, pageSize: number): Observable<Provincia[]> {
    const url: string = `${this._baseUrl}/provincia?page=${page}&pageSize=${pageSize}`;
    return this.http.get<ProvinciaResponse>(url).pipe(
      map(response => response.data),
      catchError((error: any) => {
        console.error('Error al buscar provincias:', error);
        return of([]);
      })
    );
  }

  getProvinciasLazy(event?: LazyLoadEvent): Observable<ProvinciaResponse> {
    const first = event?.first ?? 0;
    const rows = event?.rows ?? 10;
    const page = Math.floor(first / rows) + 1;
    const pageSize = rows;
    const url: string = `${this._baseUrl}/provincia?page=${page}&pageSize=${pageSize}`;
    return this.http.get<ProvinciaResponse>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar provincias:', error);
        return of({ data: [], perPage: 0, totalRecords: 0, next: 0, previous: 0 });
      })
    );
  }

  editar(provincia: Provincia): Observable<Provincia|{}> {
    console.log(provincia);
    return this.http.put<Provincia>(`${this._baseUrl}/provincia/${provincia.id}`, provincia)
    .pipe(
      catchError((error: any) => {
        console.error('Error al editar provincia:', error);
        return of({})
        }
    ));
  }

  public get provincias(): Provincia[] {
    return this._provincias;
  }
  public set provincias(value: Provincia[]) {
    this._provincias = value;
  }

}

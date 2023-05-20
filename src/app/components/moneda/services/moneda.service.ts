import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moneda } from '../interfaces/moneda.interface';
import { environment } from 'src/environments/environment';
import { Observable, catchError, filter, of } from 'rxjs';

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
  
  agregar(moneda: Moneda): Observable<Moneda|{}> {
    console.log(moneda);
    return this.http.post<Moneda>(`${this._baseUrl}/moneda`, moneda).pipe(
      catchError((error: any) => {
        console.error('Error al crear moneda:', error);
        return of({});
      })
    );
  }
  
  getMoneda(id: number): Observable<Moneda|{}> {
    const url: string = `${this._baseUrl}/moneda/${id}`;
    return this.http.get<Moneda>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar moneda:', error);
        return of({});
      })
    );
  }
  
  getMonedas(): Observable<Moneda[]> {
    const url: string = `${this._baseUrl}/moneda`;
    return this.http.get<Moneda[]>(url).pipe(
      filter((data: Moneda[]): data is Moneda[] => data !== null),
      catchError((error: any) => {
        console.error('Error al buscar monedas:', error);
        return of([]);
      })
    );
  }
  
editar(moneda: Moneda): Observable<Moneda|{}> {
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

import { Injectable } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Provincia } from 'src/app/components/provincia/interfaces/provincia'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private _provincias: Provincia[] = [];
  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { 

  }

  public addProvincia(provincia: Provincia): Observable<Provincia> {
    return this.http.post<Provincia>(`${this._baseUrl}/provincia`, provincia);
  }

  public getProvincia(id: number): Observable<Provincia> {
    return this.http.get<Provincia>(`${this._baseUrl}/provincia/${id}`);
  }
  
  public getProvincias(): Observable<Provincia[] | null> {
    const url = `${this._baseUrl}/provincia`;
    return this.http.get<Provincia[]>(url).pipe(
      catchError((error: any) => {
        console.error('Error al buscar sucursales:', error);
        // Puedes realizar acciones adicionales con el error si es necesario
        // Por ejemplo, enviar un mensaje de error, realizar un registro, etc.
        // Luego, puedes devolver un valor por defecto o un Observable vacío
        // En este ejemplo, devolvemos un Observable vacío utilizando `of()`
        return of(null);
      })
    );
  }
  
  public get provincias(): Provincia[] {
    return this._provincias;
  }
  public set provincias(value: Provincia[]) {
    this._provincias = value;
  }

}

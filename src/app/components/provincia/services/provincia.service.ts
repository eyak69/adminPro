import { Injectable } from '@angular/core';
import { Observable, of, map, catchError, filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Provincia } from 'src/app/components/provincia/interfaces/provincia'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private _provincias: Provincia[] = [];
  private _baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  borrar(id: number): Observable<Provincia> {
    const url: string = `${this._baseUrl}/sucursal/${id}`;
    return this.http.delete<Provincia>(url);
  }

  agregar(provincia: Provincia): Observable<Provincia> {
    return this.http.post<Provincia>(`${this._baseUrl}/provincia`, provincia);
  }

  getProvincia(id: number): Observable<Provincia> {
    return this.http.get<Provincia>(`${this._baseUrl}/provincia/${id}`);
  }
  
  getProvincias(): Observable<Provincia[]> {
    const url = `${this._baseUrl}/provincia`;
    return this.http.get<Provincia[]>(url).pipe(
      filter((data: Provincia[] | null): data is Provincia[] => data !== null)
    );
  }

  public get provincias(): Provincia[] {
    return this._provincias;
  }
  public set provincias(value: Provincia[]) {
    this._provincias = value;
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Moneda } from '../interfaces/moneda.interface';
import { environment } from 'src/environments/environment';
import { Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  private _baseUrl: string = environment.baseUrlMock;
  private _moneda: Moneda[] = [];

  constructor(private http: HttpClient) { }

  getMonedas(): Observable<Moneda[]> {
    // const url = 'assets/json/sucursales.json'; // Reemplaza 'ruta-del-archivo' con la ubicación real del archivo sucursales.json
    //sucursal
    const url: string = `${this._baseUrl}/moneda`;
    return this.http.get<Moneda[]>(url).pipe(
      filter((data: Moneda[] | null): data is Moneda[] => data !== null)
    );
  }  
}

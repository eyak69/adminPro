import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, filter } from 'rxjs';
import { Cotizacion } from '../interfaces/cotizacion.interface';



@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private _baseUrl: string = environment.baseUrlMock;
  private _cotizacion: Cotizacion[] = [];

  constructor(private http: HttpClient) { }

  getCotizaciones(): Observable<Cotizacion[]> {
    // const url = 'assets/json/sucursales.json'; // Reemplaza 'ruta-del-archivo' con la ubicación real del archivo sucursales.json
    //sucursal
    const url: string = `${this._baseUrl}/cotizacion`;
    return this.http.get<Cotizacion[]>(url).pipe(
      filter((data: Cotizacion[] | null): data is Cotizacion[] => data !== null)
    );
  }  

}

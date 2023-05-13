import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Sucursal } from 'src/app/components/sucursal/interfaces/sucursal'

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private _sucursal!: Sucursal[];

  constructor(private http: HttpClient) { }

  public get sucursal(): Sucursal[] {
    return this._sucursal;
  }
  public set sucursal(value: Sucursal[]) {
    this._sucursal = value;
  }

  listar(): Observable<Sucursal[]> {
    const url = 'assets/json/sucursales.json'; // Reemplaza 'ruta-del-archivo' con la ubicación real del archivo sucursales.json
    return this.http.get<Sucursal[]>(url).pipe(
      map((response: Sucursal[]) => {
        // Puedes realizar cualquier transformación o manipulación necesaria en los datos
        if (response && response.length > 0) {
          this.sucursal = response;
          console.log(this.sucursal)
          return response;
        } else {
          return [];
        }
      })
    );
  }
}

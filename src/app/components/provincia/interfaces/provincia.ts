import { Sucursal } from "../../sucursal/interfaces/sucursal";
import { Pais } from "../../pais/interfaces/pais.interface";

interface Provincia {
    id?: number;
    nombre: string;
    pais: Pais;
    sucursales?: Sucursal[];

}

interface ProvinciaResponse {
    data: Provincia[];
    perPage: number;
    totalRecords: number;
    next: number;
    previous: number;
  }

export { Provincia, ProvinciaResponse }  ;
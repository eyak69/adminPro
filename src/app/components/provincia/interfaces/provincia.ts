import { Sucursal } from "../../sucursal/interfaces/sucursal";

interface Provincia {
    id?: number;
    nombre: string;
    valor:number;
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
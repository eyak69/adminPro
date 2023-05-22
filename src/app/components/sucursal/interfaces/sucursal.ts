import { Provincia } from "../../provincia/interfaces/provincia";

interface Sucursal {
    id?: number;
    nombre?: string;
    provincia: Provincia
}

interface SucursalResponse {
    data: Sucursal[];
    perPage: number;
    totalRecords: number;
    next: number;
    previous: number;
  }

export { Sucursal, SucursalResponse }  ;


import { Provincia } from "../../provincia/interfaces/provincia";

interface Pais {
    id?: number;
    nombre: string;
    personas?: any[];
    provincias?: Provincia[];
}

interface PaisResponse {
    data: Pais[];
    perPage: number;
    totalRecords: number;
    next: number;
    previous: number;
  }

export { Pais, PaisResponse };
interface Provincia {
    id?: number;
    nombre: string;
}

interface ProvinciaResponse {
    data: Provincia[];
    perPage: number;
    totalRecords: number;
    next: number;
    previous: number;
  }

export { Provincia, ProvinciaResponse }  ;
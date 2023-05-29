interface Moneda {
    id?: number;
    nombre: string;
    codigo?: string;
    locale?: string;
  }

  interface MonedaResponse {
    data: Moneda[];
    perPage: number;
    totalRecords: number;
    next: number;
    previous: number;
  }  

export { Moneda, MonedaResponse }

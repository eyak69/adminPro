import { Moneda } from '../../moneda/interfaces/moneda.interface'

interface Tipo {
  tipo:number;
  nombre:string
}

interface Cotizacion {
    id: number;
    moneda: Moneda;
    estado: number;
    tipo?: Tipo;
    valor: number;
    fecha_cotizacion: string;
    fecha_vigencia: string;
  }

  interface CotizacionResponse {
    data: Cotizacion[];
    perPage: number;
    totalRecords: number;
    next: number;
    previous: number;
  }

 
  export { Cotizacion, CotizacionResponse, Tipo }

  
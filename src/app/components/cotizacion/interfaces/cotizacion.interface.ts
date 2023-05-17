import { Moneda } from '../../moneda/interfaces/moneda.interface'

interface Cotizacion {
    id: number;
    moneda: Moneda;
    valor: number;
    fecha_cotizacion: string;
    fecha_vigencia: string;
  }
 
  export { Cotizacion }

  
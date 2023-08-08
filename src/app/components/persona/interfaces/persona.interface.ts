import { Pais } from "../../pais/interfaces/pais.interface";
import { Provincia } from "../../provincia/interfaces/provincia"; 
import { TipoPersona } from "./tipopersona.interface";


interface Persona {
    id?: number;
    nombre: string;
    telefono: string;
    direccion: string;
    email: string;
    tipoPersona: TipoPersona[];
    razonSocial: string;
    cuit: string;
    pais: Pais;
    provincia: Provincia;
}


interface PersonaResponse {
    data: Persona[];
    perPage: number;
    totalRecords: number;
    next: number;
    previous: number;
  }

  export {  Persona, PersonaResponse }

import { Sucursal } from '../../sucursal/interfaces/sucursal'

/*{
    "password": "ojoseco6971",
    "email": "cfanton@gmail.com",
    "username": "cristiananton",
    "surcursalNames": ["Mendoza"]
  }*/

  interface Usuario {
    id?: number,
    password?: string;
    passwordRepetir?: string;
    email?: string;
    username?: string;
    sucursales?: Sucursal[];
    active?:boolean;
  }

  export { Usuario }

  
  

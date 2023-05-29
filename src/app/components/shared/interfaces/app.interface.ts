import { Moneda } from "../../moneda/interfaces/moneda.interface";

interface Dashboard {
    moneda0: Moneda;
    moneda1: Moneda;
    moneda2: Moneda;
}

interface Application {
    dashboard: Dashboard;
}

export { Application, Dashboard }

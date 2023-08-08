import { Component, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../demo/api/product';
import { ProductService } from '../../demo/service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Moneda } from '../moneda/interfaces/moneda.interface';
import { Cotizacion } from '../cotizacion/interfaces/cotizacion.interface';
import { MonedaService } from '../moneda/services/moneda.service';
import { CotizacionService } from '../cotizacion/services/cotizacion.service';
import { DecimalPipe } from '@angular/common';
import { DashboardService } from './services/dashboard.service';
import { Dashboard } from '../shared/interfaces/app.interface';
import { DolarSi } from './interfaces/dolarsi.interface';

interface City {
    name: string;
    code: string;
}

@Component({
    templateUrl: './dashboard.component.html',
    styles: [`
     table {
         border-collapse: separate;
         border-spacing: 20px; /* Ajusta el valor para controlar el espaciado horizontal */
        }
    .column-heading {
        padding: 0 10px; /* Ajusta el valor según el espaciado deseado */
    }
    .left-align {
         text-align: left;
    }

    .right-align {
        text-align: right;
    }      
      `]
})
export class DashboardComponent implements OnInit, OnDestroy {
    items!: MenuItem[];
    cities!: City[];
    products!: Product[];
    chartData: any;
    chartOptions: any;

    subscription!: Subscription;
    monedasSubscription!: Subscription;

    selectedMoneda0!: Moneda;
    selectedMoneda1!: Moneda;
    selectedMoneda2!: Moneda;


    private _monedas: Moneda[] = [];
    private _monedas0: Moneda[] = [];
    private _monedas1: Moneda[] = [];
    private _monedas2: Moneda[] = [];
    private _dashboard: Dashboard = {} as Dashboard;

    listaCotizacion!: Cotizacion[] | null
    listaCotizacion0!: Cotizacion[]
    listaCotizacion1!: Cotizacion[]
    listaCotizacion2!: Cotizacion[]

    listaCotizacionDolarSi: DolarSi[] = [];

    constructor(
        private productService: ProductService,
        private monedaService: MonedaService,
        private cotizacionService: CotizacionService,
        private dashBoardService: DashboardService,
        public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
        
    }

    ngOnInit() {
        const refreshInterval = 5 * 60 * 1000; // 5 minutos
        setInterval(() => {
            this.refreshDashboard();
        }, refreshInterval);

        this.cotizacionService.cotizacionSubject.subscribe((cotizacion: Cotizacion | null) => {
           this.configDashboard();
        });

        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];


        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];

        this.buscarMonedas()

    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.

    }

    ngOnChanges(changes: SimpleChanges): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.


    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onMoneda0Change(event: any) {
       const selectedMoneda: Moneda = event.value; // Valor seleccionado en el p-dropdown
        console.log('Moneda seleccionada:', selectedMoneda);
        if (selectedMoneda.id != undefined) {
            this.buscarCotizaciones(selectedMoneda.id, 0)
            this._dashboard.moneda0 = selectedMoneda;
            this.dashBoardService.setDashboard(this._dashboard)
        }
        // Realiza las acciones necesarias con el valor seleccionado
       
    }

    onMoneda1Change(event: any) {
        const selectedMoneda: Moneda = event.value as Moneda; // Valor seleccionado en el p-dropdown
        console.log('Moneda seleccionada:', selectedMoneda);
        if (selectedMoneda.id != undefined) {
            this.buscarCotizaciones(selectedMoneda.id, 1)
            this._dashboard.moneda1 = selectedMoneda;
            this.dashBoardService.setDashboard(this._dashboard)
        }
        // Realiza las acciones necesarias con el valor seleccionado
    }

    onMoneda2Change(event: any) {
        const selectedMoneda: Moneda = event.value as Moneda; // Valor seleccionado en el p-dropdown
        console.log('Moneda seleccionada:', selectedMoneda);
        if (selectedMoneda.id != undefined) {
            this.buscarCotizaciones(selectedMoneda.id, 2);
            this._dashboard.moneda2 = selectedMoneda;
            this.dashBoardService.setDashboard(this._dashboard)
        }
        // Realiza las acciones necesarias con el valor seleccionado
    }

    buscarMonedas() {
        this.monedasSubscription = this.monedaService.getMonedas().subscribe({
            next: (monedas: Moneda[]) => {
                //console.log(monedas);
                this.monedas = monedas
            },
            complete: () => {
                this.monedas0 = this.monedas
                this.monedas1 = this.monedas
                this.monedas2 = this.monedas
                this.configDashboard()
                console.log('Proceso de obtención de monedas completado');
            },
            error: (error: any) => {
                console.error(error);
            }
        });
    }

    // Función que realiza el refresco del dashboard
    refreshDashboard() {
        // Realiza las acciones necesarias para actualizar los datos del dashboard
        // Por ejemplo, podrías llamar a tu servicio de cotizaciones para obtener los datos más recientes
        this.configDashboard()
    }

    // Define el intervalo de tiempo en milisegundos para el refresco (por ejemplo, cada 5 minutos)
    // Inicia el refresco del dashboard al cargar la página
    // Configura el refresco automático cada cierto intervalo de tiempo




    configDashboard() {
        this._dashboard = this.dashBoardService.getDashboard()
        this.selectedMoneda0 = this._dashboard.moneda0 as Moneda
        this.selectedMoneda1 = this._dashboard.moneda1 as Moneda
        this.selectedMoneda2 = this._dashboard.moneda2 as Moneda
        if (this.selectedMoneda0) {
            if(this.selectedMoneda0.id != undefined)
                this.buscarCotizaciones(this.selectedMoneda0.id, 0);
        }
        if (this.selectedMoneda1) {
            if (this.selectedMoneda1.id != undefined)
                this.buscarCotizaciones(this.selectedMoneda1.id, 1);
        }

        if (this.selectedMoneda2) {
            if (this.selectedMoneda2.id != undefined)
                this.buscarCotizaciones(this.selectedMoneda2.id, 2)
        }

        
        this.dashBoardService.getDolarSi().subscribe((cotizaciones: DolarSi[]) => {
            debugger
            this.listaCotizacionDolarSi = cotizaciones
            console.log(this.listaCotizacionDolarSi);
        });

          
    }

    buscarCotizaciones(id: number, posicion: number) {
        this.cotizacionService.getCotizacionMoneda(id).subscribe({
            next: (cotizacion: Cotizacion[] | null) => {
                this.listaCotizacion = cotizacion
            },
            complete: () => {
                console.log('Proceso de obtención de cotizaciones completado');
                if (this.listaCotizacion) {
                    switch (posicion) {
                        case 0:
                            console.log('Opción 0 seleccionada');
                            this.listaCotizacion0 = this.listaCotizacion
                            // Código a ejecutar si la opción es 1
                            break;
                        case 1:
                            console.log('Opción 1 seleccionada');
                            this.listaCotizacion1 = this.listaCotizacion
                            // Código a ejecutar si la opción es 2
                            break;
                        case 2:
                            console.log('Opción 2 seleccionada');
                            this.listaCotizacion2 = this.listaCotizacion
                            // Código a ejecutar si la opción es 3
                            break;
                    }
                }
            },
            error: (error: any) => {
                console.error(error);
            }
        });
    }


    public get monedas(): Moneda[] {
        return this._monedas;
    }
    public set monedas(value: Moneda[]) {
        this._monedas = value;
    }
    public get monedas0(): Moneda[] {
        return this._monedas0;
    }
    public set monedas0(value: Moneda[]) {
        this._monedas0 = value;
    }
    public get monedas1(): Moneda[] {
        return this._monedas1;
    }
    public set monedas1(value: Moneda[]) {
        this._monedas1 = value;
    }
    public get monedas2(): Moneda[] {
        return this._monedas2;
    }
    public set monedas2(value: Moneda[]) {
        this._monedas2 = value;
    }
    public get dashboard(): Dashboard {
        return this._dashboard;
    }
    public set dashboard(value: Dashboard) {
        this._dashboard = value;
    }

}

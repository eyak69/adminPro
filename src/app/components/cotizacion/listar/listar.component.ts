import { Component } from '@angular/core';
import { Cotizacion } from '../interfaces/cotizacion.interface'
import { CotizacionService } from '../services/cotizacion.service';
import { Columnas } from '../../shared/table-group/table-columns';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styles: [
  ],
  providers: [MessageService, ConfirmationService]
})
export class ListarComponent {
  public cotizaciones: Cotizacion[] = [];
  public cols!: Columnas[];
  public id: string = "id";

  constructor(private cotizacionService: CotizacionService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.obtenerCotizaciones();
    this.cols = [
      { campo: 'moneda.nombre', nombre: 'Nombre' },
      { campo: 'valor', nombre: 'Valor' },
      { campo: 'moneda.codigoSwift', nombre: 'Codigo Swift' },
      { campo: 'fecha_Cotizacion', nombre: 'Fecha' },
    ];
  }

  obtenerCotizaciones() {
    this.cotizacionService.getCotizaciones().subscribe((cotizaciones) => {
      //console.log(monedas);
      //debugger
      this.cotizaciones = cotizaciones;
    });
  }

  actualizarCotizacion(){}

  nuevaCotizacion(){}

  editCotizacion(id:number){}

  deleteCotizacion(id:number){}
}

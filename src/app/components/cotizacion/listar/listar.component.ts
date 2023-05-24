import { Component } from '@angular/core';
import { Cotizacion } from '../interfaces/cotizacion.interface'
import { CotizacionService } from '../services/cotizacion.service';
import { Columnas } from '../../shared/table-group/table-columns';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { catchError, tap, throwError } from 'rxjs';
import { NumberFormatPipe } from '../../shared/pipes/number-format.pipe'
import { PercentPipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { DatePipe } from '@angular/common';

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

  totalRecords!: number;
  loading: boolean = true;
  pageSize: number = 10;
  
  constructor(private cotizacionService: CotizacionService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.obtenerCotizaciones();
 
    this.cols = [
      { campo: 'fechaCotizacion', nombre: 'Fecha', mipipe: DatePipe, parampipe: ['dd/MM/yyyy']},
      { campo: 'moneda.nombre', nombre: 'Nombre' },
      { campo: 'moneda.codigo', nombre: 'Codigo Swift' },
      { campo: 'tipo.nombre', nombre: 'Tipo' },
      { campo: 'valor', nombre: 'Valor',  mipipe: DecimalPipe, parampipe:['1.2-3', 'es']},
      
    //  { campo: 'fecha_Cotizacion', nombre: 'Fecha' },
    ];
  }


  editCotizacion(id: any) {
    console.log('Editando producto con ID:', id);
    this.router.navigateByUrl(`/cotizacion/editar/${id}`);
    // Aquí puedes realizar las acciones necesarias para editar el producto
  }

  actualizarCotizacion() {
    this.obtenerCotizaciones();
  }

  nuevaCotizacion() {
    this.router.navigateByUrl(`/cotizacion/agregar`);
  }

  deleteCotizacion(id: any) {
    console.log('Eliminando producto con ID:', id);
    this.confirmationService.confirm({
      message: 'Esta seguro de borrar la Cotizacion?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(id);
        this.cotizacionService.borrar(id).pipe(
          catchError((error) => {
            console.error('Error al borrar la Cotizacion:', error);
            return throwError(() => error); // Propaga el error al método que llama
          })
        ).subscribe({
          next: () => {
          },
          complete: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Cotizacion borrada',
              life: 3000
            });
            this.obtenerCotizaciones(); // Actualizar la lista después de borrar
          },
          error: (error) => {
            let errorMessage = 'Ocurrió un error al borrar la Cotizacion';
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            }
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: errorMessage,
              life: 3000
            });
          }
        });
      }
    });
  }

  obtenerCotizaciones(event?: LazyLoadEvent) {
    this.loading = true;
    /*const page = event?.first ? event.first / (event.rows ?? 10) + 1 : 1;
    const pageSize = event?.rows ?? 10;*/
    //debugger
    this.cotizacionService.getCotizacionesLazy(event).pipe(
      catchError((error) => {
        console.error('Error al obtener las Cotizacionles:', error);
        return throwError(() => error); // Propaga el error al método que llama
      })
    ).subscribe({
      next: (response) => {
        this.cotizaciones = response.data;
        this.totalRecords = response.totalRecords;
       
      },
      complete: () => {
        this.loading = false;
      },
      error: (error) => {
        let errorMessage = 'Ocurrió un error al obtener las Cotizacionles';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 3000
        });
      }
    });
  }


  
}

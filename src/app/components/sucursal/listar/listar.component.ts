import { Component } from '@angular/core';
import { Sucursal } from '../interfaces/sucursal';
import { SucursalService } from '../services/sucursal.service';
import { Columnas } from '../../shared/table-group/table-columns';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { catchError, tap, throwError } from 'rxjs';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styles: [],
  providers: [MessageService, ConfirmationService]
})
export class ListarComponent {
  public sucursales: Sucursal[] = [];
  public cols!: Columnas[];
  public id: string = "id";

  totalRecords!: number;
  loading: boolean = true;
  pageSize: number = 10;

  constructor(private sucursalService: SucursalService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.obtenerSucursales();
    this.cols = [
      { campo: 'nombre', nombre: 'Nombre' },
      { campo: 'provincia.nombre', nombre: 'Provincia' }
    ];
  }

  editSucursal(id: any) {
    console.log('Editando producto con ID:', id);
    this.router.navigateByUrl(`/sucursal/editar/${id}`);
    // Aquí puedes realizar las acciones necesarias para editar el producto
  }

  actualizarSucursal() {
    this.obtenerSucursales();
  }

  nuevaSucursal() {
    this.router.navigateByUrl(`/sucursal/agregar`);
  }

  deleteSucursal(id: any) {
    console.log('Eliminando producto con ID:', id);
    this.confirmationService.confirm({
      message: 'Esta seguro de borrar la sucursal?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(id);
        this.sucursalService.borrar(id).pipe(
          catchError((error) => {
            console.error('Error al borrar la Sucursal:', error);
            return throwError(() => error); // Propaga el error al método que llama
          })
        ).subscribe({
          next: () => {
          },
          complete: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Sucursal borrada',
              life: 3000
            });
            this.obtenerSucursales(); // Actualizar la lista después de borrar
          },
          error: (error) => {
            let errorMessage = 'Ocurrió un error al borrar la Sucursal';
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

  obtenerSucursales(event?: LazyLoadEvent) {
    this.loading = true;
    /*const page = event?.first ? event.first / (event.rows ?? 10) + 1 : 1;
    const pageSize = event?.rows ?? 10;*/

    this.sucursalService.getSucursalesLazy(event).pipe(
      catchError((error) => {
        console.error('Error al obtener las sucursales:', error);
        return throwError(() => error); // Propaga el error al método que llama
      })
    ).subscribe({
      next: (response) => {
        this.sucursales = response.data;
        this.totalRecords = response.totalRecords;
      },
      complete: () => {
        this.loading = false;
      },
      error: (error) => {
        let errorMessage = 'Ocurrió un error al obtener las sucursales';
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

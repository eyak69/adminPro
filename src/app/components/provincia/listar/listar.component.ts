import { Component } from '@angular/core';
import { ProvinciaService } from '../services/provincia.service';
import { Provincia } from '../interfaces/provincia';
import { Columnas } from '../../shared/table-group/table-columns';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styles: [],
  providers: [MessageService, ConfirmationService]
})
export class ListarComponent {
  public provincias: Provincia[] = [];
  public cols!: Columnas[];
  public id = 'id';
  totalRecords!: number;
  loading: boolean = true;
  pageSize: number = 10;

  constructor(
    private provinciaService: ProvinciaService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.obtenerProvincias({ first: 0, rows: this.pageSize } as LazyLoadEvent);
    this.cols = [
      { campo: 'nombre', nombre: 'Nombre' }
    ];
  }

  editProvincia(id: any) {
    console.log('Editando producto con ID:', id);
    this.router.navigateByUrl(`/provincia/editar/${id}`);
    // Aquí puedes realizar las acciones necesarias para editar el producto
  }

  actualizarProvincia() {
    this.obtenerProvincias();
  }

  nuevaProvincia() {
    this.router.navigateByUrl(`/provincia/agregar`);
  }

  deleteProvincia(id: any) {
    this.confirmationService.confirm({
      message: '¿Está seguro de borrar la Provincia?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.provinciaService.borrar(id).pipe(
          catchError((error) => {
            console.error('Error al borrar la Provincia:', error);
            return throwError(() => error); // Propaga el error al método que llama
          })
        ).subscribe({
          next: () => {
          },
          complete: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Provincia borrada',
              life: 3000
            });
            this.obtenerProvincias(); // Actualizar la lista después de borrar
          },
          error: (error) => {
            let errorMessage = 'Ocurrió un error al borrar la Provincia';
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

  obtenerProvincias(event?: LazyLoadEvent) {
    this.loading = true;
   // const page = event?.first ? event.first / (event.rows ?? 10) + 1 : 1;
   // const pageSize = event?.rows ?? 10;

    this.provinciaService.getProvinciasLazy(event).pipe(
      catchError((error) => {
        console.error('Error al obtener las Provincias:', error);
        return throwError(() => error); // Propaga el error al método que llama
      })
    ).subscribe({
      next: (response) => {
        this.provincias = response.data;
        this.totalRecords = response.totalRecords;
      },
      complete:()=>{
        this.loading = false;
      },      
      error: (error) => {
        let errorMessage = 'Ocurrió un error al obtener las Provincias';
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


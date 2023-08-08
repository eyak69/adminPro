import { Component } from '@angular/core';
import { Pais } from '../interfaces/pais.interface';
import { PaisService } from '../services/pais.service';
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
  public paises: Pais[] = [];
  public cols!: Columnas[];
  public id: string = "id";

  totalRecords!: number;
  loading: boolean = true;
  pageSize: number = 10;

  constructor(
    private paisService: PaisService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.obtenerPaises();
    this.cols = [
      { campo: 'nombre', nombre: 'Nombre' }
    ];
  }

  editarPais(id: any) {
    console.log('Editando país con ID:', id);
    this.router.navigateByUrl(`/pais/editar/${id}`);
    // Aquí puedes realizar las acciones necesarias para editar el país
  }

  actualizarPaises() {
    this.obtenerPaises();
  }

  nuevoPais() {
    this.router.navigateByUrl(`/pais/agregar`);
  }

  eliminarPais(id: any) {
    this.confirmationService.confirm({
      message: '¿Está seguro de borrar el país?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.paisService.borrarPais(id).pipe(
          catchError((error) => {
            console.error('Error al borrar el país:', error);
            return throwError(() => error); // Propaga el error al método que llama
          })
        ).subscribe({
          next: () => {

          },
          complete: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'País borrado',
              life: 3000
            });
            this.obtenerPaises(); // Actualizar la lista después de borrar
          },
          error: (error) => {
            let errorMessage = 'Ocurrió un error al borrar el país';
            if (error.error && error.error.message) {
              errorMessage = error.error.message;
            }
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: errorMessage,
              life: 3000
            });
          },
        });
      }
    });
  }

  obtenerPaises(event?: LazyLoadEvent) {
    this.loading = true;
    this.paisService.getPaisesLazy(event).pipe(
      catchError((error) => {
        console.error('Error al obtener los países:', error);
        return throwError(() => error); // Propaga el error al método que llama
      })
    ).subscribe({
      next: (response) => {
        this.paises = response.data;
        this.totalRecords = response.totalRecords;
      },
      complete: () => {
        this.loading = false;
      },
      error: (error) => {
        let errorMessage = 'Ocurrió un error al obtener los países';
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

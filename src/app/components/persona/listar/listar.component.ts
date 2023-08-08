import { Component } from '@angular/core';
import { Persona } from '../interfaces/persona.interface';
import { PersonaService } from '../services/persona.service';
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
  public personas: Persona[] = [];
  public cols!: Columnas[];
  public id: string = "id";

  totalRecords!: number;
  loading: boolean = true;
  pageSize: number = 10;

  constructor(private personaService: PersonaService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.obtenerPersonas();
    this.cols = [
      { campo: 'nombre', nombre: 'Nombre' },
      { campo: 'telefono', nombre: 'Telefono' },
      { campo: 'direccion', nombre: 'Direccion' },
      { campo: 'email', nombre: 'Email' },
      { campo: 'razonSocial', nombre: 'Razon Social' },
      { campo: 'cuit', nombre: 'CUIT' },
      { campo: 'pais.nombre', nombre: 'Pais' },
      { campo: 'provincia.nombre', nombre: 'Provincia' }
    ];
  }

  editPersona(id: any) {
    console.log('Editando persona con ID:', id);
    this.router.navigateByUrl(`/persona/editar/${id}`);
    // Aquí puedes realizar las acciones necesarias para editar la persona
  }

  actualizarPersona() {
    this.obtenerPersonas();
  }

  nuevaPersona() {
    this.router.navigateByUrl(`/persona/agregar`);
  }

  deletePersona(id: any) {
    console.log('Eliminando persona con ID:', id);
    this.confirmationService.confirm({
      message: 'Esta seguro de borrar la persona?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(id);
        this.personaService.borrar(id).pipe(
          catchError((error) => {
            console.error('Error al borrar la Persona:', error);
            return throwError(() => error); // Propaga el error al método que llama
          })
        ).subscribe({
          next: () => {
          },
          complete: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Persona borrada',
              life: 3000
            });
            this.obtenerPersonas(); // Actualizar la lista después de borrar
          },
          error: (error) => {
            let errorMessage = 'Ocurrió un error al borrar la Persona';
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

  obtenerPersonas(event?: LazyLoadEvent) {
    this.loading = true;
    /*const page = event?.first ? event.first / (event.rows ?? 10) + 1 : 1;
    const pageSize = event?.rows ?? 10;*/

    this.personaService.getPersonasLazy(event).pipe(
      catchError((error) => {
        console.error('Error al obtener las personas:', error);
        return throwError(() => error); // Propaga el error al método que llama
      })
    ).subscribe({
      next: (response) => {
        this.personas = response.data;
        this.totalRecords = response.totalRecords;
      },
      complete: () => {
        this.loading = false;
      },
      error: (error) => {
        let errorMessage = 'Ocurrió un error al obtener las personas';
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
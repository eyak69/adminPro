import { Component } from '@angular/core';
import { Moneda } from '../interfaces/moneda.interface'
import { MonedaService } from '../services/moneda.service';
import { Columnas } from '../../shared/table-group/table-columns';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styles: [
  ],
  providers: [MessageService, ConfirmationService]
})

export class ListarComponent {
  public monedas: Moneda[] = [];
  public cols!: Columnas[];
  public id: string = "id";

  constructor(private monedaService: MonedaService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.obtenerMonedas();
    this.cols = [
      { campo: 'nombre', nombre: 'Nombre' },
      { campo: 'codigo', nombre: 'Codigo Swift' },
    ];
  }

  editMoneda(id: any) {
    console.log('Editando moneda con ID:', id);
    this.router.navigateByUrl(`/moneda/editar/${id}`);
    // Aquí puedes realizar las acciones necesarias para editar la moneda
  }
  
  actualizarMoneda() {
    this.obtenerMonedas();
  }
  
  nuevaMoneda() {
    this.router.navigateByUrl(`/moneda/agregar`);
  }
  
  deleteMoneda(id: any) {
    this.confirmationService.confirm(
      {
        message: '¿Está seguro de borrar la Moneda?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.monedaService.borrar(id).pipe(
            catchError((error) => {
              console.error('Error al borrar la Moneda:', error);
              return throwError(() => error); // Propaga el error al método que llama
            })
          ).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Moneda borrada',
                life: 3000
              });
              this.obtenerMonedas(); // Actualizar la lista después de borrar
            },
            error: (error) => {
              let errorMessage = 'Ocurrió un error al borrar la Moneda';
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
  
  obtenerMonedas() {
    this.monedaService.getMonedas().pipe(
      catchError((error) => {
        console.error('Error al obtener las Monedas:', error);
        return throwError(() => error); // Propaga el error al método que llama
      })
    ).subscribe({
      next: (monedas) => {
        this.monedas = monedas;
      },
      error: (error) => {
        let errorMessage = 'Ocurrió un error al obtener las Monedas';
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
}

import { Component } from '@angular/core';
import { Sucursal } from '../interfaces/sucursal';
import { SucursalService } from '../services/sucursal.service';
import { Columnas } from '../../shared/table-group/table-columns';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { catchError, tap } from 'rxjs';


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
        this.sucursalService.borrar(id)
          .pipe(
            tap(resp => {
              if (resp) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Éxito',
                  detail: 'Sucursal borrada',
                  life: 3000
                });
                this.obtenerSucursales(); // Actualizar la lista después de borrar
              }
            }),
            catchError(error => {
              console.error('Error al borrar la sucursal:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al borrar la sucursal',
                life: 3000
              });
              throw error;
            })
          )
          .subscribe();
      }
    });
  }

  obtenerSucursales() {
    this.sucursalService.getSucursales().subscribe((sucursales) => {
      console.log(sucursales);
      this.sucursales = sucursales;
    });
  }
}

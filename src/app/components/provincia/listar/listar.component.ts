import { Component } from '@angular/core';
import { ProvinciaService } from '../services/provincia.service';
import { Provincia } from '../interfaces/provincia';
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
  public provincias: Provincia[] = [];
  public cols!: Columnas[];
  public id: string = "id";

  constructor(private provinciaService: ProvinciaService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.obtenerProvincias();
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
    console.log('Eliminando provincia con ID:', id);
    this.confirmationService.confirm({
      message: 'Esta seguro de borrar la Provincia?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(id);
        this.provinciaService.borrar(id)
          .pipe(
            tap(resp => {
              if (resp) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Éxito',
                  detail: 'Sucursal borrada',
                  life: 3000
                });
                this.obtenerProvincias(); // Actualizar la lista después de borrar
              }
            }),
            catchError(error => {
              console.error('Error al borrar la Provincia:', error);
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


  obtenerProvincias() {
    this.provinciaService.getProvincias().subscribe((provincias) => {
      console.log(provincias);
      this.provincias = provincias;
    })
  }

}

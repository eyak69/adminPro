import { Component } from '@angular/core';
import { Observable, Subscription, catchError, of, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PaisService } from '../services/pais.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Pais } from '../interfaces/pais.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
  providers: [MessageService]
})
export class AgregarComponent {
  private _isEditar: boolean = false;
  private _pais!: Pais | null;
  miFormulario!: FormGroup;
  private _paisSubscription: Subscription | undefined;

  constructor(
    private paisService: PaisService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.startForm();
  }

  public get isEditar(): boolean {
    return this._isEditar;
  }

  public get pais(): Pais | null {
    return this._pais;
  }

  submit() {
    const paisFormValue = { ...this.miFormulario.value };
    const nuevoPais: Pais = {
      nombre: paisFormValue.nombre,
      personas: [],
      provincias: []
    };

    let operation: Observable<any>;

    if (this.isEditar) {
      operation = this.paisService.editarPais(nuevoPais);
    } else {
      operation = this.paisService.agregarPais(nuevoPais);
    }

    this._paisSubscription = operation.pipe(
      catchError( (error) => 
      {
        this.handleError('Error al ' + (this.isEditar ? 'editar' : 'agregar') + ' el país:', error)
        return of(null);
      }
      )
    ).subscribe({
      next: (pais) => {
        this.handleSuccess('País ' + (this.isEditar ? 'editado' : 'agregado') + ' correctamente');
      },
      error: (error) => {
        let errorMessage = 'Ocurrió un error al ' + (this.isEditar ? 'editar' : 'agregar') + ' el país';
        this.handleError(errorMessage, error);
      }
    });
  }

  private handleSuccess(successMessage: string) {
    console.log(successMessage);
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: successMessage,
      life: 3000
    });
    // Aquí puedes redirigir a la página de listado de países o realizar cualquier otra acción necesaria
    this.router.navigateByUrl('/pais');
  }

  private handleError(errorMessage: string, error: any) {
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    console.error(errorMessage, error);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
      life: 3000
    });
  }

  cancelar() {
    // Redirigir a la página de listado de países o realizar cualquier otra acción necesaria
    this.router.navigateByUrl('/pais');
  }

  setForm() {
    this.miFormulario = this.formBuilder.group({
      nombre: ['', Validators.required]
    });
  }

  startForm() {
    this._isEditar = false;
    if (this.router.url.includes('editar')) {
      this._isEditar = true;
      this.activatedRoute.params.subscribe((params) => {
        const id = params['id'];
        this.buscarPais(id);
        this.buscarPais(id);
      });
    }
  }

  buscarPais(id: number) {
    this._paisSubscription = this.paisService.getPais(id).subscribe({
      next: (pais: Pais | null) => {
        console.log(pais);
        this._pais = pais;
        if (pais) {
          this.miFormulario.patchValue(pais);
        }
      },
      complete: () => {
        console.log('Proceso de obtención de país completado');
      },
      error: (error: any) => {
        console.error(error);
        // Manejar el error en caso de que ocurra
      }
    });
  }
}

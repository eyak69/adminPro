import { Component } from '@angular/core';
import { Observable, Subscription, catchError, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MonedaService } from '../services/moneda.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Moneda } from '../interfaces/moneda.interface'

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class AgregarComponent {
  private _isEditar: boolean = false;
  private _moneda!: Moneda | null;
  miFormulario!: FormGroup;
  private _monedaSubscription!: Subscription;

  constructor(
    private monedaService: MonedaService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.starForm();
  }

  public get isEditar(): boolean {
    return this._isEditar;
  }
  public set isEditar(value: boolean) {
    this._isEditar = value;
  }
  public get moneda(): Moneda | null {
    return this._moneda;
  }
  public set moneda(value: Moneda | null) {
    this._moneda = value;
  }

  submit() {
    let operation: Observable<any>;
    const monedaFormValue = { ...this.miFormulario.value };
    monedaFormValue.codigo = monedaFormValue.codigo.toUpperCase(); // Convertir a mayúsculas
    this.miFormulario.setValue(monedaFormValue);
    
    if (this.isEditar) {
      operation = this.monedaService.editar(this.miFormulario.value);
    } else {
      operation = this.monedaService.agregar(this.miFormulario.value);
    }

    this._monedaSubscription = operation.pipe(
      catchError((error) => this.handleError('Error al ' + (this.isEditar ? 'editar' : 'agregar') + ' la Moneda:', error))
    ).subscribe({
      next: (moneda) => {
        this.handleSuccess('Moneda ' + (this.isEditar ? 'editada' : 'agregada') + ' correctamente');
      },
      error: (error) => {
        let errorMessage = 'Ocurrió un error al ' + (this.isEditar ? 'editar' : 'agregar') + ' la Moneda';
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
    this.router.navigateByUrl('/moneda');
  }

  private handleError(errorMessage: string, error: any): Observable<never> {
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
    return throwError(() => error);
  }

  cancelar() {
    this.router.navigateByUrl('/moneda');
  }

  setForm() {
    this.miFormulario = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      codigo: ['', Validators.required],
      locale: ['']
    })
  }

  starForm() {
    this.isEditar = false
    if (this.router.url.includes('editar')) {
      this.isEditar = true
      this.activatedRoute.params.subscribe(params => {
        const id = params['id'];
        this.buscarMoneda(id)
      })
    }
  }

  buscarMoneda(id: number) {
    this._monedaSubscription = this.monedaService.getMoneda(id).subscribe(
      {
        next: (moneda: Moneda | null) => {
          console.log(moneda);
          this.moneda = moneda;
        },
        complete: () => {
          console.log('Proceso de obtención de provincia completado');
          this.miFormulario.reset(this.moneda);
        },
        error: (error: any) => {
          // Manejar el error en caso de que ocurra
          console.error(error);
        }
      });
  }
}


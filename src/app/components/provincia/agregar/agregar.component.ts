import { Component } from '@angular/core';
import { Provincia } from '../interfaces/provincia';
import { Observable, Subscription, catchError, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProvinciaService } from '../services/provincia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class AgregarComponent {
  private _isEditar: boolean = false;
  private _provincia!: Provincia | null;
  miFormulario!: FormGroup;
  private _provinciaSubscription!: Subscription;

  constructor(private provinciaService: ProvinciaService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setForm();
    this.starForm();
   
  }

  public get isEditar(): boolean {
    return this._isEditar;
  }
  public set isEditar(value: boolean) {
    this._isEditar = value;
  }
  public get provincia(): Provincia | null{
    return this._provincia;
  }
  public set provincia(value: Provincia | null) {
    this._provincia = value;
  }

  submit() {
    console.log(this.miFormulario.value);
    let operation: Observable<any>;
  
    if (this.isEditar) {
      operation = this.provinciaService.editar(this.miFormulario.value);
    } else {
      operation = this.provinciaService.agregar(this.miFormulario.value);
    }
  
    this._provinciaSubscription = operation.pipe(
      catchError((error) => this.handleError('Error al ' + (this.isEditar ? 'editar' : 'agregar') + ' la Provincia:', error))
    ).subscribe({
      next: (provincia) => {
        this.handleSuccess('Provincia ' + (this.isEditar ? 'editada' : 'agregada') + ' correctamente');
      },
      error: (error) => {
        let errorMessage = 'Ocurrió un error al ' + (this.isEditar ? 'editar' : 'agregar') + ' la Provincia';
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
    this.router.navigateByUrl('/provincia');
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
    this.router.navigateByUrl('/provincia');
  }


  setForm() {
    this.miFormulario = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      valor: ['']
    })
  }

  starForm() {
    this.isEditar = false
    if (this.router.url.includes('editar')) {
      this.isEditar = true
      this.activatedRoute.params.subscribe(params => {
        const id = params['id'];
        this.buscarProvincia(id)
      })
    }
  }

  buscarProvincia(id: number) {
    this._provinciaSubscription = this.provinciaService.getProvincia(id).subscribe(
      {
        next: (provincia: Provincia | null) => {
          console.log(provincia);
          this.provincia = provincia;
        },
        complete: () => {
          console.log('Proceso de obtención de provincia completado');
          this.miFormulario.reset(this.provincia);
        },
        error: (error: any) => {
          // Manejar el error en caso de que ocurra
          console.error(error);
        }
      });
  }

}

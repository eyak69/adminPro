import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProvinciaService } from '../../provincia/services/provincia.service';
import { SucursalService } from '../services/sucursal.service';
import { ActivatedRoute } from '@angular/router';
import { Provincia } from '../../provincia/interfaces/provincia';
import { Router } from '@angular/router';
import { Sucursal } from '../interfaces/sucursal';
import { Observable, Subscription, catchError, throwError } from 'rxjs';
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
  public miFormulario!: FormGroup;

  private _sucursal!: Sucursal | null;
  private _provincias!: Provincia[];
  private _sucursalSubscription!: Subscription;



  constructor(private provinciaService: ProvinciaService,
    private sucursalService: SucursalService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isEditar = false

    this.buscarProvincias();

    this.miFormulario = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      provincia: new FormControl<Provincia[] | null>(null, Validators.required)
    });

    if (!this.router.url.includes('editar')) {
      this.miFormulario.reset(this.sucursal)
      return
    }

    this.isEditar = true
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this._sucursalSubscription = this.sucursalService.getSucursal(id).subscribe(sucursal => {
        console.log(sucursal);
        this.miFormulario.reset(sucursal);
        this._sucursal = sucursal;
      });
    });
  }

  public get isEditar(): boolean {
    return this._isEditar;
  }
  public set isEditar(value: boolean) {
    this._isEditar = value;
  }
  public get sucursal(): Sucursal | null {
    return this._sucursal;
  }
  public set sucursal(value: Sucursal | null) {
    this._sucursal = value;
  }

  buscarProvincias() {
    this._sucursalSubscription = this.provinciaService.getProvincias(1,10).subscribe({
      next: (provincias: Provincia[]) => {
        // Aquí tienes acceso a los datos de las provincias como un array de objetos Provincia[]
        console.log(provincias);
        this._provincias = provincias;
      },
      error: (error: any) => {
        // Manejar el error en caso de que ocurra
        console.error(error);
      }
    });
  }

  public get provincias(): Provincia[] {
    return this._provincias;
  }
  public set provincias(value: Provincia[]) {
    this._provincias = value;
  }

  submit() {
    let operation: Observable<any>;

    if (this.isEditar) {
      operation = this.sucursalService.editar(this.miFormulario.value);
    } else {
      operation = this.sucursalService.agregar(this.miFormulario.value);
    }

    this._sucursalSubscription = operation.pipe(
      catchError((error) => this.handleError('Error al ' + (this.isEditar ? 'editar' : 'agregar') + ' la Sucursal:', error))
    ).subscribe((sucursal) => {
      this.handleSuccess('Sucursal ' + (this.isEditar ? 'editada' : 'agregada') + ' correctamente');
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
    this.router.navigateByUrl('/sucursal');
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
    this.router.navigateByUrl('/sucursal');
  }
}

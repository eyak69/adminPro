import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProvinciaService } from '../../provincia/services/provincia.service';
import { PaisService } from '../../pais/services/pais.service';
import { PersonaService } from '../services/persona.service';
import { ActivatedRoute } from '@angular/router';
import { Provincia } from '../../provincia/interfaces/provincia';
import { Router } from '@angular/router';
import { Persona } from '../interfaces/persona.interface';
import { Observable, Subscription, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Pais } from '../../pais/interfaces/pais.interface';
import { TipoPersona } from '../interfaces/tipopersona.interface';

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

  private _persona!: Persona | null;
  private _provincias!: Provincia[];
  private _paises!: Pais[];
  private _tipoPersona!: TipoPersona[];
  private _personaSubscription!: Subscription;
  private _provinciaSubscription!: Subscription;
  private _paisSubscription!: Subscription;

  
  constructor(private provinciaService: ProvinciaService,
    private personaService: PersonaService,
    private paisService: PaisService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) {
    }
    
    ngOnInit(): void {
      
      this.buscarPais()
      this.setForm();
      this.starForm();
      //this.buscarProvincias()
    }
    
    
    buscarPersona(id: number) {
      this._personaSubscription = this.personaService.getPersona(id).subscribe(
        {
          next: (persona: Persona | null) => {
            console.log(persona);
            this.persona = persona;
          },
          complete: () => {
          console.log('Proceso de obtención de persona completado');
          this.miFormulario.reset(this.persona);
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }

    buscarPais() {
      this._paisSubscription = this.paisService.getPaises().subscribe({
        next: (paises: Pais[]) => {
          this.paises = paises;
          console.log(paises);
        },
        complete: () => {
          console.log('Proceso de obtención de paises completado');
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
    
    buscarProvincias() {
      this._provinciaSubscription = this.provinciaService.getProvincias().subscribe({
        next: (provincias: Provincia[]) => {
          //const nuevoObjeto = provincias.map(({ provincia, ...resto }) => resto);
          this.provincias = provincias;
          //console.log(nuevoObjeto);
        },
        complete: () => {
          console.log('Proceso de obtención de provincias completado');
          this.starForm()
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }
    
    public get isEditar(): boolean {
      return this._isEditar;
    }
    public set isEditar(value: boolean) {
      this._isEditar = value;
    }
    public get persona(): Persona | null {
      return this._persona;
    }
    public set persona(value: Persona | null) {
      this._persona = value;
    }
  public get provincias(): Provincia[] {
    return this._provincias;
  }
  public set provincias(value: Provincia[]) {
    this._provincias = value;
  }
  public get paises(): Pais[] {
    return this._paises;
  }
  public set paises(value: Pais[]) {
    this._paises = value;
  }

  public get tipoPersona(): TipoPersona[] {
    return this.personaService.tipoPersona;
  }
  
  
  submit() {
    console.log(this.miFormulario.value);
    let operation: Observable<any>;
  
    if (this.isEditar) {
      operation = this.personaService.editar(this.miFormulario.value);
    } else {
      operation = this.personaService.agregar(this.miFormulario.value);
    }
    this._personaSubscription = operation.pipe(
      catchError((error) => this.handleError('Error al ' + (this.isEditar ? 'editar' : 'agregar') + ' la Persona:', error))
    ).subscribe({
      next: (persona) => {
        this.handleSuccess('Persona ' + (this.isEditar ? 'editada' : 'agregada') + ' correctamente');
      },
      error: (error) => {
        let errorMessage = 'Ocurrió un error al ' + (this.isEditar ? 'editar' : 'agregar') + ' la Persona';
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
    this.router.navigateByUrl('/persona');
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
    this.router.navigateByUrl('/persona');
  }

  setForm() {
    this.miFormulario = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoPersona: new FormControl<TipoPersona[] | null>(null,Validators.required),
      razonSocial: ['', Validators.required],
      cuit: ['', Validators.required],
      pais: [''],
      provincia: ['']
    });
  }

  starForm() {
    this.isEditar = false;
    if (this.router.url.includes('editar')) {
      this.isEditar = true;
      this.activatedRoute.params.subscribe(params => {
        const id = params['id'];
        this.buscarPersona(id);
      });
    }
  }

  onPaisValueChange(event: any) {
      this.provincias = event.provincias
  }
  
}

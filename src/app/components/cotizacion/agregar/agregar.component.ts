import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable, Subscription, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Moneda } from '../../moneda/interfaces/moneda.interface';
import { Cotizacion } from '../interfaces/cotizacion.interface';
import { MonedaService } from '../../moneda/services/moneda.service';
import { CotizacionService } from '../services/cotizacion.service';

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

  private _monedas!: Moneda[];
  private _cotizacion!: Cotizacion | null;
  private _monedasSubscription!:Subscription;
  private _cotizacionSubscription!:Subscription;

  constructor(private monedaService: MonedaService,
    private cotizacionService: CotizacionService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  public get monedas(): Moneda[] {
    return this._monedas;
  }
  public set monedas(value: Moneda[]) {
    this._monedas = value;
  }
  public get isEditar(): boolean {
    return this._isEditar;
  }
  public set isEditar(value: boolean) {
    this._isEditar = value;
  }
  public get cotizacion(): Cotizacion | null {
    return this._cotizacion;
  }
  public set cotizacion(value: Cotizacion | null) {
    this._cotizacion = value;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setForm();
    this.buscarMonedas()
  }

  buscarMonedas(){ 
    this._monedasSubscription = this.monedaService.getMonedas().subscribe({
      next: (monedas: Moneda[]) => {
        //console.log(monedas);
        this.monedas = monedas
      },
      complete: () => {
        console.log('Proceso de obtención de monedas completado');
        this.starForm()
      },
      error: (error: any) => {
        console.error(error);
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

  setForm() {
    this.miFormulario = this.formBuilder.group({
      id: [''],
      monedas: new FormControl<Moneda[]>([], Validators.required),
      valor: ['', Validators.required]
    })
  }

  starForm() {
    this.isEditar = false
    if (this.router.url.includes('editar')) {
      this.isEditar = true
      this.activatedRoute.params.subscribe(params => {
        const id = params['id'];
        this.buscarCotizacion(id)
      })
    }
  }

  buscarCotizacion(id: number) {
    this._cotizacionSubscription = this.cotizacionService.getCotizacion(id).subscribe(
      {
        next: (cotizacion: Cotizacion | null) => {
          console.log(cotizacion);
          this.cotizacion = cotizacion;
        },
        complete: () => {
          console.log('Proceso de obtención de sucursal completado');
          this.miFormulario.reset(this.cotizacion);
        },
        error: (error: any) => {
          // Manejar el error en caso de que ocurra
          console.error(error);
        }
      });
  }

  cancelar() {
    this.router.navigateByUrl('/cotizacion');
  }

  submit(){}

}

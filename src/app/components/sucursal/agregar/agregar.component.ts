import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProvinciaService } from '../../provincia/services/provincia.service';
import { SucursalService } from '../services/sucursal.service';
import { ActivatedRoute } from '@angular/router';
import { Provincia } from '../../provincia/interfaces/provincia';
import { Router } from '@angular/router';
import { Sucursal } from '../interfaces/sucursal';
import { Subscription } from 'rxjs';
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
  private _sucursal!: Sucursal | null;
  sucursalDialog: boolean = true;


  private _provincias!: Provincia[];

  private _provinciaSubscription!: Subscription;

  miFormulario!: FormGroup;

  constructor(private provinciaService: ProvinciaService,
    private sucursalService: SucursalService,
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
      id:[''],
      name: ['', Validators.required],
      provincia: new FormControl<Provincia[] | null>(null, Validators.required)
    });

    if (!this.router.url.includes('editar')) {
      this.miFormulario.reset(this.sucursal)
      return
    }

    this.isEditar = true
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.sucursalService.getSucursal(id).subscribe(sucursal => {
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
    this.provinciaService.getProvincias().subscribe({
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
    if (this.isEditar) {
      this.sucursalService.editar(this.miFormulario.value).subscribe(sucursal => {
        this.router.navigateByUrl('/sucursal');
      });

    }
    else {
      this.sucursalService.agregar(this.miFormulario.value).subscribe(sucursal => {
        this.router.navigateByUrl('/sucursal');
      });
    }
//    this.router.navigateByUrl('/sucursal');
  }

  cancelar() {
    this.router.navigateByUrl('/sucursal');
  }
}

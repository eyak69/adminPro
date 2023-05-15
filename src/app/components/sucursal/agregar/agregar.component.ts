import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProvinciaService } from '../../provincia/services/provincia.service';
import { ActivatedRoute } from '@angular/router';
import { Provincia } from '../../provincia/interfaces/provincia';
import { Router } from '@angular/router';
import { Sucursal } from '../interfaces/sucursal';






@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent {
  private _isEditar: boolean = false;
  private _sucursal!: Sucursal
  private _provincias!: Provincia[] | null;

  miFormulario!: FormGroup;

  constructor(private provinciaService: ProvinciaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder){

    }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.

      this.miFormulario = this.formBuilder.group({
        nombre: ['',Validators.required],
        provincia: new FormControl<Provincia[] | null>(null, Validators.required)
      });

      if (this.router.url.includes('editar')) {
          
      }

       
    }

    public get isEditar(): boolean {
      return this._isEditar;
    }
    public set isEditar(value: boolean) {
      this._isEditar = value;
    }

    buscarProvincias() {
       this.provinciaService.getProvincias().subscribe(
        (provincias: Provincia[] | null) => {
          // Aquí tienes acceso a los datos de las provincias como un array de objetos Provincia[]
          console.log(provincias);
          this._provincias = provincias;
        },
        (error: any) => {
          // Manejar el error en caso de que ocurra
          console.error(error);
        }
      );
    }


}

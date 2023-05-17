import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Sucursal } from '../../sucursal/interfaces/sucursal'
import { Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

// ...

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const passwordRepetir = control.get('passwordRepetir');

  if (password && passwordRepetir && password.value !== passwordRepetir.value) {
    return { passwordMismatch: true };
  }

  return null;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    `
    .error-message {
      color: red;
      margin-top: 5px;
    }

    `],
  providers: [MessageService]
})

export class RegisterComponent {


  private _usuario!: Usuario | null;
  private _editar!: boolean;
  private _sucursal!: Sucursal[];

  miFormulario!: FormGroup;

  constructor(private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isEditar = false
    this.buscarSucursales();
    console.log(this.isEditar)
    if (!this.router.url.includes('editar')) {
      this.miFormulario = this.formBuilder.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        passwordRepetir: ['', [Validators.required]],
        sucursales: new FormControl<Sucursal[] | null>(null)
      }, {
        validator: passwordMatchValidator
      });
      debugger
      this.miFormulario.reset(this.usuario)
      return;
    }
    else {
      this.miFormulario = this.formBuilder.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        sucursales: new FormControl<Sucursal[] | null>(null,Validators.required)
      });
    }
    this.isEditar = true
    this.buscarUsuario();
    console.log(this.isEditar)
  }

  public get sucursal(): Sucursal[] {
    return this._sucursal;
  }
  public set sucursal(value: Sucursal[]) {
    this._sucursal = value;
  }

  public get usuario(): Usuario | null {
    return this._usuario;
  }
  public set usuario(value: Usuario | null) {
    this._usuario = value;
  }

  public get isEditar(): boolean {
    return this._editar;
  }
  public set isEditar(value: boolean) {
    this._editar = value;
  }

  buscarSucursales() {
    this.usuarioService.getSucursales().
      subscribe(sucursal => {
        this.sucursal = sucursal;
        console.log(sucursal);
      });
  }

  buscarUsuario() {
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.usuarioService.getUsuario(id))
    ).subscribe(usuario => {
      this.usuario = usuario;
      this.miFormulario.reset(this.usuario);
      console.log(usuario)
    })
  }

  submit() { 
   
    if (this.miFormulario.valid){
      if (this.isEditar){

      }
      else{
        this.usuarioService.addUsuario(this.miFormulario.value).subscribe(resp=>{
          console.log(resp)
        })
      }
    }
  }

  cancelar() {
    console.log("Cancelar")
  }

  handleTextChanged(event: any) {
    const text = event.target.value;
    console.log('handleTextChanged:', text);
  }

}

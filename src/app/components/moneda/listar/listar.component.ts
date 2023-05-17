import { Component } from '@angular/core';
import { Moneda } from '../interfaces/moneda.interface'
import { MonedaService } from '../services/moneda.service';
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
  public monedas: Moneda[] = [];
  public cols!: Columnas[];
  public id: string = "id";

  constructor(private monedaService: MonedaService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.obtenerMonedas();
    this.cols = [
      { campo: 'nombre', nombre: 'Nombre' },
      { campo: 'codigoSwift', nombre: 'Codigo Swift' },
    ];
  }

  obtenerMonedas() {
    this.monedaService.getMonedas().subscribe((monedas) => {
      //console.log(monedas);
      //debugger
      this.monedas = monedas;
    });
  }

  actualizarMoneda(){}

  nuevaMoneda(){}

  editMoneda(id:number){}

  deleteMoneda(id:number){}


}

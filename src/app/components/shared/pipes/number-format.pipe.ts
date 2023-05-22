import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(numero: number): string {
    //debugger
    const partes = numero.toFixed(3).split('.');
    const enteros = partes[0].padStart(10, '0');
    const decimales = partes[1];
    return `${enteros}.${decimales}`;
  }

}

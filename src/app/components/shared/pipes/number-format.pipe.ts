import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {


  transform(numero: number, ...args: any[]): string {
    const [arg1, arg2] = args
    const options = {
      minimumFractionDigits: arg1,
      maximumFractionDigits: arg2
    };
    return numero.toLocaleString('es', options);
  }

}

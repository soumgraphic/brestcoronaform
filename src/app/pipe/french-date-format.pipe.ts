import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'frenchDateFormat'
})
export class FrenchDateFormatPipe implements PipeTransform {

  transform(value: string): any {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'dd/MM/yyyy');
    return value;
  }

}

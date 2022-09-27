import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArrayByObjProp',
  standalone: true,
  pure: true,
})
export class FilterArrayByObjectPropertyPipe implements PipeTransform {
  transform(array: any[], property: string, value: string): any[] {
    return array.filter((item) => item[property] === value);
  }
}

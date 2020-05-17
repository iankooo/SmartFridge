import {Output, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'name',
  pure: false
})
export class NamePipe implements PipeTransform {
  @Output('newIndex') newIndex: number;
  transform(value: any, nameString: string, propName: string, propStoreLocation: string): any {
    if (value.length === 0 || nameString === '' || nameString === undefined) {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propName].toLocaleLowerCase().match(nameString.toLocaleLowerCase()) ||
        item[propStoreLocation].toLocaleLowerCase().match(nameString.toLocaleLowerCase())) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}

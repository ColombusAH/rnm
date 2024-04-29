import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelToSnake',
  standalone: true
})
export class CamelToSnakePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    // First replace all camelCase with snake_case and convert all to uppercase
    return value
      .replace(/[A-Z]/g, (letter, index) => index == 0 ? letter : `_${letter}`)
      .toUpperCase();
  }

}

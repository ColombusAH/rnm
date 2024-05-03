import { ChangeDetectorRef, inject, Pipe, PipeTransform } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translateArray',
  standalone: true,

})
export class TranslateArrayPipe implements PipeTransform {
  translateService = inject(TranslateService);
  cd = inject(ChangeDetectorRef);
  translatePipe = new TranslatePipe(this.translateService, this.cd);
  
  transform(value: string[]): string[] {
    console.log('value', value);
    if (value) {
      return value.map((item) => {

        return this.translatePipe.transform(item.toUpperCase());
      });
    }
    return value;
  }

}

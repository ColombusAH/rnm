import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService as PrimeMessageAPI } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  messageService = inject(PrimeMessageAPI);
  translateService = inject(TranslateService);


  
  
}

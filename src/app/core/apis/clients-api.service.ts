import { inject, Injectable, signal } from '@angular/core';
import { remult } from 'remult';
import { Client } from '../../../shared/entities/client.entity';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsApiService {
  private _clients = signal<Client[]>([]);
  clientRepo = remult.repo(Client);
  messageService = inject(MessageService);
  translateService = inject(TranslateService);
  clients = this._clients.asReadonly();

  constructor() {
    this.clientRepo.liveQuery().subscribe((data) =>{
      console.log('data', data);
      const {items} = data;
      this._clients.update(() =>items);
    });
   }

  
  getClients() {
    const clients = this.clientRepo.find();
    return clients;
  }

  async editClient(client: Client) {
    const { tenantId, tenant, ...rest } = client;
    const isNew = !rest.id;
    const action = isNew ? 'insert' : 'save';
    const response = await this.clientRepo[action](rest);
    const translationKeys = isNew ? ['CLIENTS_PAGE.CREATE_SUCCESS', 'SUCCESS'] : ['CLIENTS_PAGE.UPDATE_SUCCESS', 'SUCCESS'];
    const translations = await firstValueFrom(this.translateService.get(translationKeys));

    this.messageService.add({
      severity: 'success',
      summary: translations.SUCCESS,
      detail: translations[translationKeys[0]]
    });
    return response;
    // if (!rest.id) {
    //   console.log('insert')
    //   const response = await this.clientRepo.insert(rest);
    //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Client Created' });
    //   return response
    // }
    // const response = await this.clientRepo.save(rest);
    // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Client Updated' });
    // return response;
  }
}

import { inject, Injectable, signal } from '@angular/core';
import { remult } from 'remult';
import { Client } from '../../../shared/entities/client.entity';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ClientsApiService {
  private _clients = signal<Client[]>([]);
  clientRepo = remult.repo(Client);
  messageService = inject(MessageService);
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
    if (!rest.id) {
      console.log('insert')
      const response = await this.clientRepo.insert(rest);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Client Created' });
      return response
    }
    const response = await this.clientRepo.save(rest);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Client Updated' });
    return response;
  }
}

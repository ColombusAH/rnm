import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { remult } from 'remult';
import { Client } from '../../../shared/entities/client.entity';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ClientsApiService {
  baseUrl = environment.baseUrl;
  clientRepo = remult.repo(Client);
  messageService = inject(MessageService);
  
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

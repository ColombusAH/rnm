import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { remult } from 'remult';
import { Client } from '../../../shared/entities/client.entity';

@Injectable({
  providedIn: 'root'
})
export class ClientsApiService {
  baseUrl = environment.baseUrl;
  clientRepo = remult.repo(Client);
  
  getClients() {
    const clients = this.clientRepo.find();
    return clients;
  }

  editClient(client: Client) {
    const { tenantId, tenant, ...rest } = client;
    if (!rest.id) {
      console.log('insert')
      return this.clientRepo.insert(rest);
    }
    console.log('save');
    return this.clientRepo.save(rest);
  }
}

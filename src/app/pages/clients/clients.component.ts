import { Component, inject, OnInit } from '@angular/core';
import { ClientsApiService } from '../../core/apis/clients-api.service';
import { Client } from '../../../shared/entities/client.entity';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { EditClientComponent } from './edit-client/edit-client.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    EditClientComponent,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {

  clientService = inject(ClientsApiService);
  clients: Client[] = [];
  selectedClient: Client | null = null;
  displayDialog: boolean = false;

  async ngOnInit(): Promise<void> {
    this.clients = await this.clientService.getClients();
    console.log('this.clients', this.clients);
  }

  showEditDialog(client: Client) {
    console.log('showEditDialog');
    console.log('client', client);
    this.selectedClient = { ...client };
    this.displayDialog = true;
  }

  async onEditClient($event: Client) {
    console.log('$event', $event);
   const res = await  this.clientService.editClient($event);
   console.log('[onEditClient]');
   console.log('res', res);
  }

  confirmDelete(arg0: any) {
    throw new Error('Method not implemented.');
  }



}

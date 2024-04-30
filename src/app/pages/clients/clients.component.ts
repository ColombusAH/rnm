import { Component, inject, OnInit } from '@angular/core';
import { ClientsApiService } from '../../core/apis/clients-api.service';
import { Client } from '../../../shared/entities/client.entity';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
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
    TranslateModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit {

  clientService = inject(ClientsApiService);
  clients = this.clientService.clients;
  selectedClient: Client | null = null;
  displayDialog: boolean = false;

  async ngOnInit(): Promise<void> {
    console.log('this.clients', this.clients());
  }

  showEditDialog(client: Client) {
    this.selectedClient = { ...client };
    this.displayDialog = true;
  }

  async onEditClient($event: Client) {
    const res = await this.clientService.editClient($event);
    this.selectedClient = null;
    this.displayDialog = false;
  }

  confirmDelete(arg0: any) {
    console.log('confirmDelete', arg0);
  }

}

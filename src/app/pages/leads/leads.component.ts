import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Lead } from '../../../shared/entities';
import { LeadsApiService } from '../../core/apis/leads-api.service';
import { DatePipe } from '@angular/common';
import { EditLeadComponent } from './edit-lead/edit-lead.component';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [
    EditLeadComponent,
    TableModule,
    DialogModule,
    ButtonModule,
    TranslateModule,
    DatePipe
  ],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})
export class LeadsComponent implements OnInit {

  leadsService = inject(LeadsApiService);
  leads: Lead[] = [];
  displayDialog: boolean = false;
  selectedLead: Lead | null = null;

  async ngOnInit() {
    this.leads = await this.leadsService.getLeads();
    console.log('this.leads', this.leads);
  }

  async onEditLead($event: Lead) {
    console.log('$event', $event);
    const res = await this.leadsService.editLead($event);
    console.log('[onEditLead]');
    console.log('res', res);
  }

  confirmDelete(arg0: any) {
    throw new Error('Method not implemented.');
  }

  showEditDialog(lead: Lead) {
    this.selectedLead = lead;
    this.displayDialog = true;
  }

}

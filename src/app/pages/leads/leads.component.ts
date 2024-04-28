import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { Lead } from '../../../shared/entities';
import { LeadsApiService } from '../../core/apis/leads-api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    ButtonModule,
    TranslateModule,
    DatePipe
  ],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})
export class LeadsComponent implements OnInit{
  
  leadsApiService = inject(LeadsApiService);
  leads: Lead[] = [];
  displayDialog: boolean = false;
  selectedLead: Lead | null = null;

  async ngOnInit() {
    this.leads = await this.leadsApiService.getLeads();
    console.log('this.leads', this.leads);
  }

  confirmDelete(arg0: any) {
    throw new Error('Method not implemented.');
    }
    showEditDialog(_t21: any) {
    throw new Error('Method not implemented.');
    }

}

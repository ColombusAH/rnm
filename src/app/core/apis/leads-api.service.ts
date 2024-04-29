import { inject, Injectable } from '@angular/core';
import { remult } from 'remult';
import { Lead } from '../../../shared/entities';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class LeadsApiService {

  leadRepo = remult.repo(Lead);
  messageService = inject(MessageService);
  
  getLeads() {
    const leads = this.leadRepo.find();
    return leads;
  }

 async  editLead(lead: Lead) {
    const { tenantId, tenant, ...rest } = lead;
    if (!rest.id) {
      console.log('insert')
      const response = await this.leadRepo.insert(rest);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lead Created' });
      return response
    }
    const response = await this.leadRepo.save(rest);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lead Updated' });
    return response;
  }


}

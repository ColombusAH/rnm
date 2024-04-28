import { Injectable } from '@angular/core';
import { remult } from 'remult';
import { Lead } from '../../../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class LeadsApiService {

  leadRepo = remult.repo(Lead);
  
  getLeads() {
    const leads = this.leadRepo.find();
    return leads;
  }

  editLead(lead: Lead) {
    const { tenantId, tenant, ...rest } = lead;
    if (!rest.id) {
      console.log('insert')
      return this.leadRepo.insert(rest);
    }
    console.log('save');
    return this.leadRepo.save(rest);
  }


}

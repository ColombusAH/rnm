import { inject, Injectable, signal } from '@angular/core';
import { remult } from 'remult';
import { Lead } from '../../../shared/entities';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { JobType } from '../../../shared/enums/job-type.enum';

@Injectable({
  providedIn: 'root'
})
export class LeadsApiService {

  private _leads = signal<Lead[]>([]);
  private _jobTypes = signal<JobType[]>(Object.values(JobType));
  leadRepo = remult.repo(Lead);
  messageService = inject(MessageService);
  translateService = inject(TranslateService);
  leads = this._leads.asReadonly();
  jobTypes = this._jobTypes.asReadonly();

  constructor() {
    this.leadRepo.liveQuery().subscribe((data) =>{
      console.log('data', data);
      const {items} = data;
      this._leads.update(() =>items);
    });
   }

 async  editLead(lead: Lead) {
    const { tenantId, tenant, ...rest } = lead;
    const isNew = !rest.id;
    const action = isNew ? 'insert' : 'save';

    const response = await this.leadRepo[action](rest);
    const translationKeys = isNew ? ['LEADS_PAGE.ADD_SUCCESS', 'SUCCESS'] : ['LEADS_PAGE.UPDATE_SUCCESS', 'SUCCESS'];
    const translations = await firstValueFrom(this.translateService.get(translationKeys));

    this.messageService.add({
      severity: 'success',
      summary: translations.SUCCESS,
      detail: translations[translationKeys[0]]
    });
  
    return response;
  }
}

import { inject, Injectable, signal } from '@angular/core';
import { Event } from '../../../shared/entities';
import { remult } from 'remult';
import { MessageService } from 'primeng/api';
import { EventStatus } from '../../../shared/enums/events.enums';
import { JobType } from '../../../shared/enums/job-type.enum';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsApiService {
  private _events = signal<Event[]>([]);
  private _eventsStatuses = signal<EventStatus[]>(Object.values(EventStatus));
  private _jobTypes = signal<JobType[]>(Object.values(JobType));

  eventsRepo = remult.repo(Event);
  messageService = inject(MessageService);
  translateService = inject(TranslateService);
  events = this._events.asReadonly();
  eventStatuses = this._eventsStatuses.asReadonly();
  jobTypes = this._jobTypes.asReadonly();

  constructor() {
    console.log('EventsApiService');
    console.log('eventStatuses', this.eventStatuses());
    this.eventsRepo.liveQuery().subscribe((data) =>{
      console.log('data', data);
      const {items} = data;
      this._events.update(() =>items);
    });
   }


  getEvents() {
    const events = this.eventsRepo.find();
    return events;
  }

  async editEvent(event: Event) {
    const { tenantId, tenant, ...rest } = event;
    const isNew = !rest.id;
    const action = isNew ? 'insert' : 'save';
  
    const response = await this.eventsRepo[action](rest);
  
    const translationKeys = isNew ? ['EVENTS_PAGE.CREATE_SUCCESS', 'SUCCESS'] : ['EVENTS_PAGE.UPDATE_SUCCESS', 'SUCCESS'];
    const translations = await firstValueFrom(this.translateService.get(translationKeys));
  

    this.messageService.add({
      severity: 'success',
      summary: translations.SUCCESS,
      detail: translations[translationKeys[0]]
    });
  
    console.log('translations', translations);
    return response;
  }
  

}

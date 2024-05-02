import { inject, Injectable, signal } from '@angular/core';
import { Event } from '../../../shared/entities';
import { remult } from 'remult';
import { MessageService } from 'primeng/api';
import { EventStatus } from '../../../shared/enums/events.enums';

@Injectable({
  providedIn: 'root'
})
export class EventsApiService {
  private _events = signal<Event[]>([]);
  private _eventsStatuses = signal<EventStatus[]>(Object.values(EventStatus));

  eventsRepo = remult.repo(Event);
  messageService = inject(MessageService);
  events = this._events.asReadonly();
  eventStatuses = this._eventsStatuses.asReadonly();

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
    if (!rest.id) {
      console.log('insert')
      const response = await this.eventsRepo.insert(rest);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Event Created' });
      return response
    }
    const response = await this.eventsRepo.save(rest);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Event Updated' });
    return response;
  }

}

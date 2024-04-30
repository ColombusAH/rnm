import { inject, Injectable, signal } from '@angular/core';
import { Event } from '../../../shared/entities';
import { remult } from 'remult';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class EventsApiService {
  private _events = signal<Event[]>([]);
  eventsRepo = remult.repo(Event);
  messageService = inject(MessageService);
  events = this._events.asReadonly();

  constructor() {
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

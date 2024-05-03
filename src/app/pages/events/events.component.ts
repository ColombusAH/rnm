import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EventStatus } from '../../../shared/enums/events.enums';
import { EventsApiService } from '../../core/apis/events-api.service';
import { Event } from '../../../shared/entities';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { EditEventsComponent } from './edit-events/edit-events.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [TableModule, TranslateModule, DialogModule, ButtonModule, DatePipe, EditEventsComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent {

  eventsService = inject(EventsApiService);
  events = this.eventsService.events;
  eventStatuses = this.eventsService.eventStatuses;
  jobTypes = this.eventsService.jobTypes;
  displayDialog: boolean = false;
  selectedEvent: Event | null = null;

  onEditLead($event: Event) {
    this.eventsService.editEvent($event);
    this.selectedEvent = null;
    this.displayDialog = false;
  }

  confirmDelete(arg0: any) {
    throw new Error('Method not implemented.');
  }
  showEditDialog(event: Event) {
    this.selectedEvent = { ...event };
    this.displayDialog = true;
  }

}

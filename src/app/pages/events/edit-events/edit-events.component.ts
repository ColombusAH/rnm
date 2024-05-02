import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, input, effect, signal, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { CamelToSnakePipe } from '../../../pipes/camel-to-snake.pipe';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { EventStatus } from '../../../../shared/enums/events.enums';
import { Event } from '../../../../shared/entities';

@Component({
  selector: 'app-edit-events',
  standalone: true,
  imports: [NgIf, NgFor, CamelToSnakePipe, UpperCasePipe, InputTextModule, ReactiveFormsModule, TranslateModule, CalendarModule, ButtonModule, DropdownModule],
  templateUrl: './edit-events.component.html',
  styleUrl: './edit-events.component.scss'
})
export class EditEventsComponent {

  fb = inject(FormBuilder);
  statusOptions = input<EventStatus[]>([]);
  event = input<Event | null>(null);
  editEventForm!: FormGroup;
  isDisabled = signal<boolean>(false);
  editedLead = output<Event>();

  constructor() {
    effect(() => {
      this.initForm(this.event());
    });
  }

  initForm(event: Event | null) {
    console.log('event', event);
    console.log('eventStatuses', this.statusOptions());
    this.editEventForm = this.fb.group({
      name: [event?.name],
      description: [event?.description],
      // clientId: [event?.clientId],
      location: [event?.location],
      notes: [event?.notes],
      status: [event?.status],
      fromDate: [event?.fromDate],
      toDate: [event?.toDate],
    });

  }

  onSubmit() {
    if (this.editEventForm.valid) {
      console.log('editEventForm', this.editEventForm.value);
      this.editedLead.emit(this.editEventForm.value);
    }
  }

  onCancel() {
    throw new Error('Method not implemented.');
  }
}

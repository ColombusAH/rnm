import { UpperCasePipe } from '@angular/common';
import { Component, input, effect, signal, inject, output, computed } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { CamelToSnakePipe } from '../../../pipes/camel-to-snake.pipe';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { EventStatus } from '../../../../shared/enums/events.enums';
import { Event } from '../../../../shared/entities';
import { JobType } from '../../../../shared/enums/job-type.enum';
import { TranslateArrayPipe } from '../../../pipes/translate-array.pipe';

@Component({
  selector: 'app-edit-events',
  standalone: true,
  imports: [CamelToSnakePipe, UpperCasePipe, TranslateArrayPipe, InputTextModule, ReactiveFormsModule, TranslateModule, CalendarModule, ButtonModule, DropdownModule],
  templateUrl: './edit-events.component.html',
  styleUrl: './edit-events.component.scss'
})
export class EditEventsComponent {

  fb = inject(FormBuilder);
  statusOptions = input<EventStatus[]>([]);
  jobTypes = input<JobType[]>([]);
  event = input<Event | null>(null);
  editEventForm!: FormGroup;
  editedEvent = output<Event>();
  cancel = output<void>();
  isDisabled = signal<boolean>(false);
  isNewEvent = computed(() => !this.event());

  constructor() {
    effect(() => {
      this.initForm(this.event());
    });
  }

  initForm(event: Event | null) {
    this.editEventForm = this.fb.group({
      name: [event?.name, [Validators.required]],
      description: [event?.description, [Validators.required]],
      type: [event?.type, [Validators.required]],
      location: [event?.location, [Validators.required]],
      notes: [event?.notes],
      status: [event?.status || EventStatus.Pending, [Validators.required]],
      fromDate: [event?.fromDate, [Validators.required]],
      toDate: [event?.toDate, [Validators.required]],
    });

  }

  onSubmit() {
    if (this.editEventForm.valid) {
      this.isDisabled.update(() => true);
      this.editedEvent.emit({id: this.event()?.id,...this.editEventForm.value});
    }
  }

  onCancel() {
    this.editEventForm.reset();
    this.cancel.emit();
  }
}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Lead } from '../../../../shared/entities';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { CamelToSnakePipe } from '../../../pipes/camel-to-snake.pipe';

@Component({
  selector: 'app-edit-lead',
  standalone: true,
  imports: [NgIf, NgFor, CamelToSnakePipe, UpperCasePipe, ReactiveFormsModule, TranslateModule, CalendarModule],
  templateUrl: './edit-lead.component.html',
  styleUrl: './edit-lead.component.scss'
})
export class EditLeadComponent implements OnChanges, OnInit {
  @Input() lead: Lead | null = null;
  @Output() editLead = new EventEmitter<Lead>();
  @Output() cancel = new EventEmitter<void>();
  editLeadForm!: FormGroup;
  isDisabled = signal<boolean>(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.lead && changes.lead.firstChange === false) {
      this.initForm(this.lead);
    }
  }

  ngOnInit(): void {
    this.initForm(this.lead);
  }

  initForm(lead: Lead | null) {
    this.editLeadForm = new FormGroup({
      name: new FormControl(lead?.name, [Validators.required]),
      jobType: new FormControl(lead?.jobType, [Validators.required]),
      source: new FormControl(lead?.source, [Validators.required]),
      location: new FormControl(lead?.location, [Validators.required]),
      fromDate: new FormControl(lead?.fromDate, [Validators.required]),
      toDate: new FormControl(lead?.toDate, [Validators.required]),
      notes: new FormControl(lead?.notes)
    });

  }
  onSubmit() {
    if (this.editLeadForm.valid) {
      this.editLead.emit({...this.lead, ...this.editLeadForm.value});
      this.isDisabled.update(() => true);
    }
  }
  onCancel() {
    this.editLeadForm.reset();
    this.cancel.emit();
  }
}

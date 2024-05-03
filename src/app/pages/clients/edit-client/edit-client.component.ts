import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Client } from '../../../../shared/entities/client.entity';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, DropdownModule, ButtonModule, InputTextModule, TranslateModule],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss'
})
export class EditClientComponent implements OnChanges, OnInit {


  @Input() types: string[] = [];
  @Input() client: Client | null = null;

  @Output() editClient = new EventEmitter<Client>();
  @Output() cancel = new EventEmitter<void>();

  fb = inject(FormBuilder);
  addClientForm: FormGroup | null = null;
  isDisabled = signal<boolean>(false);


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.client && changes.client.firstChange === false) {
      this.initForm(this.client);
    }
  }

  ngOnInit(): void {
    console.log('client', this.client);
    this.initForm(this.client);

  }

  onSubmit() {
    console.log(this.addClientForm?.value);
    if (this.addClientForm?.valid) {
      this.editClient.emit(this.addClientForm?.value);
      this.isDisabled.update(() => true);
    }
  }

  onCancel() {
    this.addClientForm?.reset();
    this.cancel.emit();
  }


  initForm(client: Client | null) {
    this.addClientForm = this.fb.group({
      id: [client?.id || 0, []],
      firstName: [client?.firstName || '', Validators.required],
      lastName: [client?.lastName || '', []],
      email: [client?.email || '', []],
      phone: [client?.phone || '', Validators.required],
      address: [client?.address || '', []],
      postCode: [client?.postCode || '', []],
      type: [client?.type || ''],
      notes: [client?.notes || '']
    });
  }



}

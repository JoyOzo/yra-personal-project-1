import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { NotificationService } from '../../../core/services/notification.service';
import { EventItem } from '../../../shared/models/event.model';
import { EventDatePipe } from '../../../shared/pipes/event-date.pipe';

@Component({
  selector: 'app-event-dialog',
  imports: [FormField, CurrencyPipe, EventDatePipe, MatDialogTitle, MatDialogContent, MatDialogClose],
  templateUrl: './event-dialog.html',
  styleUrl: './event-dialog.css',
})
export class EventDialog {
  // The event is handed in by whoever opens the dialog
  readonly event = inject<EventItem>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject<MatDialogRef<EventDialog>>(MatDialogRef);
  private readonly notify = inject(NotificationService);

  readonly model = signal({ fullName: '', email: '', institution: '', researchArea: '' });

  readonly registerForm = form(this.model, (path) => {
    required(path.fullName, { message: 'Full name is required.' });
    required(path.email, { message: 'Email address is required.' });
    email(path.email, { message: 'Please enter a valid email address.' });
  });

  onSubmit(event: Event) {
    event.preventDefault();

    for (const field of [this.registerForm.fullName, this.registerForm.email]) {
      const error = field().errors()[0];
      if (error) {
        this.notify.error(error.message ?? 'Please check the form.');
        return;
      }
    }

    this.notify.success('Registration captured. Payment checkout would open here in production.');
    this.dialogRef.close(true);
  }
}
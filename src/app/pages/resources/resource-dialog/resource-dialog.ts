import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { NotificationService } from '../../../core/services/notification.service';
import { Resource } from '../../../shared/models/resource.model';

@Component({
  selector: 'app-resource-dialog',
  imports: [CurrencyPipe, MatDialogTitle, MatDialogContent, MatDialogClose],
  templateUrl: './resource-dialog.html',
  styleUrl: './resource-dialog.css',
})
export class ResourceDialog {
  // The resource is handed in by whoever opens the dialog
  readonly resource = inject<Resource>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject<MatDialogRef<ResourceDialog>>(MatDialogRef);
  private readonly notify = inject(NotificationService);

  proceed() {
    this.notify.success(
      this.resource.type === 'premium'
        ? 'Checkout started. After payment, access will be added to My Resources.'
        : 'Resource access granted. Download would begin here.',
    );
    this.dialogRef.close(true);
  }
}
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  success(message: string) {
    this.open(message, 'snack-success');
  }

  error(message: string) {
    this.open(message, 'snack-error');
  }

  info(message: string) {
    this.open(message, 'snack-info');
  }

  private open(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }
}
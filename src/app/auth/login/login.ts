import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { email, form, FormField, required } from '@angular/forms/signals';
import { NotificationService } from '../../core/services/notification.service';
import { AuthActions } from '../../store/auth/auth.actions';
import { authFeature } from '../../store/auth/auth.reducer';

@Component({
  selector: 'app-login',
  imports: [FormField, RouterLink, MatProgressSpinner],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly store = inject(Store);
  private readonly notify = inject(NotificationService);

  readonly loading = this.store.selectSignal(authFeature.selectLoading);

  // The form's data lives in this signal
  readonly model = signal({ email: '', password: '', remember: false });

  // form() wraps the signal and attaches the validation rules
  readonly loginForm = form(this.model, (path) => {
    required(path.email, { message: 'Email address is required.' });
    email(path.email, { message: 'Please enter a valid email address.' });
    required(path.password, { message: 'Password is required.' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loading()) return;

    // Show only the first validation problem, as a snackbar
    for (const field of [this.loginForm.email, this.loginForm.password]) {
      const error = field().errors()[0];
      if (error) {
        this.notify.error(error.message ?? 'Please check the form.');
        return;
      }
    }

    this.store.dispatch(AuthActions.login({ payload: this.model() }));
  }
}
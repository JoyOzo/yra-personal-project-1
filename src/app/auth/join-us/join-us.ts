import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { NotificationService } from '../../core/services/notification.service';
import { AuthActions } from '../../store/auth/auth.actions';
import { authFeature } from '../../store/auth/auth.reducer';

@Component({
  selector: 'app-join-us',
  imports: [FormField, RouterLink, MatProgressSpinner],
  templateUrl: './join-us.html',
  styleUrl: './join-us.css',
})
export class JoinUs {
  private readonly store = inject(Store);
  private readonly notify = inject(NotificationService);

  readonly loading = this.store.selectSignal(authFeature.selectLoading);

  readonly levels = [
    'Undergraduate researcher',
    'Postgraduate researcher',
    'Early-career researcher',
    'Academic / professional',
  ];

  readonly model = signal({
    fullName: '',
    email: '',
    country: '',
    institution: '',
    level: this.levels[0],
    interests: '',
    password: '',
    confirmPassword: '',
  });

  readonly joinForm = form(this.model, (path) => {
    required(path.fullName, { message: 'Full name is required.' });
    required(path.email, { message: 'Email address is required.' });
    email(path.email, { message: 'Please enter a valid email address.' });
    required(path.country, { message: 'Country is required.' });
    required(path.password, { message: 'Password is required.' });
    minLength(path.password, 8, { message: 'Password must be at least 8 characters.' });
    required(path.confirmPassword, { message: 'Please confirm your password.' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loading()) return;

    const f = this.joinForm;
    const fields = [f.fullName, f.email, f.country, f.password, f.confirmPassword];
    for (const field of fields) {
      const error = field().errors()[0];
      if (error) {
        this.notify.error(error.message ?? 'Please check the form.');
        return;
      }
    }

    // Cross-field rule: the two passwords must match
    const { confirmPassword, ...payload } = this.model();
    if (payload.password !== confirmPassword) {
      this.notify.error('Passwords do not match.');
      return;
    }

    this.store.dispatch(AuthActions.register({ payload }));
  }
}
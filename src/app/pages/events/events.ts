import { Component, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Card } from '../../shared/card/card';
import { CardItem } from '../../shared/models/card.model';
import { PageHeader } from '../../shared/page-header/page-header';
import { eventToCard } from '../../shared/utils/event-card.mapper';
import { EventsActions } from '../../store/events/events.actions';
import { eventsFeature } from '../../store/events/events.reducer';
import { EventDialog } from './event-dialog/event-dialog';

@Component({
  selector: 'app-events',
  imports: [PageHeader, Card, MatProgressSpinner],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  private readonly events = this.store.selectSignal(eventsFeature.selectUpcoming);
  readonly loading = this.store.selectSignal(eventsFeature.selectLoading);

  readonly cards = computed(() => this.events().map((event) => eventToCard(event, 'page')));

  constructor() {
    if (this.events().length === 0) {
      this.store.dispatch(EventsActions.load());
    }
  }

  // Receives the (action) output from the reusable Card
  openEvent(card: CardItem) {
    const event = this.events().find((e) => e.id === card.id);
    if (event) {
      this.dialog.open(EventDialog, { data: event, width: '640px', maxWidth: '95vw' });
    }
  }
}
import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Card } from '../../shared/card/card';
import { CardItem } from '../../shared/models/card.model';
import { ContentService } from '../../core/services/content.service';
import { eventToCard } from '../../shared/utils/event-card.mapper';
import { EventsActions } from '../../store/events/events.actions';
import { eventsFeature } from '../../store/events/events.reducer';

@Component({
  selector: 'app-home',
  imports: [Card, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly content = inject(ContentService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  readonly pillars = this.content.getPillars();
  readonly resourceCards = this.content.getResourceCards();

  // Upcoming events now come from the NgRx store, the same data the Events page uses
  private readonly upcomingEvents = this.store.selectSignal(eventsFeature.selectUpcoming);
  readonly events = computed(() => this.upcomingEvents().map((e) => eventToCard(e, 'home')));

  constructor() {
    if (this.upcomingEvents().length === 0) {
      this.store.dispatch(EventsActions.load());
    }
  }

  onCardAction(item: CardItem) {
    this.router.navigateByUrl(item.route);
  }
}
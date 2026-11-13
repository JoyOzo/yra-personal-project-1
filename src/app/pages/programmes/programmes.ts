import { Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { HoverLift } from '../../shared/directives/hover-lift';
import { EventItem } from '../../shared/models/event.model';
import { PageHeader } from '../../shared/page-header/page-header';
import { EventsActions } from '../../store/events/events.actions';
import { eventsFeature } from '../../store/events/events.reducer';
import { EventDialog } from '../events/event-dialog/event-dialog';
import { FilterTabs } from '../../shared/filter-tabs/filter-tabs';

type ProgrammeFilter = 'all' | 'training' | 'seminar' | 'workshop';

@Component({
  selector: 'app-programmes',
    imports: [PageHeader, MatProgressSpinner, HoverLift, FilterTabs],
  templateUrl: './programmes.html',
  styleUrl: './programmes.css',
})
export class Programmes {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  private readonly events = this.store.selectSignal(eventsFeature.selectUpcoming);
  readonly loading = this.store.selectSignal(eventsFeature.selectLoading);

  // Local UI state lives in a signal; the list is derived with computed()
  readonly filter = signal<ProgrammeFilter>('all');
  readonly programmes = computed(() => {
    const current = this.filter();
    return this.events().filter((e) => current === 'all' || e.tag.toLowerCase() === current);
  });

  readonly tabs: { label: string; value: ProgrammeFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Training', value: 'training' },
    { label: 'Seminars', value: 'seminar' },
    { label: 'Workshops', value: 'workshop' },
  ];

  constructor() {
    if (this.events().length === 0) {
      this.store.dispatch(EventsActions.load());
    }
  }

  open(event: EventItem) {
    this.dialog.open(EventDialog, { data: event, width: '640px', maxWidth: '95vw' });
  }
}
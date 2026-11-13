import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { PageHeader } from '../../shared/page-header/page-header';
import { Resource, ResourceFilter } from '../../shared/models/resource.model';
import { ResourcesActions } from '../../store/resources/resources.actions';
import { resourcesFeature } from '../../store/resources/resources.reducer';
import { ResourceDialog } from './resource-dialog/resource-dialog';
import { FilterTabs } from '../../shared/filter-tabs/filter-tabs';

@Component({
  selector: 'app-resources',
   imports: [PageHeader, FormsModule, MatProgressSpinner, CurrencyPipe, UpperCasePipe, FilterTabs],
  templateUrl: './resources.html',
  styleUrl: './resources.css',
})
export class Resources {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  // Everything the page shows comes from the NgRx store
  readonly resources = this.store.selectSignal(resourcesFeature.selectVisibleItems);
  readonly loading = this.store.selectSignal(resourcesFeature.selectLoading);
  readonly filter = this.store.selectSignal(resourcesFeature.selectFilter);
  private readonly allItems = this.store.selectSignal(resourcesFeature.selectItems);
  private readonly savedSearch = this.store.selectSignal(resourcesFeature.selectSearch);

  readonly tabs: { label: string; value: ResourceFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Free', value: 'free' },
    { label: 'Premium', value: 'premium' },
    { label: 'Methodology', value: 'methodology' },
    { label: 'Writing', value: 'writing' },
  ];

  // Used with two-way binding [(ngModel)] in the template
  readonly searchText = signal(this.savedSearch());

  constructor() {
    // Only fetch once; coming back to the page reuses what is already in the store
    if (this.allItems().length === 0) {
      this.store.dispatch(ResourcesActions.load());
    }
  }

  onSearch(search: string) {
    this.store.dispatch(ResourcesActions.setSearch({ search }));
  }

  setFilter(filter: ResourceFilter) {
    this.store.dispatch(ResourcesActions.setFilter({ filter }));
  }

  open(resource: Resource) {
    this.dialog.open(ResourceDialog, { data: resource, width: '560px', maxWidth: '95vw' });
  }
}
import { Component, input, output } from '@angular/core';

export interface FilterTab<T extends string = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-filter-tabs',
  templateUrl: './filter-tabs.html',
  styleUrl: './filter-tabs.css',
})
export class FilterTabs<T extends string = string> {
  // Signal inputs: data coming down from the parent
  readonly tabs = input.required<FilterTab<T>[]>();
  readonly active = input.required<T>();

  // Signal output: event going up to the parent
  readonly selected = output<T>();
}
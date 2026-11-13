import { Pipe, PipeTransform } from '@angular/core';

export type EventDateFormat = 'short' | 'long';

export function formatEventDate(iso: string, format: EventDateFormat = 'short'): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString(
    'en-GB',
    format === 'short'
      ? { day: 'numeric', month: 'short' } // 20 Aug
      : { day: 'numeric', month: 'long', year: 'numeric' }, // 20 August 2026
  );
}

@Pipe({ name: 'eventDate' })
export class EventDatePipe implements PipeTransform {
  transform(value: string, format: EventDateFormat = 'short'): string {
    return formatEventDate(value, format);
  }
}
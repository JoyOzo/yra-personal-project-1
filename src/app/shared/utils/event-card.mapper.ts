import { CardItem } from '../models/card.model';
import { EventItem } from '../models/event.model';
import { formatEventDate } from '../pipes/event-date.pipe';

/** Turns an event from the store into the shape the reusable Card component understands. */
export function eventToCard(event: EventItem, view: 'home' | 'page'): CardItem {
  const label = event.featured ? 'Register now' : 'View details';

  return {
    id: event.id,
    variant: 'event',
    title: event.title,
    description: event.summary,
    imageText: event.imageText,
    imageTone: event.tone,
    badge: event.tag,
    badgeTone: event.tone,
    meta: `${formatEventDate(event.date)} · ${event.mode} · ${event.duration}`,
    actionLabel: view === 'home' ? `${label} →` : label,
    actionStyle: view === 'home' ? 'link' : event.featured ? 'primary' : 'secondary',
    route: '/events',
  };
}
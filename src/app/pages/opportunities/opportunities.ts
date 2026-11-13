import { Component, inject } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';
import { Card } from '../../shared/card/card';
import { CardItem } from '../../shared/models/card.model';
import { PageHeader } from '../../shared/page-header/page-header';

@Component({
  selector: 'app-opportunities',
  imports: [PageHeader, Card],
  templateUrl: './opportunities.html',
  styleUrl: './opportunities.css',
})
export class Opportunities {
  private readonly notify = inject(NotificationService);

  readonly opportunities: CardItem[] = [
    {
      id: 'papers',
      variant: 'resource',
      badge: 'Call for Papers',
      badgeTone: 'orange',
      title: 'Special Issue Opportunities',
      description: 'Browse current calls for papers and themed journal issues.',
      actionLabel: 'View opportunity →',
      route: '/opportunities',
    },
    {
      id: 'fellowship',
      variant: 'resource',
      badge: 'Fellowship',
      badgeTone: 'teal',
      title: 'Research Fellowship Opportunities',
      description: 'Discover fellowships and academic development programmes.',
      actionLabel: 'View opportunity →',
      route: '/opportunities',
    },
    {
      id: 'grant',
      variant: 'resource',
      badge: 'Grant',
      badgeTone: 'green',
      title: 'Research Funding Calls',
      description: 'Explore funding opportunities relevant to researchers.',
      actionLabel: 'View opportunity →',
      route: '/opportunities',
    },
  ];

  onView(item: CardItem) {
    this.notify.info(`Details for "${item.title}" will be published soon.`);
  }
}
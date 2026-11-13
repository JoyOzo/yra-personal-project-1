import { Component, inject } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';
import { HoverLift } from '../../shared/directives/hover-lift';
import { PageHeader } from '../../shared/page-header/page-header';

@Component({
  selector: 'app-media',
  imports: [PageHeader, HoverLift],
  templateUrl: './media.html',
  styleUrl: './media.css',
})
export class Media {
  private readonly notify = inject(NotificationService);

  readonly videos = [
    {
      title: 'How to Write a Systematic Literature Review',
      subtitle: 'YRA Seminar Series · Practical Session',
    },
    {
      title: 'Research Methodology Masterclass',
      subtitle: 'YRA Training Archive',
    },
  ];

  play(title: string) {
    this.notify.info(`"${title}" will play from the official YRA YouTube channel.`);
  }
}
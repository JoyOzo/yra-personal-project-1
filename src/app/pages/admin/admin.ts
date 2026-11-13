import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';

interface Registration {
  participant: string;
  programme: string;
  amount: number;
  status: 'Paid' | 'Registered';
}

@Component({
  selector: 'app-admin',
  imports: [CurrencyPipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  private readonly notify = inject(NotificationService);

  readonly sideLinks = [
    '▦ Overview',
    '◫ Events & Training',
    '▤ Resources',
    '◉ Media',
    '🔔 Announcements',
    '◎ Opportunities',
    '♙ Members',
    '₦ Payments',
    '⚙ Settings',
  ];

  readonly stats = [
    { value: '428', label: 'Members' },
    { value: '12', label: 'Upcoming events' },
    { value: '86', label: 'Resources' },
    { value: '₦284k', label: 'Month revenue' },
  ];

  readonly registrations: Registration[] = [
    { participant: 'Jane Smith', programme: 'Research Bootcamp', amount: 15000, status: 'Paid' },
    { participant: 'David Ade', programme: 'SLR Masterclass', amount: 5000, status: 'Paid' },
    { participant: 'Sarah Cole', programme: 'Research Seminar', amount: 0, status: 'Registered' },
  ];

  readonly focusAreas = [
    {
      title: 'Research & Training',
      text: 'Create programmes, manage facilitators and upload training materials.',
    },
    {
      title: 'Communications & Engagement',
      text: 'Publish announcements, media and public-facing content.',
    },
    {
      title: 'Finance & Operations',
      text: 'Manage transactions, budgets and operational reporting.',
    },
  ];

  createContent() {
    this.notify.info('Create-content workflow opened in the production system.');
  }
}
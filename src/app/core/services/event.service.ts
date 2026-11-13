import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { EventItem } from '../../shared/models/event.model';

const EVENTS: EventItem[] = [
  {
    id: 'bootcamp',
    title: 'YRA Global Research Bootcamp 2026',
    tag: 'Training',
    tone: 'teal',
    imageText: 'RESEARCH\nBOOTCAMP',
    date: '2026-08-20',
    mode: 'Online',
    duration: '4 Weeks',
    fee: 15000,
    summary: 'Intensive research training for emerging researchers and scholars.',
    description:
      'Intensive research training designed to equip researchers with essential knowledge and practical skills from idea development to publication.',
    featured: true,
  },
  {
    id: 'slr',
    title: 'How to Write a Systematic Literature Review',
    tag: 'Seminar',
    tone: 'orange',
    imageText: 'SLR\nMASTERCLASS',
    date: '2026-08-30',
    mode: 'Online',
    duration: '1 Day',
    fee: 5000,
    summary: 'Practical session on systematic literature review and publication.',
    description:
      'Practical session on systematic literature review design, searching, screening, synthesis and publication.',
    featured: false,
  },
  {
    id: 'spss',
    title: 'Data Analysis with SPSS for Researchers',
    tag: 'Workshop',
    tone: 'teal',
    imageText: 'DATA\nANALYSIS',
    date: '2026-09-10',
    mode: 'Online',
    duration: '2 Days',
    fee: 7500,
    summary: 'Hands-on training on data analysis and interpretation.',
    description:
      'Hands-on workshop on selecting, running and interpreting common statistical analyses.',
    featured: false,
  },
];

@Injectable({ providedIn: 'root' })
export class EventService {
  getEvents(): Observable<EventItem[]> {
    return of(EVENTS).pipe(delay(600));
  }
}
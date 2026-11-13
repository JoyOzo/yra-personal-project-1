import { Component } from '@angular/core';
import { PageHeader } from '../../shared/page-header/page-header';
import { HoverLift } from '../../shared/directives/hover-lift';

@Component({
  selector: 'app-about',
  imports: [PageHeader, HoverLift],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  readonly directions = [
    {
      tag: 'Vision',
      title: 'A globally relevant research community',
      text: 'To build a vibrant, supportive, and globally relevant community of young researchers committed to excellence, collaboration, and impact.',
    },
    {
      tag: 'Mission',
      title: 'Mentorship, knowledge-sharing and development',
      text: 'To foster a culture of mentorship, knowledge-sharing, and academic development through timely information, structured training and collaborative opportunities.',
    },
    {
      tag: 'Purpose',
      title: 'No researcher left isolated',
      text: 'To ensure that young researchers are supported academically, professionally and intellectually through a strong research community.',
    },
  ];

  readonly values = [
    { title: 'Academic Integrity', text: 'Honesty, originality and ethical research practices.' },
    { title: 'Collaboration', text: 'Teamwork and cross-disciplinary engagement.' },
    { title: 'Professionalism', text: 'High standards in conduct and communication.' },
    { title: 'Service', text: 'Prioritising the growth and needs of members.' },
    { title: 'Consistency', text: 'Reliable systems, value and leadership.' },
    { title: 'Growth & Innovation', text: 'Continuous learning and improvement.' },
  ];

  readonly team = [
    {
      initials: 'BT',
      name: 'Bamidele E. Tijani',
      role: 'CEO / Founder / Team Lead',
      text: 'Provides strategic direction, leadership and representation for YRA.',
    },
    {
      initials: 'IR',
      name: 'Iskeel Sina Raheem',
      role: 'General Secretary',
      text: 'Oversees administration, documentation, correspondence and governance support.',
    },
    {
      initials: 'RT',
      name: 'Director of Research & Training',
      role: 'Executive',
      text: 'Designs and coordinates seminars, workshops and capacity-building programmes.',
    },
    {
      initials: 'CE',
      name: 'Director of Communications & Engagement',
      role: 'Executive',
      text: 'Manages official communication channels and member engagement.',
    },
    {
      initials: 'FO',
      name: 'Treasurer / Finance & Operations Officer',
      role: 'Executive',
      text: 'Manages financial resources, budgets and operational processes.',
    },
  ];
}
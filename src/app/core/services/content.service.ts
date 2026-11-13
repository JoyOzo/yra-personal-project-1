import { Injectable } from '@angular/core';
import { CardItem } from '../../shared/models/card.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  getPillars(): CardItem[] {
    return [
      { id: 'publish', variant: 'pillar', icon: 'P', iconTone: 'teal', title: 'PUBLISH',
        description: 'Build the skills to communicate and publish meaningful research.',
        actionLabel: 'Explore resources →', route: '/resources' },
      { id: 'research', variant: 'pillar', icon: 'R', iconTone: 'orange', title: 'RESEARCH',
        description: 'Develop sound research knowledge, skills and practice.',
        actionLabel: 'Explore training →', route: '/programmes' },
      { id: 'impact', variant: 'pillar', icon: 'I', iconTone: 'teal', title: 'IMPACT',
        description: 'Connect research with meaningful academic and societal outcomes.',
        actionLabel: 'Explore opportunities →', route: '/opportunities' },
      { id: 'collaborate', variant: 'pillar', icon: 'C', iconTone: 'orange', title: 'COLLABORATE',
        description: 'Build connections, mentorship and cross-disciplinary partnerships.',
        actionLabel: 'Join community →', route: '/community' },
    ];
  }

  getUpcomingEvents(): CardItem[] {
    return [
      { id: 'bootcamp', variant: 'event', imageText: 'RESEARCH\nBOOTCAMP', badge: 'Training',
        title: 'YRA Global Research Bootcamp 2026', meta: '20 Aug · Online · 4 Weeks',
        description: 'Intensive research training for emerging researchers and scholars.',
        actionLabel: 'Register now →', route: '/events' },
      { id: 'slr', variant: 'event', imageText: 'SLR\nMASTERCLASS', imageTone: 'orange',
        badge: 'Seminar', badgeTone: 'orange',
        title: 'How to Write a Systematic Literature Review', meta: '30 Aug · Online · 1 Day',
        description: 'Practical session on systematic literature review and publication.',
        actionLabel: 'View details →', route: '/events' },
      { id: 'spss', variant: 'event', imageText: 'DATA\nANALYSIS', badge: 'Workshop',
        title: 'Data Analysis with SPSS for Researchers', meta: '10 Sep · Online · 2 Days',
        description: 'Hands-on training on data analysis and interpretation.',
        actionLabel: 'View details →', route: '/events' },
    ];
  }

  getResourceCards(): CardItem[] {
    return [
      { id: 'free', variant: 'resource', icon: 'F', iconTone: 'teal', title: 'Free Resources',
        description: 'Explore guides, templates and learning materials.',
        actionLabel: 'Browse free →', actionStyle: 'secondary', route: '/resources' },
      { id: 'premium', variant: 'resource', icon: 'P', iconTone: 'orange', title: 'Premium Resources',
        description: 'Access premium guides, templates and research toolkits.',
        actionLabel: 'Browse premium →', actionStyle: 'primary', route: '/resources' },
    ];
  }
}
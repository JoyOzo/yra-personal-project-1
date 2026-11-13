import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Resource } from '../../shared/models/resource.model';

const RESOURCES: Resource[] = [
  {
    id: 'proposal-template',
    title: 'Research Proposal Template',
    type: 'free',
    category: 'methodology',
    format: 'DOCX · 8 pages',
    description: 'Structured proposal template for planning a research study.',
  },
  {
    id: 'slr-guide',
    title: 'Systematic Literature Review Guide',
    type: 'premium',
    category: 'methodology',
    format: 'PDF · 45 pages',
    description: 'Practical guide covering review questions, searching, screening and synthesis.',
    price: 2500,
  },
  {
    id: 'writing-checklist',
    title: 'Academic Writing Checklist',
    type: 'free',
    category: 'writing',
    format: 'PDF · 6 pages',
    description: 'A concise checklist for strengthening academic manuscripts.',
  },
  {
    id: 'spss-guide',
    title: 'SPSS Analysis Guide',
    type: 'premium',
    category: 'methodology',
    format: 'PDF · 32 pages',
    description: 'Practical guide to common statistical procedures and interpretation.',
    price: 3000,
  },
  {
    id: 'lit-review-template',
    title: 'Literature Review Template',
    type: 'free',
    category: 'writing',
    format: 'DOCX · 6 pages',
    description: 'Planning and synthesis template for literature reviews.',
  },
  {
    id: 'submission-guide',
    title: 'Manuscript Submission Guide',
    type: 'premium',
    category: 'writing',
    format: 'PDF · 29 pages',
    description: 'A practical workflow for preparing and submitting manuscripts.',
    price: 2000,
  },
];

@Injectable({ providedIn: 'root' })
export class ResourceService {
  // Simulates an API call so the loading spinner is visible
  getResources(): Observable<Resource[]> {
    return of(RESOURCES).pipe(delay(800));
  }
}
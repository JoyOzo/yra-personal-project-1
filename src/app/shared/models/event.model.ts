export interface EventItem {
  id: string;
  title: string;
  tag: 'Training' | 'Seminar' | 'Workshop';
  tone: 'teal' | 'orange';
  imageText: string;
  date: string; // ISO date, e.g. 2026-08-20
  mode: string;
  duration: string;
  fee: number;
  summary: string;
  description: string;
  featured: boolean;
}
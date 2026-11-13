export interface CardItem {
  id: string;
  variant: 'pillar' | 'event' | 'resource';
  title: string;
  description: string;
  actionLabel: string;
  route: string;
  actionStyle?: 'link' | 'primary' | 'secondary';
  icon?: string;
  iconTone?: 'teal' | 'orange';
  imageText?: string;
  imageTone?: 'teal' | 'orange';
  badge?: string;
  badgeTone?: 'teal' | 'orange' | 'green';
  meta?: string;
}
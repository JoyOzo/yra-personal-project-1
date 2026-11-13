export interface Resource {
  id: string;
  title: string;
  type: 'free' | 'premium';
  category: 'methodology' | 'writing';
  format: string;
  description: string;
  price?: number;
}

export type ResourceFilter = 'all' | 'free' | 'premium' | 'methodology' | 'writing';
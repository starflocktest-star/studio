export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
}

export interface Review {
  id: string;
  fanName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Influencer {
  id: string;
  name: string;
  category: string;
  price: number;
  bio: string;
  imageUrl: string;
  'data-ai-hint'?: string;
  socials: SocialLinks;
  reviews: Review[];
}

export type OrderStatus = 'Pending' | 'In Progress' | 'Completed' | 'Rejected';

export interface Order {
  id: string;
  influencerId: string;
  fanName: string;
  occasion: string;
  description: string;
  status: OrderStatus;
  requestDate: string;
  videoUrl?: string;
}

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

export type InfluencerStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Influencer {
  id: string;
  name: string;
  category: string;
  services: Service[];
  bio: string;
  imageUrl: string;
  'data-ai-hint'?: string;
  socials: SocialLinks;
  reviews: Review[];
  status: InfluencerStatus;
}

export type OrderStatus = 'Pending' | 'In Progress' | 'Completed' | 'Rejected';

export interface Order {
  id: string;
  influencerId: string;
  serviceId: string;
  price: number;
  fanName: string;
  occasion: string;
  description: string;
  status: OrderStatus;
  requestDate: string;
  videoUrl?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'fan' | 'influencer';
}

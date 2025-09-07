import type { Influencer, Order, Review } from './types';

export const reviews: Review[] = [
  { id: 'rev1', fanName: 'Alex', rating: 5, comment: 'Amazing video, thank you so much!', date: '2023-10-26' },
  { id: 'rev2', fanName: 'Jordan', rating: 4, comment: 'Was great, but a bit short.', date: '2023-10-25' },
  { id: 'rev3', fanName: 'Taylor', rating: 5, comment: 'Exactly what I asked for, my friend loved it!', date: '2023-10-22' },
];

export const influencers: Influencer[] = [
  {
    id: '1',
    name: 'Luna Gaming',
    category: 'Gaming',
    price: 50,
    bio: 'Pro gamer and streamer. Ready to level up your special occasions!',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    'data-ai-hint': "woman gamer",
    socials: {
      instagram: '#',
      twitter: '#',
      youtube: '#',
    },
    reviews: [reviews[0], reviews[1]],
    status: 'Approved',
  },
  {
    id: '2',
    name: 'Chef Anton',
    category: 'Cooking',
    price: 75,
    bio: 'Michelin star chef sharing culinary secrets. Let me cook up a special message for you.',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    "data-ai-hint": "male chef",
    socials: {
      instagram: '#',
      tiktok: '#',
    },
    reviews: [reviews[2]],
    status: 'Approved',
  },
  {
    id: '3',
    name: 'Fit Fusion',
    category: 'Fitness',
    price: 40,
    bio: 'Your personal fitness guru. Get a motivational boost or a workout shoutout!',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    "data-ai-hint": "fitness influencer",
    socials: {
      instagram: '#',
      youtube: '#',
    },
    reviews: [],
    status: 'Approved',
  },
  {
    id: '4',
    name: 'The Wanderer',
    category: 'Travel',
    price: 60,
    bio: 'Exploring the world one city at a time. Send a custom postcard video from my next destination!',
    imageUrl: 'https://picsum.photos/400/400?random=4',
    "data-ai-hint": "travel influencer",
    socials: {
      instagram: '#',
      twitter: '#',
    },
    reviews: [reviews[0]],
    status: 'Approved',
  },
    {
    id: '5',
    name: 'Comedy King',
    category: 'Comedy',
    price: 55,
    bio: 'I make people laugh for a living. Need a roast or a funny birthday wish? I am your guy.',
    imageUrl: 'https://picsum.photos/400/400?random=5',
    "data-ai-hint": "comedian portrait",
    socials: {
      tiktok: '#',
      youtube: '#',
    },
    reviews: [reviews[1], reviews[2]],
    status: 'Pending',
  },
  {
    id: '6',
    name: 'Style by Sofia',
    category: 'Fashion',
    price: 80,
    bio: 'Your go-to for fashion advice. Let me style a special message for you!',
    imageUrl: 'https://picsum.photos/400/400?random=6',
    "data-ai-hint": "fashion blogger",
    socials: {
      instagram: '#',
    },
    reviews: [],
    status: 'Approved',
  },
  {
    id: '7',
    name: 'DIY Dan',
    category: 'DIY',
    price: 35,
    bio: 'Crafting, building, and creating. I can make a personalized tutorial or a creative greeting!',
    imageUrl: 'https://picsum.photos/400/400?random=7',
    "data-ai-hint": "man crafting",
    socials: {
      youtube: '#',
    },
    reviews: [reviews[0]],
    status: 'Approved',
  },
  {
    id: '8',
    name: 'Musica Mia',
    category: 'Music',
    price: 90,
    bio: 'Singer-songwriter. Request a custom jingle or a song dedication for someone special.',
    imageUrl: 'https://picsum.photos/400/400?random=8',
    "data-ai-hint": "female singer",
    socials: {
      instagram: '#',
      tiktok: '#',
    },
    reviews: [reviews[2], reviews[0]],
    status: 'Rejected',
  },
];

export const orders: Order[] = [
  { id: 'ord1', influencerId: '1', fanName: 'Mark', occasion: 'Birthday', description: 'Wish my brother a happy 25th birthday!', status: 'Pending', requestDate: '2023-10-28' },
  { id: 'ord2', influencerId: '2', fanName: 'Sarah', occasion: 'Anniversary', description: 'Congratulate my parents on their 30th anniversary.', status: 'In Progress', requestDate: '2023-10-27' },
  { id: 'ord3', influencerId: '1', fanName: 'Chris', occasion: 'Pep Talk', description: 'Need some motivation for my upcoming marathon.', status: 'Completed', requestDate: '2023-10-20', videoUrl: '#' },
  { id: 'ord4', influencerId: '4', fanName: 'Emily', occasion: 'Promo', description: 'Shoutout for my new coffee shop opening.', status: 'Rejected', requestDate: '2023-10-15' },
  { id: 'ord5', influencerId: '5', fanName: 'James', occasion: 'Roast', description: 'Funny roast for my best friend\'s wedding.', status: 'Pending', requestDate: '2023-10-29' },
  { id: 'ord6', influencerId: '8', fanName: 'Chloe', occasion: 'Birthday', description: 'Sing a short happy birthday song for my daughter.', status: 'In Progress', requestDate: '2023-10-28' },
];

export const categories = [...new Set(influencers.filter(i => i.status === 'Approved').map(i => i.category))];

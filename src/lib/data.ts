import type { Influencer, Order, Review, Service } from './types';

export const reviews: Review[] = [
  { id: 'rev1', fanName: 'Alex', rating: 5, comment: 'Amazing video, thank you so much!', date: '2023-10-26' },
  { id: 'rev2', fanName: 'Jordan', rating: 4, comment: 'Was great, but a bit short.', date: '2023-10-25' },
  { id: 'rev3', fanName: 'Taylor', rating: 5, comment: 'Exactly what I asked for, my friend loved it!', date: '2023-10-22' },
];

export const defaultServices: Service[] = [
    { id: 'service1', name: 'Personalized Video', description: 'A custom video shoutout for any occasion.', price: 50 },
    { id: 'service2', name: 'Business Promo', description: 'Promote your brand or product in a short video.', price: 150 },
];

export const influencers: Influencer[] = [
  {
    id: '1',
    name: 'Luna Gaming',
    category: 'Gaming',
    services: [
        { id: 's1-1', name: 'Gaming Shoutout', description: 'A personalized video during my stream.', price: 50 },
        { id: 's1-2', name: 'Gameplay Clip Review', description: 'I will review your submitted gameplay clip.', price: 75 },
    ],
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
    services: [
        { id: 's2-1', name: 'Recipe Dedication', description: 'A special video message with your favorite recipe.', price: 75 },
    ],
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
    services: [
        { id: 's3-1', name: 'Motivational Message', description: 'A personalized video to pump you up!', price: 40 },
        { id: 's3-2', name: 'Workout Challenge', description: 'I will create and dedicate a workout challenge to you.', price: 60 },
    ],
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
    services: [
        { id: 's4-1', name: 'Virtual Postcard', description: 'A video message from my current travel location.', price: 60 },
    ],
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
    services: [
        { id: 's5-1', name: 'Funny Roast', description: 'A hilarious roast for a friend (all in good fun!).', price: 55 },
    ],
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
    services: [
        { id: 's6-1', name: 'Style Tip Video', description: 'A personalized video with fashion advice just for you.', price: 80 },
    ],
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
    services: [
        { id: 's7-1', name: 'Custom Craft Idea', description: 'A video outlining a fun DIY project for you.', price: 35 },
    ],
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
    services: [
        { id: 's8-1', name: 'Song Dedication', description: 'A short, acoustic performance dedicated to someone.', price: 90 },
    ],
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
  { id: 'ord1', influencerId: '1', serviceId: 's1-1', price: 50, fanName: 'Mark', occasion: 'Birthday', description: 'Wish my brother a happy 25th birthday!', status: 'Pending', requestDate: '2023-10-28' },
  { id: 'ord2', influencerId: '2', serviceId: 's2-1', price: 75, fanName: 'Sarah', occasion: 'Anniversary', description: 'Congratulate my parents on their 30th anniversary.', status: 'In Progress', requestDate: '2023-10-27' },
  { id: 'ord3', influencerId: '1', serviceId: 's1-1', price: 50, fanName: 'Chris', occasion: 'Pep Talk', description: 'Need some motivation for my upcoming marathon.', status: 'Completed', requestDate: '2023-10-20', videoUrl: '#' },
  { id: 'ord4', influencerId: '4', serviceId: 's4-1', price: 60, fanName: 'Emily', occasion: 'Promo', description: 'Shoutout for my new coffee shop opening.', status: 'Rejected', requestDate: '2023-10-15' },
  { id: 'ord5', influencerId: '5', serviceId: 's5-1', price: 55, fanName: 'James', occasion: 'Roast', description: 'Funny roast for my best friend\'s wedding.', status: 'Pending', requestDate: '2023-10-29' },
  { id: 'ord6', influencerId: '8', serviceId: 's8-1', price: 90, fanName: 'Chloe', occasion: 'Birthday', description: 'Sing a short happy birthday song for my daughter.', status: 'In Progress', requestDate: '2023-10-28' },
];

export const categories = [...new Set(influencers.filter(i => i.status === 'Approved').map(i => i.category))];

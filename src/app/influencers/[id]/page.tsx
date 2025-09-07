import { influencers } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instagram, Twitter, Youtube } from 'lucide-react';
import StarIcon from '@/components/icons/StarIcon';
import { Separator } from '@/components/ui/separator';
import RequestVideoDialog from '@/components/orders/RequestVideoDialog';
import type { Review } from '@/lib/types';
import { cn } from '@/lib/utils';

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.88-.36-7.02-1.88-1.82-1.26-3.11-3.11-3.63-5.23-.48-1.92-.38-3.96.23-5.85.65-2.01 1.92-3.8 3.63-5.16 2.22-1.72 5.01-2.43 7.6-2.19.01 2.38-.01 4.75.02 7.13-.02 1.55-.47 3.1-1.3 4.35-.91 1.35-2.47 2.14-4.04 2.03-1.46-.1-2.83-.75-3.81-1.78-.3-.29-.55-.63-.78-1-.05-.08-.1-.17-.16-.25-.33-.49-.55-1.06-.72-1.65-.18-.6-.23-1.24-.23-1.87 0-2.59.01-5.18 0-7.77.01-1.06.32-2.1.89-3.01.6-1.02 1.54-1.74 2.65-2.14.99-.37 2.05-.53 3.08-.51z" />
  </svg>
);


export default function InfluencerProfilePage({ params }: { params: { id: string } }) {
  const influencer = influencers.find((i) => i.id === params.id);

  if (!influencer) {
    notFound();
  }

  const averageRating = influencer.reviews.length > 0
    ? influencer.reviews.reduce((acc, review) => acc + review.rating, 0) / influencer.reviews.length
    : 0;
  
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarIcon key={i} fill="full" className="w-5 h-5" />);
      } else {
        stars.push(<StarIcon key={i} fill="none" className="w-5 h-5 text-gray-600" />);
      }
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="p-0">
              <div className="relative w-full aspect-square">
                <Image
                  src={influencer.imageUrl}
                  alt={influencer.name}
                  fill
                  className="object-cover rounded-t-lg"
                  data-ai-hint={influencer['data-ai-hint']}
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <h1 className="text-3xl font-headline font-bold">{influencer.name}</h1>
              <Badge className="mt-2">{influencer.category}</Badge>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex">{renderStars(averageRating)}</div>
                <span className="text-sm text-muted-foreground">({influencer.reviews.length} reviews)</span>
              </div>
              <div className="flex gap-4 mt-6">
                {influencer.socials.instagram && <a href={influencer.socials.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="w-6 h-6 text-muted-foreground hover:text-primary"/></a>}
                {influencer.socials.twitter && <a href={influencer.socials.twitter} target="_blank" rel="noopener noreferrer"><Twitter className="w-6 h-6 text-muted-foreground hover:text-primary"/></a>}
                {influencer.socials.youtube && <a href={influencer.socials.youtube} target="_blank" rel="noopener noreferrer"><Youtube className="w-6 h-6 text-muted-foreground hover:text-primary"/></a>}
                {influencer.socials.tiktok && <a href={influencer.socials.tiktok} target="_blank" rel="noopener noreferrer"><TiktokIcon className="w-6 h-6 text-muted-foreground hover:text-primary"/></a>}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center">
              <div>
                <CardTitle>Personalized Video</CardTitle>
                <p className="text-muted-foreground mt-1">Get a custom video for any occasion!</p>
              </div>
              <div className="mt-4 md:mt-0">
                <RequestVideoDialog price={influencer.price} influencerName={influencer.name} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-headline font-semibold mb-4">About {influencer.name}</h2>
              <p className="text-muted-foreground leading-relaxed">{influencer.bio}</p>
            </CardContent>
          </Card>

           <Card className="mt-6">
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {influencer.reviews.length > 0 ? (
                <div className="space-y-6">
                  {influencer.reviews.map((review: Review, index) => (
                    <div key={review.id}>
                      <div className="flex items-center mb-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <p className="ml-4 font-semibold">{review.fanName}</p>
                        <p className="ml-auto text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                      {index < influencer.reviews.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No reviews yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

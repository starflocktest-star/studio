import { influencers } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instagram, Twitter, Youtube, Tiktok } from 'lucide-react';
import StarIcon from '@/components/icons/StarIcon';
import { Separator } from '@/components/ui/separator';
import RequestVideoDialog from '@/components/orders/RequestVideoDialog';
import type { Review } from '@/lib/types';

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
        stars.push(<StarIcon key={i} fill="none" className="w-5 h-5 text-gray-300" />);
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
                {influencer.socials.instagram && <a href={influencer.socials.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="w-6 h-6 text-gray-600 hover:text-primary"/></a>}
                {influencer.socials.twitter && <a href={influencer.socials.twitter} target="_blank" rel="noopener noreferrer"><Twitter className="w-6 h-6 text-gray-600 hover:text-primary"/></a>}
                {influencer.socials.youtube && <a href={influencer.socials.youtube} target="_blank" rel="noopener noreferrer"><Youtube className="w-6 h-6 text-gray-600 hover:text-primary"/></a>}
                {influencer.socials.tiktok && <a href={influencer.socials.tiktok} target="_blank" rel="noopener noreferrer"><Tiktok className="w-6 h-6 text-gray-600 hover:text-primary"/></a>}
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
              <p className="text-gray-700 leading-relaxed">{influencer.bio}</p>
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
                      <p className="text-gray-600">{review.comment}</p>
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

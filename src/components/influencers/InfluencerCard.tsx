import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Influencer } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface InfluencerCardProps {
  influencer: Influencer;
}

export default function InfluencerCard({ influencer }: InfluencerCardProps) {
  const startingPrice = influencer.services.length > 0
    ? Math.min(...influencer.services.map(s => s.price))
    : null;

  return (
    <Card className="flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300 bg-card border-border">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={influencer.imageUrl}
            alt={influencer.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint={influencer['data-ai-hint']}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{influencer.category}</Badge>
        <CardTitle className="text-lg font-headline font-semibold text-foreground">{influencer.name}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{influencer.bio}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-secondary/50">
        {startingPrice !== null ? (
          <p className="text-lg font-bold text-primary">Starts at ${startingPrice}</p>
        ) : (
          <p className="text-sm text-muted-foreground">No services offered</p>
        )}
        <Button asChild size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
          <Link href={`/influencers/${influencer.id}`}>
            View Services <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

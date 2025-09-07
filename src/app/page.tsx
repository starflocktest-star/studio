
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import InfluencerCard from '@/components/influencers/InfluencerCard';
import { influencers } from '@/lib/data';
import type { Influencer } from '@/lib/types';

export default function Home() {
  const featuredInfluencers = influencers.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-gray-800 mb-4 tracking-tight">
          Connect with Your Favorite Stars
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Get personalized video messages from influencers, artists, and creators for any occasion.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold">
            <Link href="/influencers">Browse Influencers</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">
            <Link href="/register">For Influencers</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-headline font-bold text-center text-gray-800 mb-10">
          Featured Influencers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredInfluencers.map((influencer: Influencer) => (
            <InfluencerCard key={influencer.id} influencer={influencer} />
          ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild className="font-bold">
                <Link href="/influencers">View All Influencers</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}

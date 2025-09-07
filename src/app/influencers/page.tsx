import { influencers, categories } from '@/lib/data';
import InfluencerClientPage from '@/components/influencers/InfluencerClientPage';

export default function InfluencersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          Find Your Star
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Browse our catalog of talented influencers ready to connect with you.
        </p>
      </header>
      <InfluencerClientPage influencers={influencers} categories={categories} />
    </div>
  );
}

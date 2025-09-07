'use client';

import { useState } from 'react';
import type { Influencer } from '@/lib/types';
import InfluencerCard from './InfluencerCard';
import { Button } from '@/components/ui/button';

interface InfluencerClientPageProps {
  influencers: Influencer[];
  categories: string[];
}

export default function InfluencerClientPage({ influencers, categories }: InfluencerClientPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredInfluencers = selectedCategory
    ? influencers.filter((i) => i.category === selectedCategory)
    : influencers;

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredInfluencers.map((influencer) => (
          <InfluencerCard key={influencer.id} influencer={influencer} />
        ))}
      </div>
    </div>
  );
}

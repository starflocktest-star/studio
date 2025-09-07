import { orders, influencers } from '@/lib/data';
import CreatorDashboardClientPage from '@/components/dashboard/CreatorDashboardClientPage';

export default function CreatorDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
          Creator Dashboard
        </h1>
        <p className="text-md text-muted-foreground mt-1">
          Manage your video requests and connect with your fans.
        </p>
      </header>
      <CreatorDashboardClientPage orders={orders} influencers={influencers} />
    </div>
  );
}

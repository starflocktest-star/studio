import { orders, influencers } from '@/lib/data';
import DashboardClientPage from '@/components/dashboard/DashboardClientPage';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
          My Dashboard
        </h1>
        <p className="text-md text-muted-foreground mt-1">
          Manage your video requests and connect with your fans.
        </p>
      </header>
      <DashboardClientPage orders={orders} influencers={influencers} />
    </div>
  );
}

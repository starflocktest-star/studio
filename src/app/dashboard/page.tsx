import UserDashboardClientPage from '@/components/dashboard/UserDashboardClientPage';
import { orders, influencers } from '@/lib/data';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// In a real application, you would fetch orders for the currently logged-in user.
const userOrders: Order[] = orders.filter(o => ['Mark', 'Sarah', 'Chris', 'Emily', 'James', 'Chloe'].includes(o.fanName));

export default function UserDashboardPage() {
  const influencerDetails = (influencerId: string) => {
    return influencers.find(i => i.id === influencerId);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
          My Requests
        </h1>
        <p className="text-md text-muted-foreground mt-1">
          Track the status of your personalized video requests.
        </p>
      </header>
      <UserDashboardClientPage orders={userOrders} influencers={influencers} />
    </div>
  );
}

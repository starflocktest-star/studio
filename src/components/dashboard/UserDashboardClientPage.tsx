'use client';

import type { Influencer, Order, OrderStatus } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Download, Film } from 'lucide-react';
import Link from 'next/link';

interface UserDashboardClientPageProps {
  orders: Order[];
  influencers: Influencer[];
}

export default function UserDashboardClientPage({ orders, influencers }: UserDashboardClientPageProps) {

  const OrderCard = ({ order }: { order: Order }) => {
    const influencer = influencers.find(i => i.id === order.influencerId);
    if (!influencer) return null;

    const getStatusInfo = (status: OrderStatus) => {
        switch (status) {
            case 'Pending':
                return { className: 'bg-blue-500/10 text-blue-400 border-blue-500/20', description: 'Your request is awaiting confirmation.' };
            case 'In Progress':
                return { className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', description: 'The creator is working on your video.' };
            case 'Completed':
                return { className: 'bg-green-500/10 text-green-400 border-green-500/20', description: 'Your video is ready!' };
            case 'Rejected':
                return { className: 'bg-red-500/10 text-red-400 border-red-500/20', description: 'This request was rejected.' };
        }
    }
    const statusInfo = getStatusInfo(order.status);
    
    return (
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-lg">Video for {order.occasion}</CardTitle>
              <CardDescription>From {influencer.name} on {order.requestDate}</CardDescription>
            </div>
            <Link href={`/influencers/${influencer.id}`}>
                 <Image src={influencer.imageUrl} alt={influencer.name} width={64} height={64} className="rounded-full" data-ai-hint={influencer['data-ai-hint']}/>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{statusInfo.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <Badge variant="outline" className={cn('font-semibold', statusInfo.className)}>
                {order.status}
            </Badge>
            {order.status === 'Completed' && order.videoUrl && (
                <Button asChild size="sm">
                    <a href={order.videoUrl} download>
                        <Download /> Download Video
                    </a>
                </Button>
            )}
             {order.status === 'Completed' && !order.videoUrl && (
                <Button size="sm" disabled>
                    <Film /> Processing...
                </Button>
            )}
        </CardFooter>
      </Card>
    );
  };

  return orders.length > 0 ? (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map(order => <OrderCard key={order.id} order={order} />)}
      </div>
    ) : (
      <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">No Requests Yet</h2>
          <p className="text-muted-foreground mb-6">You haven&apos;t requested any videos. Browse influencers to get started!</p>
          <Button asChild>
              <Link href="/influencers">Browse Influencers</Link>
          </Button>
      </div>
    );
}

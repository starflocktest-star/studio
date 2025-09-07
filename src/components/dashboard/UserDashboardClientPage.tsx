
'use client';

import * as React from 'react';
import type { Influencer, Order, OrderStatus } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Download, Film, CheckCircle, Clock, Hourglass, XCircle } from 'lucide-react';
import Link from 'next/link';

interface UserDashboardClientPageProps {
  orders: Order[];
  influencers: Influencer[];
}

const statusSteps: OrderStatus[] = ['Pending', 'In Progress', 'Completed'];

const StatusTracker = ({ currentStatus }: { currentStatus: OrderStatus }) => {
  if (currentStatus === 'Rejected') {
    return (
      <div className="flex items-center gap-2 mt-4 text-destructive">
        <XCircle className="w-5 h-5" />
        <p className="font-semibold">Request Rejected</p>
      </div>
    );
  }

  const currentIndex = statusSteps.indexOf(currentStatus);

  return (
    <div className="flex items-center w-full mt-4">
      {statusSteps.map((status, index) => {
        const isActive = index <= currentIndex;
        return (
          <React.Fragment key={status}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300',
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}
              >
                {status === 'Pending' && <Hourglass className="w-4 h-4" />}
                {status === 'In Progress' && <Clock className="w-4 h-4" />}
                {status === 'Completed' && <CheckCircle className="w-4 h-4" />}
              </div>
              <p className={cn('text-xs mt-2', isActive ? 'font-semibold text-foreground' : 'text-muted-foreground')}>
                {status}
              </p>
            </div>
            {index < statusSteps.length - 1 && (
              <div className={cn(
                'flex-1 h-1 transition-colors duration-300',
                 (isActive && index < currentIndex) ? 'bg-primary' : 'bg-muted'
                )} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};


export default function UserDashboardClientPage({ orders, influencers }: UserDashboardClientPageProps) {

  const OrderCard = ({ order }: { order: Order }) => {
    const influencer = influencers.find(i => i.id === order.influencerId);
    if (!influencer) return null;
    
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
           <div className="space-y-1 text-sm text-muted-foreground">
            <p><span className="font-semibold text-foreground">Service:</span> {influencers.flatMap(i => i.services).find(s => s.id === order.serviceId)?.name}</p>
            <p><span className="font-semibold text-foreground">Instructions:</span> {order.description}</p>
            <p><span className="font-semibold text-foreground">Order ID:</span> #{order.id.slice(3)}</p>
          </div>
          <StatusTracker currentStatus={order.status} />
        </CardContent>
        <CardFooter className="flex justify-end items-center">
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
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
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

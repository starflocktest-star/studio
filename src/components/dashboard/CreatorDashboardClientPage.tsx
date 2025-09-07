'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Order, Influencer, OrderStatus } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Upload, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProfileSettingsForm from './ProfileSettingsForm';

interface CreatorDashboardClientPageProps {
  orders: Order[];
  influencers: Influencer[];
}

export default function CreatorDashboardClientPage({ orders: initialOrders, influencers }: CreatorDashboardClientPageProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  // In a real app, you would get the single logged-in influencer.
  // For now, we'll just pick the first one from the list to simulate this.
  const [influencer, setInfluencer] = useState<Influencer>(influencers[0]); 
  const { toast } = useToast();

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast({
        title: "Order Updated",
        description: `Order #${orderId.slice(3)} has been marked as ${newStatus}.`
    });
  };
  
  const handleUpload = (orderId: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'Completed', videoUrl: '#' } : o));
    toast({
        title: "Video Uploaded",
        description: `Video for order #${orderId.slice(3)} has been uploaded.`
    });
  }
  
  const handleProfileUpdate = (updatedProfile: Influencer) => {
    setInfluencer(updatedProfile);
  }

  const OrderCard = ({ order }: { order: Order }) => {
    const influencerForOrder = influencers.find(i => i.id === order.influencerId);
    if (!influencerForOrder) return null;
    
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-lg">For {influencerForOrder.name}</CardTitle>
              <CardDescription>Request from {order.fanName} on {order.requestDate}</CardDescription>
            </div>
            <Image src={influencerForOrder.imageUrl} alt={influencerForOrder.name} width={64} height={64} className="rounded-full" data-ai-hint={influencerForOrder['data-ai-hint']}/>
          </div>
        </CardHeader>
        <CardContent>
          <p className="font-semibold">{order.occasion}</p>
          <p className="text-sm text-muted-foreground mt-1">{order.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <Badge variant={order.status === 'Completed' ? 'default' : order.status === 'Pending' ? 'secondary' : 'destructive'} 
                className={cn({
                    'bg-green-500/10 text-green-400 border-green-500/20': order.status === 'Completed',
                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20': order.status === 'In Progress',
                    'bg-blue-500/10 text-blue-400 border-blue-500/20': order.status === 'Pending',
                    'bg-red-500/10 text-red-400 border-red-500/20': order.status === 'Rejected',
                })}
            >
                {order.status}
            </Badge>
          <div className="flex gap-2">
            {order.status === 'Pending' && (
              <>
                <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(order.id, 'In Progress')}><CheckCircle />Accept</Button>
                <Button size="sm" variant="destructive" onClick={() => handleUpdateStatus(order.id, 'Rejected')}><XCircle/>Reject</Button>
              </>
            )}
            {order.status === 'In Progress' && (
              <Button size="sm" onClick={() => handleUpload(order.id)}><Upload/>Upload Video</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    );
  };

  const renderOrders = (status: OrderStatus) => {
    // We'll filter orders for the simulated logged-in influencer
    const filteredOrders = orders.filter(o => o.status === status && o.influencerId === influencer.id);
    return filteredOrders.length > 0 ? (
      <div className="grid gap-6 md:grid-cols-2">
        {filteredOrders.map(order => <OrderCard key={order.id} order={order} />)}
      </div>
    ) : (
      <p className="text-muted-foreground text-center py-8">No {status.toLowerCase()} requests.</p>
    );
  };

  return (
    <Tabs defaultValue="pending" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
      </TabsList>
      <TabsContent value="pending">{renderOrders('Pending')}</TabsContent>
      <TabsContent value="in-progress">{renderOrders('In Progress')}</TabsContent>
      <TabsContent value="completed">{renderOrders('Completed')}</TabsContent>
      <TabsContent value="rejected">{renderOrders('Rejected')}</TabsContent>
      <TabsContent value="profile">
        <ProfileSettingsForm influencer={influencer} onProfileUpdate={handleProfileUpdate} />
      </TabsContent>
    </Tabs>
  );
}

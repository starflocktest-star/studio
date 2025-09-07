'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Order, Influencer, OrderStatus } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Clock, Upload, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardClientPageProps {
  orders: Order[];
  influencers: Influencer[];
}

export default function DashboardClientPage({ orders: initialOrders, influencers }: DashboardClientPageProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const { toast } = useToast();

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    toast({
        title: "Order Updated",
        description: `Order #${orderId.slice(3)} has been marked as ${newStatus}.`
    });
  };
  
  const handleUpload = (orderId: string) => {
    handleUpdateStatus(orderId, 'Completed');
    toast({
        title: "Video Uploaded",
        description: `Video for order #${orderId.slice(3)} has been uploaded.`
    });
  }

  const OrderCard = ({ order }: { order: Order }) => {
    const influencer = influencers.find(i => i.id === order.influencerId);
    if (!influencer) return null;
    
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-lg">For {influencer.name}</CardTitle>
              <CardDescription>Request from {order.fanName} on {order.requestDate}</CardDescription>
            </div>
            <Image src={influencer.imageUrl} alt={influencer.name} width={64} height={64} className="rounded-full" data-ai-hint={influencer['data-ai-hint']}/>
          </div>
        </CardHeader>
        <CardContent>
          <p className="font-semibold">{order.occasion}</p>
          <p className="text-sm text-muted-foreground mt-1">{order.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <Badge variant={order.status === 'Completed' ? 'default' : order.status === 'Pending' ? 'secondary' : 'destructive'} 
                className={cn({
                    'bg-green-100 text-green-800': order.status === 'Completed',
                    'bg-yellow-100 text-yellow-800': order.status === 'In Progress',
                    'bg-blue-100 text-blue-800': order.status === 'Pending',
                    'bg-red-100 text-red-800': order.status === 'Rejected',
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
    const filteredOrders = orders.filter(o => o.status === status);
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
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
      </TabsList>
      <TabsContent value="pending">{renderOrders('Pending')}</TabsContent>
      <TabsContent value="in-progress">{renderOrders('In Progress')}</TabsContent>
      <TabsContent value="completed">{renderOrders('Completed')}</TabsContent>
      <TabsContent value="rejected">{renderOrders('Rejected')}</TabsContent>
    </Tabs>
  );
}

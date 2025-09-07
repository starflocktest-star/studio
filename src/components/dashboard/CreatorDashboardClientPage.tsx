'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Order, Influencer, OrderStatus, Service } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Upload, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProfileSettingsForm from './ProfileSettingsForm';
import ServicesSettings from './ServicesSettings';

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
  
  const handleProfileUpdate = (updatedProfileData: Partial<Influencer>) => {
    const updatedInfluencer = { ...influencer, ...updatedProfileData };
    setInfluencer(updatedInfluencer);
  }
  
  const handleServicesUpdate = (updatedServices: Service[]) => {
    const updatedInfluencer = { ...influencer, services: updatedServices };
    setInfluencer(updatedInfluencer);
  }

  const OrderCard = ({ order }: { order: Order }) => {
    const service = influencer.services.find(s => s.id === order.serviceId);
    if (!service) return null;
    
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="font-headline text-lg">{service.name}</CardTitle>
              <CardDescription>Request from {order.fanName} on {order.requestDate}</CardDescription>
            </div>
             <div className='text-right'>
                <p className="text-lg font-bold">₹{order.price}</p>
                <Badge variant="secondary">{influencer.name}</Badge>
            </div>
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
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
      </TabsList>
      <TabsContent value="pending">{renderOrders('Pending')}</TabsContent>
      <TabsContent value="in-progress">{renderOrders('In Progress')}</TabsContent>
      <TabsContent value="completed">{renderOrders('Completed')}</TabsContent>
      <TabsContent value="rejected">{renderOrders('Rejected')}</TabsContent>
       <TabsContent value="services">
        <ServicesSettings services={influencer.services} onServicesUpdate={handleServicesUpdate} />
      </TabsContent>
      <TabsContent value="profile">
        <ProfileSettingsForm influencer={influencer} onProfileUpdate={handleProfileUpdate} />
      </TabsContent>
    </Tabs>
  );
}

'use client';

import type { Influencer, Order, User } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InfluencersTable from './InfluencersTable';
import UsersTable from './UsersTable';
import OrdersTable from './OrdersTable';

interface AdminDashboardClientPageProps {
  influencers: Influencer[];
  users: User[];
  orders: Order[];
}

export default function AdminDashboardClientPage({ influencers, users, orders }: AdminDashboardClientPageProps) {
  return (
    <Tabs defaultValue="influencers" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="influencers">Influencers</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
      </TabsList>
      <TabsContent value="influencers">
        <InfluencersTable influencers={influencers} />
      </TabsContent>
      <TabsContent value="users">
        <UsersTable users={users} />
      </TabsContent>
      <TabsContent value="orders">
        <OrdersTable orders={orders} influencers={influencers} />
      </TabsContent>
    </Tabs>
  );
}

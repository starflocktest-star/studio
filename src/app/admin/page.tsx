import AdminDashboardClientPage from '@/components/admin/AdminDashboardClientPage';
import { influencers, orders } from '@/lib/data';
import type { User } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Shield } from 'lucide-react';

// In a real app, you'd fetch all users.
const allUsers: User[] = [
    { id: 'user1', name: 'Mark', email: 'mark@example.com', role: 'fan' },
    { id: 'user2', name: 'Sarah', email: 'sarah@example.com', role: 'fan' },
    { id: 'user3', name: 'Chris', email: 'chris@example.com', role: 'fan' },
    { id: 'user4', name: 'Emily', email: 'emily@example.com', role: 'fan' },
    { id: 'user5', name: 'James', email: 'james@example.com', role: 'fan' },
    { id: 'user6', name: 'Chloe', email: 'chloe@example.com', role: 'fan' },
    { id: 'admin1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
    ...influencers.map(i => ({ id: i.id, name: i.name, email: `${i.name.toLowerCase().replace(' ', '.')}@example.com`, role: 'influencer' }))
];

// In a real app, this would be a server-side check for an authenticated admin session.
// For this prototype, we'll simulate it being true. A value of `false` would show the login prompt.
const isAdminLoggedIn = true; 


export default function AdminDashboardPage() {
  if (!isAdminLoggedIn) {
      return (
          <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
              <Card className="max-w-md w-full text-center">
                  <CardHeader>
                      <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                          <Shield className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-3xl font-headline mt-4">Admin Access Required</CardTitle>
                      <CardDescription>You must be logged in as an administrator to view this page.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Button asChild size="lg" className="w-full">
                          <Link href="/admin/login">Proceed to Admin Login</Link>
                      </Button>
                  </CardContent>
              </Card>
          </div>
      )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-md text-muted-foreground mt-1">
          Oversee and manage the StarConnect platform.
        </p>
      </header>
      <AdminDashboardClientPage influencers={influencers} users={allUsers} orders={orders} />
    </div>
  );
}

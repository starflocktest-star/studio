import AdminDashboardClientPage from '@/components/admin/AdminDashboardClientPage';
import { influencers, orders } from '@/lib/data';
import type { User } from '@/lib/types';

// In a real app, you'd fetch all users.
const allUsers: User[] = [
    { id: 'user1', name: 'Mark', email: 'mark@example.com', role: 'fan' },
    { id: 'user2', name: 'Sarah', email: 'sarah@example.com', role: 'fan' },
    { id: 'user3', name: 'Chris', email: 'chris@example.com', role: 'fan' },
    { id: 'user4', name: 'Emily', email: 'emily@example.com', role: 'fan' },
    { id: 'user5', name: 'James', email: 'james@example.com', role: 'fan' },
    { id: 'user6', name: 'Chloe', email: 'chloe@example.com', role: 'fan' },
    ...influencers.map(i => ({ id: i.id, name: i.name, email: `${i.name.toLowerCase().replace(' ', '.')}@example.com`, role: 'influencer' }))
];


export default function AdminDashboardPage() {
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

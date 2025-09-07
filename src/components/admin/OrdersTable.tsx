import type { Order, Influencer } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrdersTableProps {
  orders: Order[];
  influencers: Influencer[];
}

export default function OrdersTable({ orders, influencers }: OrdersTableProps) {
  const getInfluencerName = (id: string) => influencers.find(i => i.id === id)?.name || 'Unknown';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Fan Name</TableHead>
              <TableHead>Influencer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs">#{order.id.slice(3)}</TableCell>
                <TableCell className="font-medium">{order.fanName}</TableCell>
                <TableCell>{getInfluencerName(order.influencerId)}</TableCell>
                <TableCell>{order.requestDate}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn({
                      'bg-green-500/10 text-green-400 border-green-500/20': order.status === 'Completed',
                      'bg-yellow-500/10 text-yellow-400 border-yellow-500/20': order.status === 'In Progress',
                      'bg-blue-500/10 text-blue-400 border-blue-500/20': order.status === 'Pending',
                      'bg-red-500/10 text-red-400 border-red-500/20': order.status === 'Rejected',
                    })}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

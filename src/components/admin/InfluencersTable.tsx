'use client';

import type { Influencer, InfluencerStatus } from '@/lib/types';
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
import { Check, MoreHorizontal, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface InfluencersTableProps {
  influencers: Influencer[];
}

export default function InfluencersTable({ influencers: initialInfluencers }: InfluencersTableProps) {
  const [influencers, setInfluencers] = useState<Influencer[]>(initialInfluencers);
  const { toast } = useToast();

  const handleStatusChange = (influencerId: string, newStatus: InfluencerStatus) => {
    setInfluencers(
      influencers.map((influencer) =>
        influencer.id === influencerId ? { ...influencer, status: newStatus } : influencer
      )
    );
    toast({
      title: 'Status Updated',
      description: `Influencer has been ${newStatus.toLowerCase()}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Influencers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Services</TableHead>
              <TableHead className="text-center">Reviews</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {influencers.map((influencer) => (
              <TableRow key={influencer.id}>
                <TableCell className="font-medium">{influencer.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{influencer.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn({
                      'bg-green-500/10 text-green-400 border-green-500/20': influencer.status === 'Approved',
                      'bg-yellow-500/10 text-yellow-400 border-yellow-500/20': influencer.status === 'Pending',
                      'bg-red-500/10 text-red-400 border-red-500/20': influencer.status === 'Rejected',
                    })}
                  >
                    {influencer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{influencer.services.length}</TableCell>
                <TableCell className="text-center">{influencer.reviews.length}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleStatusChange(influencer.id, 'Approved')}>
                        <Check /> Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(influencer.id, 'Rejected')}>
                        <X /> Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

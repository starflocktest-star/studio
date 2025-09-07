'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import type { Service } from '@/lib/types';

const formSchema = z.object({
  fanName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  occasion: z.string().min(3, { message: 'Occasion is required.' }),
  description: z.string().min(10, { message: 'Please provide more details (min 10 characters).' }),
});

interface RequestVideoDialogProps {
  service: Service;
  influencerName: string;
  triggerButton?: React.ReactNode;
}

export default function RequestVideoDialog({ service, influencerName, triggerButton }: RequestVideoDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  // Mock authentication state. In a real app, you'd use a context or state manager.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // In a real app, this would be determined by a proper auth hook/provider
    if (typeof window !== 'undefined') {
      setIsLoggedIn(true); // Simulate logged in for demonstration
    }
  }, []);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fanName: '',
      occasion: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Video request submitted for service', service.name, ':', values);
    toast({
      title: 'Request Submitted!',
      description: `Your request for "${service.name}" from ${influencerName} has been sent.`,
    });
    setOpen(false);
    form.reset();
  }

  if (!isClient) {
    return (
       <Button size="sm" className="bg-accent hover:bg-accent/90 text-white font-bold" disabled>
          Request for ${service.price}
        </Button>
    )
  }

  if (!isLoggedIn) {
    return (
      <Button asChild size="sm" className="font-bold">
        <Link href="/login">
            <LogIn /> Login to Request
        </Link>
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-white font-bold">
            Request for ${service.price}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request: {service.name}</DialogTitle>
          <DialogDescription>
            Fill out the details below for your personalized video from {influencerName}. The price for this service is ${service.price}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fanName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occasion</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Birthday, Anniversary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe what you'd like the video to be about." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white">
                Submit Request for ${service.price}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

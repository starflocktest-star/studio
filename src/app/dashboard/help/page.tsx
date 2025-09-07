
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const helpFormSchema = z.object({
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  category: z.string({
    required_error: 'Please select a category.',
  }),
  description: z.string().min(20, {
    message: 'Description must be at least 20 characters.',
  }),
  orderId: z.string().optional(),
});

type HelpFormValues = z.infer<typeof helpFormSchema>;

export default function HelpPage() {
  const { toast } = useToast();
  const form = useForm<HelpFormValues>({
    resolver: zodResolver(helpFormSchema),
    defaultValues: {
      subject: '',
      description: '',
      orderId: '',
    },
  });

  function onSubmit(data: HelpFormValues) {
    console.log('Support ticket submitted:', data);
    toast({
      title: 'Ticket Submitted!',
      description: 'Our support team will get back to you shortly.',
    });
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Help & Support</CardTitle>
          <CardDescription>Have an issue? Raise a ticket and we&apos;ll get back to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Issue with video download" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="order">Order Issue</SelectItem>
                          <SelectItem value="payment">Payment Issue</SelectItem>
                          <SelectItem value="account">Account Issue</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="orderId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order ID (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., #12345" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe your issue</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide as much detail as possible..."
                        className="resize-none"
                        {...field}
                        rows={6}
                      />
                    </FormControl>
                    <FormDescription>
                      The more details you provide, the faster we can resolve your issue.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg">Submit Ticket</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

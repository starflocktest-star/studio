
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogIn, Paperclip, X } from 'lucide-react';
import type { Service } from '@/lib/types';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  fanName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  occasion: z.string().min(3, { message: 'Occasion is required.' }),
  description: z.string().min(10, { message: 'Please provide more details (min 10 characters).' }),
  attachment: z.any().optional(),
  paymentMethod: z.enum(['razorpay', 'payu'], {
    required_error: 'Please select a payment method.',
  }),
});

interface RequestVideoDialogProps {
  service: Service;
  influencerName: string;
  triggerButton?: React.ReactNode;
}

export default function RequestVideoDialog({ service, influencerName, triggerButton }: RequestVideoDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      setIsLoggedIn(true);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
      setFileType(null);
    }
  };
  
  const clearFile = () => {
      setFilePreview(null);
      setFileType(null);
      form.setValue('attachment', null);
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Video request submitted for service', service.name, ':', values);
    
    const queryParams = new URLSearchParams({
        serviceName: service.name,
        influencerName: influencerName,
        price: service.price.toString(),
        paymentMethod: values.paymentMethod,
    }).toString();

    router.push(`/payment?${queryParams}`);
  }

  if (!isClient) {
    return (
       <Button size="sm" className="bg-accent hover:bg-accent/90 text-white font-bold" disabled>
          Request for ₹{service.price}
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
            Request for ₹{service.price}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request: {service.name}</DialogTitle>
          <DialogDescription>
            Fill out the details below for your personalized video from {influencerName}. The price for this service is ₹{service.price}.
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
             <FormField
              control={form.control}
              name="attachment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attach Image/Video (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                        <Button asChild variant="outline" className="w-full">
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <Paperclip /> {filePreview ? 'Change file' : 'Choose file'}
                            </label>
                        </Button>
                        <Input id="file-upload" type="file" {...field} onChange={handleFileChange} className="sr-only" accept="image/*,video/*" />
                    </div>
                  </FormControl>
                   <FormDescription>
                    Add a reference photo or a short video clip.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {filePreview && (
              <div className="relative mt-4 border rounded-md p-2">
                 <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 z-10 bg-black/50 hover:bg-black/70 text-white" onClick={clearFile}>
                    <X className="h-4 w-4" />
                </Button>
                {fileType?.startsWith('image/') && (
                    <Image src={filePreview} alt="File preview" width={400} height={300} className="rounded-md object-contain max-h-48 w-full" />
                )}
                {fileType?.startsWith('video/') && (
                  <video src={filePreview} controls className="rounded-md max-h-48 w-full" />
                )}
              </div>
            )}

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4 pt-2"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="razorpay" />
                        </FormControl>
                        <FormLabel className="font-normal">Razorpay</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="payu" />
                        </FormControl>
                        <FormLabel className="font-normal">PayU</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <DialogFooter>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white">
                Proceed to Pay ₹{service.price}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

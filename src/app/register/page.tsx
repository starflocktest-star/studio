
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { categories } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const registrationFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  mobile: z.string().min(10, {
    message: 'Please enter a valid mobile number.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  address: z.string().min(10, {
    message: 'Address must be at least 10 characters.',
  }),
  influencerType: z.string({
    required_error: 'Please select an influencer type.',
  }),
  instagramId: z.string().optional(),
  youtubeId: z.string().optional(),
  facebookId: z.string().optional(),
  bio: z.string().min(20, {
    message: 'Bio must be at least 20 characters.',
  }),
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const defaultValues: Partial<RegistrationFormValues> = {
    name: '',
    mobile: '',
    email: '',
    address: '',
    instagramId: '',
    youtubeId: '',
    facebookId: '',
    bio: '',
};

export default function RegistrationPage() {
  const { toast } = useToast();
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues,
  });

  function onSubmit(data: RegistrationFormValues) {
    console.log(data);
    toast({
      title: 'Registration Submitted!',
      description: 'Your registration has been received and is pending review.',
    });
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-12">
       <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Become a Star</CardTitle>
          <CardDescription>Fill out the form below to join our platform.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                            <Input placeholder="Enter your mobile number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="Enter your full address"
                            className="resize-none"
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="influencerType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Influencer Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your primary category" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                
                <div>
                    <h3 className="text-lg font-medium mb-4">Social Profiles</h3>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="instagramId"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Instagram ID</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g., your_instagram" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="youtubeId"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>YouTube Channel ID</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g., @YourChannel" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="facebookId"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Facebook Page Name</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g., yourfacebookpage" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="Tell us a little bit about yourself and your content"
                            className="resize-none"
                            {...field}
                            rows={4}
                        />
                        </FormControl>
                        <FormDescription>
                            This will be displayed on your public profile.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <Button type="submit" size="lg" className="w-full">Register Account</Button>
                </form>
            </Form>
        </CardContent>
       </Card>
    </div>
  );
}

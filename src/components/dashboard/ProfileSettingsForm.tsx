'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import type { Influencer } from '@/lib/types';
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
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const profileFormSchema = z.object({
  price: z.coerce.number().min(1, { message: 'Price must be at least $1.' }),
  bio: z.string().min(20, {
    message: 'Bio must be at least 20 characters.',
  }),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  youtube: z.string().optional(),
  tiktok: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileSettingsFormProps {
  influencer: Influencer;
  onProfileUpdate: (data: Influencer) => void;
}

export default function ProfileSettingsForm({ influencer, onProfileUpdate }: ProfileSettingsFormProps) {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      price: influencer.price,
      bio: influencer.bio,
      instagram: influencer.socials.instagram || '',
      twitter: influencer.socials.twitter || '',
      youtube: influencer.socials.youtube || '',
      tiktok: influencer.socials.tiktok || '',
    },
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);

    // In a real app, you would send this to your backend.
    // Here, we'll just update the parent component's state.
    const updatedInfluencer: Influencer = {
      ...influencer,
      price: data.price,
      bio: data.bio,
      socials: {
        instagram: data.instagram,
        twitter: data.twitter,
        youtube: data.youtube,
        tiktok: data.tiktok,
      },
    };
    onProfileUpdate(updatedInfluencer);

    toast({
      title: 'Profile Updated!',
      description: 'Your changes have been saved successfully.',
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Your Profile</CardTitle>
        <CardDescription>Update your public information and pricing.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter your price" {...field} />
                  </FormControl>
                  <FormDescription>This is the price fans will pay for a personalized video.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell your fans a little bit about yourself"
                      className="resize-none"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormDescription>This will be displayed on your public profile.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Social Profiles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram Handle</FormLabel>
                      <FormControl>
                        <Input placeholder="your_instagram" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter Handle</FormLabel>
                      <FormControl>
                        <Input placeholder="YourTwitter" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube Channel</FormLabel>
                      <FormControl>
                        <Input placeholder="@YourChannel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tiktok"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TikTok Handle</FormLabel>
                      <FormControl>
                        <Input placeholder="@your.tiktok" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" size="lg">
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

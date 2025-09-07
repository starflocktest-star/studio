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
  bio: z.string().min(20, {
    message: 'Bio must be at least 20 characters.',
  }),
  instagram: z.string().url().optional().or(z.literal('')),
  twitter: z.string().url().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
  tiktok: z.string().url().optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileSettingsFormProps {
  influencer: Influencer;
  onProfileUpdate: (data: Partial<Influencer>) => void;
}

export default function ProfileSettingsForm({ influencer, onProfileUpdate }: ProfileSettingsFormProps) {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      bio: influencer.bio,
      instagram: influencer.socials.instagram || '',
      twitter: influencer.socials.twitter || '',
      youtube: influencer.socials.youtube || '',
      tiktok: influencer.socials.tiktok || '',
    },
  });

  function onSubmit(data: ProfileFormValues) {
    // In a real app, you would send this to your backend.
    // Here, we'll just update the parent component's state.
    const updatedProfileData: Partial<Influencer> = {
      bio: data.bio,
      socials: {
        instagram: data.instagram,
        twitter: data.twitter,
        youtube: data.youtube,
        tiktok: data.tiktok,
      },
    };
    onProfileUpdate(updatedProfileData);

    toast({
      title: 'Profile Updated!',
      description: 'Your changes have been saved successfully.',
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Your Profile</CardTitle>
        <CardDescription>Update your public information and social links.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      <FormLabel>Instagram URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://instagram.com/..." {...field} />
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
                      <FormLabel>Twitter/X URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://x.com/..." {...field} />
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
                      <FormLabel>YouTube Channel URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://youtube.com/..." {...field} />
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
                      <FormLabel>TikTok URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://tiktok.com/..." {...field} />
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

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const signupFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

const defaultValues: SignupFormValues = {
  name: '',
  email: '',
  password: '',
};

export default function SignupPage() {
  const { toast } = useToast();
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues,
  });

  function onSubmit(data: SignupFormValues) {
    console.log(data);
    toast({
      title: 'Account Created!',
      description: 'Welcome to StarConnect. Please log in.',
    });
    // Here you would typically redirect the user to the login page
  }

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Create an Account</CardTitle>
          <CardDescription>Join StarConnect to book your favorite stars.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
               <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full">
                Sign Up
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Log In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

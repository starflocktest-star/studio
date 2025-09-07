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

const loginFormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const defaultValues: LoginFormValues = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const { toast } = useToast();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  function onSubmit(data: LoginFormValues) {
    console.log(data);
    toast({
      title: 'Logged In!',
      description: 'Welcome back to StarConnect.',
    });
    // Here you would typically redirect the user
  }

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                Sign In
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Service } from '@/lib/types';
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
import { PlusCircle, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const serviceSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Service name must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  price: z.coerce.number().min(1, 'Price must be at least ₹1.'),
});

const servicesFormSchema = z.object({
  services: z.array(serviceSchema),
});

type ServicesFormValues = z.infer<typeof servicesFormSchema>;

interface ServicesSettingsProps {
  services: Service[];
  onServicesUpdate: (services: Service[]) => void;
}

export default function ServicesSettings({ services, onServicesUpdate }: ServicesSettingsProps) {
  const { toast } = useToast();
  const form = useForm<ServicesFormValues>({
    resolver: zodResolver(servicesFormSchema),
    defaultValues: {
      services: services,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "services",
  });

  function onSubmit(data: ServicesFormValues) {
    onServicesUpdate(data.services);
    toast({
      title: 'Services Updated!',
      description: 'Your services have been saved successfully.',
    });
  }

  const addNewService = () => {
    append({
        id: `service-${Date.now()}`, // simple unique id
        name: '',
        description: '',
        price: 0,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Your Services</CardTitle>
        <CardDescription>Add, edit, or remove the services you offer to your fans.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg relative">
                         <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => remove(index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name={`services.${index}.name`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Service Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Personalized Video" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`services.${index}.price`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Price (₹)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="4000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                                control={form.control}
                                name={`services.${index}.description`}
                                render={({ field }) => (
                                    <FormItem className="mt-4">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Describe the service..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                    </div>
                ))}
            </div>

            <Button type="button" variant="outline" onClick={addNewService}>
                <PlusCircle /> Add New Service
            </Button>
            
            <Separator />

            <Button type="submit" size="lg">
              Save All Services
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

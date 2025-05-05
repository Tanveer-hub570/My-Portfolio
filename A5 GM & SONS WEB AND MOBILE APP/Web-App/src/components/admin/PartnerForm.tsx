
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Partner } from '@/context/PartnerContext';

const partnerSchema = z.object({
  name: z.string().min(2, { message: 'Partner name is required' }),
  logo: z.string().min(5, { message: 'Logo URL is required' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  contactPerson: z.string().min(2, { message: 'Contact person name is required' }),
  phone: z.string().min(5, { message: 'Phone number is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  address: z.string().min(5, { message: 'Address is required' }),
  active: z.boolean().default(true),
});

type PartnerFormValues = z.infer<typeof partnerSchema>;

interface PartnerFormProps {
  initialData?: Partner;
  onSubmit: (data: PartnerFormValues) => void;
  onCancel: () => void;
}

const PartnerForm = ({ initialData, onSubmit, onCancel }: PartnerFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState(initialData?.logo || '');

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: initialData || {
      name: '',
      logo: '',
      description: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      active: true,
    }
  });

  const handleSubmit = async (values: PartnerFormValues) => {
    setIsLoading(true);
    try {
      onSubmit(values);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setLogoUrl(url);
    form.setValue('logo', url);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partner Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter partner name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter logo URL" 
                      {...field} 
                      onChange={handleLogoChange}
                    />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter partner description" 
                      {...field} 
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact person name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email address" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Active Status</FormLabel>
                    <FormDescription>
                      Is this partner currently active?
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {logoUrl && (
          <div className="mt-4 border rounded-md p-4">
            <p className="text-sm mb-2">Logo Preview:</p>
            <div className="bg-gray-100 p-4 rounded flex items-center justify-center">
              <img 
                src={logoUrl} 
                alt="Partner logo preview" 
                className="max-h-40 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg'; 
                }} 
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : initialData ? 'Update Partner' : 'Add Partner'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PartnerForm;

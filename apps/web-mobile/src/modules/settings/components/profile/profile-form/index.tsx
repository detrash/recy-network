import { useAuth0 } from '@auth0/auth0-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Turnstile } from '@marsidev/react-turnstile';
import { useState } from 'react';

const profileFormSchema = z.object({
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  phone: z.string({
    required_error: 'Please select a number to display.',
  }),
  preferred_name: z
    .string({
      required_error: 'Please select a preferred name to display.',
    })
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  const { user } = useAuth0();
  const [turnstileToken, setTurnstileToken] = useState<string>();

  const form = useForm<ProfileFormValues>({
    // defaultValues,
    mode: 'onChange',
    resolver: zodResolver(profileFormSchema),
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, undefined, 2)}</code>
        </pre>
      ),
      title: 'You submitted the following values:',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-base">Basic Info</h2>
          <Separator />
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-6 gap-3">
            <FormField
              control={form.control}
              name="preferred_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Label>Foto</Label>
          <Avatar>
            <AvatarImage
              className="ring-neutral h-12 w-12 rounded-full ring-[1px]"
              src={user?.picture ?? ''}
              alt="User profile"
            />
            <AvatarFallback className="text-xs">{user?.name}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-base">Profile Type</h2>
          <Separator />
        </div>

        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-hodler" id="option-hodler" />
            <Label htmlFor="option-hodler">Hodler</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-recycler" id="option-recycler" />
            <Label htmlFor="option-recycler">Recycler</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-waste" id="option-waste" />
            <Label htmlFor="option-waste">Waste Generator</Label>
          </div>
        </RadioGroup>

        <Turnstile siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY} onSuccess={setTurnstileToken} />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}

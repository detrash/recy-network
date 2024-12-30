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
import { useAuth } from '@/hooks/auth';
import { RadioBox } from '@/components/ui/radioBox';

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

type cssmapType = {
  [id: string]: string;
};

const cssmap: cssmapType = {
  'option-hodler-box': 'option-hodler-box',
  'option-recycler-box': 'option-recycler-box',
  'option-waste-box': 'option-waste-box',
};

export default function ProfileForm() {
  const { user } = useAuth();
  const [turnstileToken, setTurnstileToken] = useState<string>();
  const [radioActive, setRadioActive] = useState<string>();

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-base font-bold uppercase">Basic Info:</h2>
          <Separator />
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-6 gap-3 max-md:grid-cols-2">
            <FormField
              control={form.control}
              name="preferred_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Preferred Name
                    <span className="text-base font-extrabold text-red-600"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="empty:border-input border invalid:border-red-500 focus-visible:border-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0 [&:not(:placeholder-shown)(:invalid)]:valid:border-green-500"
                      placeholder=""
                      type="text"
                      minLength={2}
                    />
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
                  <FormLabel>
                    Phone number
                    <span className="text-base font-extrabold text-red-600"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      className="empty:border-input border invalid:border-red-500 focus-visible:border-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0 [&:not(:placeholder-shown)(:invalid)]:valid:border-green-500"
                      placeholder=""
                    />
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
              <FormItem className="max-w-xs max-md:max-w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="border invalid:border-red-500 focus-visible:border-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0 [&:not(:placeholder-shown)(:invalid)]:valid:border-green-500"
                    placeholder=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Label>Foto</Label>
          <Avatar>
            <AvatarImage
              className="ring-neutral w-12 rounded-full border-2 border-black ring-[1px]"
              src={user?.picture ?? ''}
              alt="User profile"
            />
            <AvatarFallback className="text-xs">{user?.name}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-base font-bold uppercase">Profile Type:</h2>
          <Separator />
        </div>

        <RadioGroup
          defaultValue="option-one"
          className={`grid grid-cols-6 [&[data-active='${cssmap[radioActive]}']>#${cssmap[radioActive]}]:border-blue-500 max-md:grid-cols-2 [&[data-active='${cssmap[radioActive]}']>#${cssmap[radioActive]}>.checked-box-symbol]:block`}
          data-active={radioActive}
        >
          <RadioBox beforeText="I'M" id="option-hodler" name="Partner" activeState={setRadioActive} />

          <RadioBox
            beforeText="I'M"
            id="option-recycler"
            name="Sustainble treatment agent"
            activeState={setRadioActive}
          />

          <RadioBox beforeText="I'M" id="option-waste" name="Waste Generator" activeState={setRadioActive} />
        </RadioGroup>

        <Turnstile siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY} onSuccess={setTurnstileToken} />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}

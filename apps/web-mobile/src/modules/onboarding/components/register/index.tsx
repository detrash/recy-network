import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { redirect } from 'react-router-dom';
import { z } from 'zod';

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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';

const welcomeFormSchema = z.object({
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

type WelcomeFormValues = z.infer<typeof welcomeFormSchema>;

export function Register() {
  const { t } = useTranslation();

  const form = useForm<WelcomeFormValues>({
    mode: 'onChange',
    resolver: zodResolver(welcomeFormSchema),
  });

  function onSubmit(data: WelcomeFormValues) {
    toast({
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, undefined, 2)}</code>
        </pre>
      ),
      title: 'You submitted the following values:',
    });

    redirect('/dashboard');
  }

  return (
    <Form {...form}>
      <form className="flex flex-1 flex-col gap-4 sm:gap-12" onSubmit={form.handleSubmit(onSubmit)}>
        <section className="mb-3 sm:m-0">
          <h2 className="mb-1 text-2xl font-bold leading-relaxed text-gray-800 antialiased sm:text-3xl">
            {t('onboarding:complete_information')}
          </h2>
          <p className="text-sm text-gray-600">{t('onboarding:detrash_rules')}</p>
        </section>

        <section className="grid grid-cols-6 gap-3">
          <div className="col-span-6 sm:col-span-3">
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
          </div>
          <div className="col-span-6 sm:col-span-3">
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
        </section>

        <section>
          <h2 className="mb-4 border-b-[1px] pb-1 text-sm font-bold uppercase">
            {t('onboarding:select_profile')}
            :
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
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
          </div>
        </section>

        <div className="mt-auto flex items-end justify-center">
          <Button type="submit">{t('onboarding:creating_user')}</Button>
        </div>
      </form>
    </Form>
  );
}

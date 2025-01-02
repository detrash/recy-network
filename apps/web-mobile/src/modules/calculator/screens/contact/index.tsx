import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { apiV1 } from '@/libs/axios';

const contactFormValue = z.object({
  email: z.string().email(),
});

type ContactFormValues = z.infer<typeof contactFormValue>;

export default function CalculatorContactScreen() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const form = useForm<ContactFormValues>({
    mode: 'onChange',
    resolver: zodResolver(contactFormValue),
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: ContactFormValues) {
    setIsLoading(true);

    const BASE_URL = import.meta.env.VITE_AWS_LAMBDA;
    const ENVIRONMENT = import.meta.env.PROD ? 'production' : 'staging';
    const ENDPOINT = `${BASE_URL}/${ENVIRONMENT}/user/support`;

    try {
      const response = await apiV1.post(ENDPOINT, { email: data.email });

      if (response.status === 200) {
        form.reset({ email: '' });

        toast({
          title: t('calculator.contact.success'),
        });

        return;
      }

      throw new Error(response.data.error.message);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto my-6 flex max-w-2xl flex-col gap-6">
      <Card className="sm:rounded-xl sm:shadow-xl">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <h2 className="text-center text-lg lg:text-2xl">{t('calculator.contact.title')}</h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Form {...form}>
            <form className="flex flex-1 flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)} id="calculator-form">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">{t('calculator.contact.label')}</FormLabel>
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormItem>
                )}
              />

              <Button size="lg" type="submit">
                {isLoading ? '...' : t('calculator.contact.button')}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

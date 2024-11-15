import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { redirect } from 'react-router-dom';
import { z } from 'zod';

// import { Button } from '@/components/ui/button';
import {
  Form,
  // FormControl,
  // FormField,
  // FormItem,
  // FormLabel,
  // FormMessage,
} from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

export function Details({ onFormStep }: { onFormStep: (step: string) => void }) {
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
        <section>
          <h2 className="mb-1 text-2xl font-bold leading-relaxed text-gray-800 antialiased">
            {t('submit:details_title1')}
            {' '}
            {/* <span className="text-secondary">{t(`common:${wasteType.toLowerCase()}`)}</span>
             */}
            <span className="text-secondary">Plastic</span>
            {t('submit:details_title2')}
          </h2>
          <p className="text-sm text-gray-600">{t('submit:type_approximate_amount')}</p>
        </section>

        <div className="mt-auto grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-between">
          <button
            type="button"
            className="btn btn-outline text-neutral border-neutral no-animation flex w-full items-center gap-2 border shadow-none sm:w-auto"
            // onClick={onPreviousWaste}
          >
            <ArrowLeft className="h-6 w-6" />
            {t('submit:go_back')}
          </button>
          <button
            // disabled={isButtonDisabled}
            // className={classNames('btn btn-primary no-animation w-full text-white sm:w-auto', {
            //   'loading btn-disabled': isLoading,
            // })}
            type="button"
            onClick={() => {
              onFormStep('done');
            }}
          >
            {/* {isLoading ? t('submit:saving_form') : t('submit:advance')} */}
            {t('submit:advance')}
          </button>
        </div>
      </form>
    </Form>
  );
}

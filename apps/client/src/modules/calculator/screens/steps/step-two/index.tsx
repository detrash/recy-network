import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
import { useCalculatorStore } from '@/modules/calculator/stores';

const calculatorStepTwoFormSchema = z.object({
  employees_quantity: z.string({
    required_error: 'Please select a employees quantity to display.',
  }),
});

type CalculatorStepTwoFormValues = z.infer<typeof calculatorStepTwoFormSchema>;

export function CalculatorStepTwo() {
  const {
    setInputs, inputs, currentStep, setPreviousStep,
  } = useCalculatorStore();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const form = useForm<CalculatorStepTwoFormValues>({
    defaultValues: {
      employees_quantity: inputs.employees_quantity ? String(inputs.employees_quantity) : undefined,
    },
    mode: 'onChange',
    resolver: zodResolver(calculatorStepTwoFormSchema),
  });

  const defaultValuesWatched = form.watch();

  const canForwardButton = !!defaultValuesWatched.employees_quantity;

  function onSubmit(data: CalculatorStepTwoFormValues) {
    setInputs({
      ...inputs,
      employees_quantity: Number(data.employees_quantity),
    });

    navigate('/calculator/result');
  }

  const handleBackNavigate = () => {
    if (currentStep === 1) {
      navigate(-1);
      return;
    }

    setPreviousStep();
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-1 flex-col gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
        id="calculator-form"
      >
        <section className="mb-3 sm:m-0">
          <h2 className="mb-1 text-2xl font-bold leading-relaxed text-gray-800 antialiased sm:text-3xl">
            {t('calculator.steps.two.title')}
          </h2>
        </section>

        <section>
          <FormField
            control={form.control}
            name="employees_quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('calculator.steps.two.label')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
      </form>

      <footer className="flex gap-4">
        <Button variant="outline" size="icon" onClick={handleBackNavigate}>
          <ArrowLeft />
        </Button>
        <Button
          className="w-full"
          type="submit"
          form="calculator-form"
          disabled={!canForwardButton}
        >
          {t('calculator.steps.button')}
        </Button>
      </footer>
    </Form>
  );
}

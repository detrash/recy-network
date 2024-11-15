import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCalculatorStore } from '@/modules/calculator/stores';

const calculatorStepOneFormSchema = z.object({
  target: z.string({
    required_error: 'Please select a option to display.',
  }),
});

type CalculatorStepOneFormValues = z.infer<typeof calculatorStepOneFormSchema>;

export function CalculatorStepOne() {
  const {
    setInputs, setNextStep, inputs, currentStep, setPreviousStep,
  } = useCalculatorStore();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const form = useForm<CalculatorStepOneFormValues>({
    defaultValues: {
      target: inputs.target,
    },
    mode: 'onChange',
    resolver: zodResolver(calculatorStepOneFormSchema),
  });

  const defaultValuesWatched = form.watch();

  const canForwardButton = !!defaultValuesWatched.target;

  function onSubmit(data: CalculatorStepOneFormValues) {
    setInputs({
      employees_quantity: 1,
      target: data.target,
    });

    if (data.target === 'individual') {
      navigate('/calculator/result');

      return;
    }

    setNextStep();
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
            {t('calculator.steps.one.title')}
          </h2>
        </section>

        <section>
          <FormField
            control={form.control}
            name="target"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('calculator.steps.one.select.placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="individual">
                      {t('calculator.steps.one.select.options.individual')}
                    </SelectItem>
                    <SelectItem value="company">
                      {t('calculator.steps.one.select.options.company')}
                    </SelectItem>
                  </SelectContent>
                </Select>
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

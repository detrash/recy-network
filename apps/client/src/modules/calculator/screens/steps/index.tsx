import { useTranslation } from 'react-i18next';

import { useCalculatorStore } from '@/modules/calculator/stores';

import { CalculatorStepOne } from './step-one';
import { CalculatorStepTwo } from './step-two';

export default function CalculatorStepsTree() {
  useTranslation();

  const { currentStep } = useCalculatorStore();

  return (
    <div className="container mx-auto my-6 flex max-w-xl flex-col justify-center gap-6">
      {currentStep === 1 && <CalculatorStepOne />}
      {currentStep === 2 && <CalculatorStepTwo />}
    </div>
  );
}

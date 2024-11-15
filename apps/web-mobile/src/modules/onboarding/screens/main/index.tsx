import { useState } from 'react';

import { Register } from '@/modules/onboarding/components/register';
import { Welcome } from '@/modules/onboarding/components/welcome';

export default function OnboardingScreen() {
  const [formStep, setFormStep] = useState('welcome');

  return (
    <main className="container flex max-h-full flex-1 bg-white p-4 sm:max-w-2xl sm:rounded-xl sm:border-2 sm:p-8 sm:shadow-2xl">
      {formStep === 'welcome' && <Welcome onGetStarted={() => setFormStep('register')} />}
      {formStep === 'register' && <Register />}
    </main>
  );
}

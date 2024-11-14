import { useState } from 'react';

import { Definitions } from '@/modules/submit/components/definitions';
import { Details } from '@/modules/submit/components/details';
import { Done } from '@/modules/submit/components/done';

export default function SubmitScreen() {
  const [formStep, setFormStep] = useState('definitions');

  return (
    <main className="container flex max-h-full flex-1 bg-white p-4 sm:max-w-2xl sm:rounded-xl sm:border-2 sm:p-8 sm:shadow-2xl">
      {formStep === 'definitions' && <Definitions onFormStep={(step) => setFormStep(step)} />}
      {formStep === 'details' && <Details onFormStep={(step) => setFormStep(step)} />}
      {formStep === 'done' && <Done />}
    </main>
  );
}

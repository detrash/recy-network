import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
// import { useAuth0 } from '@auth0/auth0-react';

export function Definitions({ onFormStep }: { onFormStep: (step: string) => void }) {
  const { t } = useTranslation();

  // const { user } = useAuth0();
  return (
    <div className="flex flex-1 flex-col justify-between gap-6">
      <section className="mb-3 sm:m-0">
        <h2 className="mb-1 text-2xl font-bold leading-relaxed text-gray-800 antialiased sm:text-3xl">
          {t('submit:submit_title')}
        </h2>
        <p className="text-sm text-gray-600">{t('submit:submit_description1')}</p>
        <p className="text-sm text-gray-600">{t('submit:submit_description2')}</p>
        <p className="mt-2">
          {t('common:wallet')}
          :
          <span className="font-bold">{t('submit:not_connected')}</span>
        </p>
      </section>

      <section>
        <h2 className="mb-4 border-b-[1px] pb-1 text-sm font-bold uppercase">
          {t('submit:type_of_residues')}
        </h2>
        <div className="grid grid-cols-6 gap-3">checkboxs</div>
      </section>

      <div className="mt-auto flex items-end justify-center">
        <Button
          // disabled={!wasteTypes.length}
          className="btn btn-primary no-animation w-full text-white sm:w-auto"
          onClick={() => onFormStep('details')}
        >
          {t('submit:confirm')}
        </Button>
      </div>
    </div>
  );
}

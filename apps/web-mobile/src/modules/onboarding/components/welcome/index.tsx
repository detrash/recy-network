import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';

export function Welcome({ onGetStarted }: { onGetStarted: () => void }) {
  const { t } = useTranslation();

  const { user } = useAuth0();
  return (
    <div className="flex flex-col justify-between flex-1 gap-6">
      <section>
        <h3 className="text-sm font-bold uppercase leading-5 tracking-[0.05em] text-primary">
          {`${t('onboarding:hello')} ${user?.name},`}
        </h3>
        <h2 className="text-2xl antialiased font-bold leading-relaxed text-gray-800 sm:text-3xl">
          {t('onboarding:welcome_to_recy')}
        </h2>
      </section>

      <div className="flex flex-col items-center">
        <picture className="h-72 w-72 sm:h-96 sm:w-96">
          <img src="/assets/brand/recy-logo.png" alt="RECY token logo" />
        </picture>

        <p className="text-base leading-relaxed text-center">
          {t('onboarding:keeping_world_clean')}
        </p>
        <p className="text-base leading-relaxed text-center">{t('onboarding:together')}</p>
      </div>

      <div className="flex items-end justify-center pt-5">
        <Button
          className="w-full text-white btn btn-primary no-animation sm:w-auto"
          onClick={() => onGetStarted()}
        >
          {t('onboarding:get_started')}
        </Button>
      </div>
    </div>
  );
}

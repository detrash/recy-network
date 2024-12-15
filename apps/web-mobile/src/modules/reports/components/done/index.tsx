import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';

export function Done() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col justify-between gap-6">
      <div className="flex flex-1 flex-col">
        <section className="flex flex-1 flex-col items-center justify-center gap-4">
          <CheckCircle className="text-success h-40 w-40" />
          <h2 className="text-2xl font-bold">{t('submit:done_title')}</h2>
          <h3 className="text-lg">{t('submit:done_message')}</h3>
        </section>
        <div className="flex items-end justify-center">
          <Link to={ROUTES.PRIVATE.DASHBOARD()}>
            <Button className="btn btn-primary no-animation w-full text-white sm:w-auto">
              {t('submit:go_to_dashboard')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import { Suspense, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import LocaleToggler from '@/components/locale-toggler';
import { Button } from '@/components/ui/button';

export default function HomeScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-between flex-1 h-lvh">
      <main className="flex flex-col justify-center flex-1 flex-shrink-0 h-full">
        <div className="w-full p-5">
          <nav className="flex items-center justify-between">
            <div>
              <img src="/assets/brand/recy-logo.png" width={64} height={64} alt="Recy Logo" />
            </div>

            <div className="flex justify-center p-5">
              <Suspense fallback={<div>Loading language options...</div>}>
                <LocaleToggler />
              </Suspense>
            </div>
          </nav>
        </div>

        <div className="flex flex-col justify-center flex-1 max-w-xl gap-8 p-5">
          <div className="flex flex-col gap-4">
            <h1 className="text-6xl font-bold lg:text-7xl">Welcome to</h1>
            <span className="text-6xl font-bold text-primary lg:text-7xl">Recy App</span>
          </div>
          <p className="text-xl text-gray-500">
            Let&apos;s end waste pollution at its source.
            Let&apos;s transform how we think about trash and recycling.
          </p>
          <Button onClick={() => loginWithRedirect()} size="lg" className="w-full">
            {t('home.login')}
          </Button>
        </div>
      </main>
      <aside className="relative flex-col items-center justify-center flex-1 flex-shrink hidden h-lvh basis-1/12 xl:flex">
        <img className="object-cover w-full" src="/assets/bg/ocean.jpg" alt="Ocean" />
      </aside>
    </div>
  );
}

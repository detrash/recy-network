import { Suspense, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import LocaleToggler from '@/components/locale-toggler';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { error } from 'console';
import { api } from '@/libs/axios';
import user from '@/modules/dashboard/screens/user';

export default function HomeScreen() {
  const { t } = useTranslation();

  const { isAuthenticated, loginWithRedirect, error, handleRedirectCallback, user } = useAuth0();

  const navigate = useNavigate();

  console.log('user', user);
  console.log('isAuthenticated', isAuthenticated);
  console.log('error', error);

  // if (isAuthenticated) {
  //   navigate('/dashboard');
  // }

  if (error) {
    toast({
      variant: 'destructive',
      title: error.name,
      description: error.message,
      action: (
        <ToastAction altText="Try again" onClick={() => loginWithRedirect()}>
          Try again
        </ToastAction>
      ),
    });
  }

  // useEffect(() => {
  //   const handleAuthRedirect = async () => {
  //     try {
  //       await handleRedirectCallback();
  //       console.log('handleRedirectCallback');
  //     } catch (err) {
  //       console.error('Error handling Auth0 redirect callback:', err);
  //     }
  //   };

  //   // Check if we are in the callback state and need to process it
  //   if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
  //     handleAuthRedirect();
  //   }
  // }, [handleRedirectCallback, isAuthenticated, navigate, user]);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            {/* <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div> */}
            <img src="/assets/brand/recy-logo.png" width={64} height={64} alt="Recy Logo" />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-xl flex-col gap-4 text-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-6xl font-bold lg:text-7xl">Welcome to</h1>
              <span className="text-primary text-6xl font-bold lg:text-7xl">Recy App</span>
            </div>

            <p className="text-xl text-gray-500">
              Let&apos;s end waste pollution at its source. Let&apos;s transform how we think about trash and recycling.
            </p>
            <Button onClick={() => loginWithRedirect()} size="lg" className="w-full">
              {t('home.login')}
            </Button>
            <div className="flex justify-center p-5">
              <Suspense fallback={<div>Loading language options...</div>}>
                <LocaleToggler />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/assets/bg/ocean.jpg"
          alt="Ocean"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[1.2]"
        />
      </div>
    </div>
  );
}

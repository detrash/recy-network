import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LocaleToggler from '@/components/locale-toggler';
import { Button } from '@/components/ui/button';
import { useUsersValidate } from '@/services/users';

export default function HomeScreen() {
  const { t } = useTranslation();
  const {
    loginWithRedirect,
    error: isAuthError,
    isAuthenticated,
    getIdTokenClaims,
    getAccessTokenWithPopup,
  } = useAuth0();
  const { mutate: validateUser, isError: isUsersValidateError, isSuccess: isUsersValidateSuccess } = useUsersValidate();
  const navigate = useNavigate();

  const hasAuthOrValidateError = isAuthError && isUsersValidateError;
  const canRedirected = isAuthenticated && isUsersValidateSuccess && !hasAuthOrValidateError;

  if (canRedirected) navigate('/dashboard');

  if (isAuthError) {
    toast({
      variant: 'destructive',
      title: isAuthError.name,
      description: isAuthError.message,
      action: (
        <ToastAction altText="Try again" onClick={() => loginWithRedirect()}>
          Try again
        </ToastAction>
      ),
    });
  }

  const handleLogin = async () => {
    await getAccessTokenWithPopup();
    const tokenClaims = await getIdTokenClaims();

    const [authProvider] = tokenClaims.sub.split('|'); // Ex: google-oauth2

    const payload = {
      email: tokenClaims.email,
      name: tokenClaims.name,
      picture: tokenClaims.picture,
      authId: tokenClaims.sub,
      authProvider,
    };

    validateUser(payload);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <img src="/assets/brand/recy-logo.png" width={64} height={64} alt="Recy Logo" />
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
            <Button onClick={handleLogin} size="lg" className="w-full">
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
          alt="Man cleaning the beach"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[1.2]"
        />
      </div>
    </div>
  );
}

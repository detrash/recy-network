import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import LocaleToggler from '@/components/locale-toggler';
import { Button } from '@/components/ui/button';

import { Loader2 } from 'lucide-react';
import { validateAuthProvider } from '@/utils/auth';
import { useUsersValidate } from '@/services/users';
import { useAuth } from '@/hooks/auth';

export default function HomeScreen() {
  const { t } = useTranslation();
  const {
    loginWithRedirect,
    error: isAuthError,
    isAuthenticated,
    getIdTokenClaims,
    getAccessTokenWithPopup,
    isLoading,
  } = useAuth();

  const {
    mutate: validateUser,
    isError: isUsersValidateError,
    isPending: isValidateUserPending,
    // isSuccess: isUsersValidateSuccess,
  } = useUsersValidate();
  const navigate = useNavigate();

  const hasAuthOrValidateError = isAuthError || isUsersValidateError;
  const canRedirected = isAuthenticated && !hasAuthOrValidateError;

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

    const authProviderValidated = validateAuthProvider(tokenClaims.sub);

    if (!validateAuthProvider(authProviderValidated)) {
      toast({
        variant: 'destructive',
        title: 'Auth Provider Invalid',
        description: isAuthError.message,
      });

      return;
    }

    const payload = {
      email: tokenClaims.email,
      name: tokenClaims.name,
      picture: tokenClaims.picture,
      authId: tokenClaims.sub,
      authProvider: authProviderValidated,
    };

    validateUser(payload);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col items-center gap-4 p-6 md:p-10">
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <img src="/assets/brand/recy-logo.png" width={64} height={64} alt="Recy Logo" />
        </div>
        <div className="flex items-center justify-center flex-1">
          <div className="flex flex-col w-full max-w-xl gap-4 text-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-6xl font-bold lg:text-7xl">Welcome to</h1>
              <span className="text-6xl font-bold text-primary lg:text-7xl">Recy App</span>
            </div>
            <p className="text-xl text-gray-500">
              Let&apos;s end waste pollution at its source. Let&apos;s transform how we think about trash and recycling.
            </p>
            <Button
              onClick={handleLogin}
              size="lg"
              className="flex w-full gap-2"
              disabled={isValidateUserPending || isLoading}
            >
              {(isValidateUserPending || isLoading) && <Loader2 className="animate-spin" />}

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
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/assets/bg/ocean.jpg"
          alt="Man cleaning the beach"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[1.2]"
        />
      </div>
    </div>
  );
}

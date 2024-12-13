import { useEffect, useRef } from 'react';
import { turnstileWindow } from './types';
import { api } from '@/libs/axios';
import { toast } from '../ui/use-toast';

const SITE_KEY = '0x4AAAAAAA1xm1WGL4XXa0S0';
const { turnstile }: turnstileWindow = window;

const verifyCatpcha = async (token: string) => {
  const BASE_URL = import.meta.env.VITE_AWS_LAMBDA;
  const ENVIRONMENT = import.meta.env.PROD ? 'production' : 'staging';
  const ENDPOINT = `${BASE_URL}/${ENVIRONMENT}/v1/captcha`;

  try {
    const { data } = await api.post(ENDPOINT, { token });

    if (!data.success) throw new Error('Captcha verification failed');
  } catch (error) {
    if (error instanceof Error) {
      toast({
        title: error.message,
        variant: 'destructive',
      });
      throw error;
    }
  }
};

const Captcha = () => {
  const widgetIdRef = useRef<string | void>();

  useEffect(() => {
    try {
      if (!turnstile) throw new Error('Turnstile not initialized');

      widgetIdRef.current = turnstile.render('.cf-turnstile', {
        sitekey: SITE_KEY,
        appearance: 'interaction-only',
        callback: async (token) => {
          await verifyCatpcha(token);
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          description: 'Please refresh the page or try again later',
          variant: 'destructive',
        });
      }
    }
    return () => {
      if (turnstile && widgetIdRef.current) turnstile.remove(widgetIdRef.current);
    };
  }, []);
  return <div className="cf-turnstile"></div>;
};

export default Captcha;

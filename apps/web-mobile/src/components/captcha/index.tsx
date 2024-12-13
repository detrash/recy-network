import { useEffect } from 'react';
import { turnstileWindow } from './types';
import { api } from '@/libs/axios';
import { toast } from '../ui/use-toast';

const SITE_KEY = '0x4AAAAAAA1xm1WGL4XXa0S0';
const { turnstile }: turnstileWindow = window;

const captchaTrigger = () => {
  try {
    turnstile.render('.cf-turnstile', {
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
        variant: 'destructive',
      });
    }
  }
};

const verifyCatpcha = async (token: string) => {
  const BASE_URL = import.meta.env.VITE_AWS_LAMBDA;
  const ENVIRONMENT = import.meta.env.PROD ? 'production' : 'staging';
  const ENDPOINT = `${BASE_URL}/${ENVIRONMENT}/v1/captcha`;

  try {
    await api.post(ENDPOINT, { token });
  } catch (error) {
    if (error instanceof Error) {
      toast({
        title: error.message,
        variant: 'destructive',
      });
    }
  }
};

const Captcha = () => {
  useEffect(() => {
    captchaTrigger();
  }, []);
  return <div className="cf-turnstile"></div>;
};

export default Captcha;

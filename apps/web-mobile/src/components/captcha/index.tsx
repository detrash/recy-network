import { useEffect } from 'react';
import { turnstileWindow } from './types';

const SCRIPT_CAPTCHA = (
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" async defer></script>
);
const SITE_KEY = '0x4AAAAAAA1xm1WGL4XXa0S0';
const { turnstile }: turnstileWindow = window;

const captchaTrigger = async () => {
  try {
    turnstile.remove();
    turnstile.render('.cf-turnstile', {
      sitekey: SITE_KEY,
      appearance: 'interaction-only',
      callback: (token) => {
        console.log('challenge: ', token);
      },
    });
  } catch (err) {
    console.log(err);
  }
};
const Captcha = () => {
  useEffect(() => {
    captchaTrigger();
  }, []);
  return <div className="cf-turnstile"></div>;
};

export default Captcha;

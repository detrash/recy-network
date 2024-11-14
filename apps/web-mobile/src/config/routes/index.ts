import type { Route } from './types';

const mapParameters = (base: string): Route => {
  return (...args: string[]) => {
    return `/${base}${args.map((parameter) => `/${parameter}`).join('')}`;
  };
};

export const ROUTES = {
  PRIVATE: {
    ADMIN: mapParameters('admin'),
    DASHBOARD: mapParameters('dashboard'),
    KYC: mapParameters('kyc'),
    ONBOARDING: mapParameters('onboarding'),
    PROFILE: mapParameters('settings/profile'),
    SUBMIT: mapParameters('submit'),
    SUBMIT_FORM: mapParameters('submit'),
  },
  PUBLIC: {
    HOME: mapParameters(''),
  },
};

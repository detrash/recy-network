import type { Route } from './types';

const mapParameters = (base: string): Route => {
  return (...args: string[]) => {
    return `/${base}${args.map((parameter) => `/${parameter}`).join('')}`;
  };
};

export const ROUTES = {
  PRIVATE: {
    ADMIN: mapParameters('admin'),
    AUDITS: mapParameters('audits'),
    DASHBOARD: mapParameters('dashboard'),
    DASHBOARD_ADMIN: mapParameters('admin/dashboard'),
    KYC: mapParameters('kyc'),
    ONBOARDING: mapParameters('onboarding'),
    PROFILE: mapParameters('settings/profile'),
    REPORTS: mapParameters('reports'),
    SUBMIT_REPORT: mapParameters('reports/submit'),
  },
  PUBLIC: {
    HOME: mapParameters(''),
  },
};

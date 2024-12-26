import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Header } from '@/layouts/header';
import { HeaderSimple } from '@/modules/calculator/components/header';
import Calculator from '@/pages/calculator';
import CalculatorContact from '@/pages/calculator/contact';
import CalculatorResult from '@/pages/calculator/result';
import CalculatorSteps from '@/pages/calculator/steps';
import Dashboard from '@/pages/dashboard';
import Home from '@/pages/home';
import KYC from '@/pages/kyc';
import Onboarding from '@/pages/onboarding';
import Profile from '@/pages/profile';
import ReportsSubmit from '@/pages/reports/submit';

import '@/libs/i18next';
import NotFoundPage from './pages/not-found';
import ErrorPage from './pages/error';
import Reports from '@/pages/reports';
import Audits from './pages/audits';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { addAccessTokenInterceptor } from './libs';
import ProtectedRoutes from './components/protected-router';

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        children: [
          {
            element: <Dashboard />,
            path: '/dashboard',
          },
          {
            element: <Dashboard />,
            path: '/settings',
          },
          {
            element: <Reports />,
            path: '/reports',
          },
          {
            element: <ReportsSubmit />,
            path: '/reports/submit',
          },
          {
            element: <Audits />,
            path: '/audits',
          },
          {
            element: <Onboarding />,
            path: '/onboarding',
          },
          {
            children: [
              {
                element: <Profile />,
                path: '/settings/profile',
              },
            ],
            path: '/settings',
          },
          {
            element: <KYC />,
            path: '/kyc',
          },
        ],
        element: <Header />,
      },
    ],
    element: <Header />,
    errorElement: <ErrorPage />,
  },
  {
    children: [
      {
        element: <CalculatorContact />,
        path: '/calculator/contact',
      },
      {
        element: <CalculatorSteps />,
        path: '/calculator/steps',
      },
      {
        element: <CalculatorResult />,
        path: '/calculator/result',
      },
      {
        element: <Calculator />,
        path: '/calculator',
      },
    ],
    element: <HeaderSimple />,
    errorElement: <ErrorPage />,
  },
  {
    element: <Home />,
    path: '/',
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export function App() {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    addAccessTokenInterceptor(getAccessTokenSilently);
  }, [getAccessTokenSilently]);

  return (
    <main>
      <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
    </main>
  );
}

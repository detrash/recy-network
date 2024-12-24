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
import Submit from '@/pages/submit';

import '@/libs/i18next';
import NotFoundPage from './pages/not-found';
import ErrorPage from './pages/error';

const router = createBrowserRouter([
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
        element: <Submit />,
        path: '/submit',
      },
      {
        element: <Onboarding />,
        path: '/onboarding',
      },
      {
        element: <Dashboard />,
        path: '/admin',
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
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

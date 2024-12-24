import React from 'react';

import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/ui/error-boundary';
import ErrorPage from './pages/error';

import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/providers/index';

import { App } from './app';

import './styles/globals.css';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <Providers>
        <App />
        <Toaster />
      </Providers>
    </ErrorBoundary>
  </React.StrictMode>
);

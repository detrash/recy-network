import type { ReactElement } from 'react';

import { render } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { BrowserRouter } from 'react-router-dom';

export const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

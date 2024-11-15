import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import '@testing-library/jest-dom';

import CalculatorScreen from '@/modules/calculator/screens/main';
import { renderWithRouter } from '@/tests/render-with-router';

describe('Calculator Main', () => {
  test('renders the main section and button correctly', () => {
    renderWithRouter(<CalculatorScreen />, { route: '/calculator' });

    expect(screen.getByText('calculator.main.hero')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'calculator.main.cta' })).toBeInTheDocument();
  });

  test('renders card content correctly', () => {
    renderWithRouter(<CalculatorScreen />, { route: '/calculator' });

    expect(screen.getByText('calculator.main.paragraph.one.title')).toBeInTheDocument();
    expect(screen.getByText('calculator.main.paragraph.one.text')).toBeInTheDocument();
    expect(screen.getByText('calculator.main.paragraph.two.title')).toBeInTheDocument();
    expect(screen.getByText('calculator.main.paragraph.two.text')).toBeInTheDocument();
    expect(screen.getByText('calculator.main.paragraph.three.title')).toBeInTheDocument();
    expect(screen.getByText('calculator.main.paragraph.three.text')).toBeInTheDocument();
  });

  // TODO: Fix this test
  // test('navigates to /calculator/steps on button click', async () => {
  //   const { user } = renderWithRouter(<CalculatorScreen />, { route: '/calculator' });

  //   const button = screen.getByRole('button', { name: 'calculator.main.cta' });

  //   expect(button).toBeInTheDocument();

  //   await user.click(button);

  //   expect(await screen.findByText('calculator.steps.one.title')).toBeInTheDocument();
  // });
});

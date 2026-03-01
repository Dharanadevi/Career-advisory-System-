import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the landing page headline', () => {
  render(<App />);
  // This looks for the "Career Success" text we added to your updated Home.js
  const linkElement = screen.getByText(/Career Success/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders student login button on home page', () => {
  render(<App />);
  const studentBtn = screen.getByText(/Student Login/i);
  expect(studentBtn).toBeInTheDocument();
});

test('renders staff console card', () => {
  render(<App />);
  const staffText = screen.getByText(/Staff Console/i);
  expect(staffText).toBeInTheDocument();
});
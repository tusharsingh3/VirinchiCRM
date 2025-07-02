import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page with Virinchi Architects title', () => {
  render(<App />);
  const titleElement = screen.getByText(/virinchi architects/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders login form elements', () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const rememberMeCheckbox = screen.getByLabelText(/remember me/i);
  const loginButton = screen.getByRole('button', { name: /login/i });
  
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(rememberMeCheckbox).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test('renders sign up button on welcome side', () => {
  render(<App />);
  const signUpButton = screen.getByRole('button', { name: /sign up/i });
  expect(signUpButton).toBeInTheDocument();
});

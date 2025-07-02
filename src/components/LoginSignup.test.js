import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginSignup from './LoginSignup';

describe('LoginSignup Component', () => {
  test('renders login form by default', () => {
    render(<LoginSignup />);
    
    expect(screen.getByText('Virinchi Architects')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('toggles to signup form when Sign Up button is clicked', async () => {
    render(<LoginSignup />);
    
    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });
    await userEvent.click(signUpButton);
    
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
    expect(screen.getByText('Hello, Friend!')).toBeInTheDocument();
  });

  test('validates required fields on login', async () => {
    render(<LoginSignup />);
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    await userEvent.click(loginButton);
    
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('validates email format', async () => {
    render(<LoginSignup />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.click(loginButton);
    
    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
  });

  test('validates password length', async () => {
    render(<LoginSignup />);
    
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    
    await userEvent.type(passwordInput, '123');
    await userEvent.click(loginButton);
    
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
  });
});
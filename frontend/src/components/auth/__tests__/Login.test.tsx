/// <reference types="jest" />
import { render, screen, fireEvent } from '@testing-library/react';
import { Login } from '../Login';

describe('Login Component', () => {
  let email = '';
  let password = '';
  let role: "ADMIN" | "MEMBER" | "VIEWER" = 'ADMIN';

  const setEmail = jest.fn((value: string) => {
    email = value;
  });
  const setPassword = jest.fn((value: string) => {
    password = value;
  });
  const setRole = jest.fn((value: "ADMIN" | "MEMBER" | "VIEWER") => {
    role = value;
  });

  beforeEach(() => {
    render(
      <Login
        email={email}
        password={password}
        role={role}
        setEmail={setEmail}
        setPassword={setPassword}
        setRole={setRole}
      />
    );
  });

  test('renders all inputs and elements', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument(); // select
    expect(screen.getByRole('option', { name: 'ADMIN' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'MEMBER' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'VIEWER' })).toBeInTheDocument();
  });

  test('updates email input on change', () => {
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(setEmail).toHaveBeenCalledWith('test@example.com');
  });

  test('updates password input on change', () => {
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
    expect(setPassword).toHaveBeenCalledWith('mypassword');
  });

  test('updates role select on change', () => {
    const roleSelect = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(roleSelect, { target: { value: 'MEMBER' } });
    expect(setRole).toHaveBeenCalledWith('MEMBER');
  });
});

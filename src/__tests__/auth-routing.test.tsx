import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import { AuthProvider } from '../contexts/AuthContext';

// Mock the navigation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the auth context
const mockLogin = vi.fn();
const mockRegister = vi.fn();

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    isLoading: false,
    login: mockLogin,
    register: mockRegister,
    logout: vi.fn(),
    resetPassword: vi.fn(),
  }),
}));

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </MemoryRouter>
);

describe('Authentication Routing Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Login Page Routing', () => {
    it('should redirect to patient landing after patient login', async () => {
      mockLogin.mockResolvedValueOnce(undefined);

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      // Fill in patient email
      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'patient@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('patient@example.com', 'password123');
        expect(mockNavigate).toHaveBeenCalledWith('/patient/landing');
      });
    });

    it('should redirect to doctor landing after doctor login', async () => {
      mockLogin.mockResolvedValueOnce(undefined);

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'doctor@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('doctor@example.com', 'password123');
        expect(mockNavigate).toHaveBeenCalledWith('/doctor/landing');
      });
    });

    it('should redirect to admin landing after admin login', async () => {
      mockLogin.mockResolvedValueOnce(undefined);

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('admin@example.com', 'password123');
        expect(mockNavigate).toHaveBeenCalledWith('/admin/landing');
      });
    });

    it('should handle login errors gracefully', async () => {
      mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));

      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
      });
    });
  });

  describe('Register Page Routing', () => {
    it('should redirect to patient landing after patient registration', async () => {
      mockRegister.mockResolvedValueOnce(undefined);

      render(
        <TestWrapper>
          <RegisterPage />
        </TestWrapper>
      );

      // Fill in registration form
      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/^password$/i);
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const patientRadio = screen.getByRole('radio', { name: /patient/i });
      const termsCheckbox = screen.getByRole('checkbox', { name: /agree to the terms/i });
      const submitButton = screen.getByRole('button', { name: /create account/i });

      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      fireEvent.click(patientRadio);
      fireEvent.click(termsCheckbox);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith({
          email: 'john@example.com',
          password: 'password123',
          firstName: 'John',
          lastName: 'Doe',
          role: 'patient',
        });
        expect(mockNavigate).toHaveBeenCalledWith('/patient/landing');
      });
    });

    it('should redirect to doctor landing after doctor registration', async () => {
      mockRegister.mockResolvedValueOnce(undefined);

      render(
        <TestWrapper>
          <RegisterPage />
        </TestWrapper>
      );

      const firstNameInput = screen.getByLabelText(/first name/i);
      const lastNameInput = screen.getByLabelText(/last name/i);
      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/^password$/i);
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const doctorRadio = screen.getByRole('radio', { name: /doctor/i });
      const termsCheckbox = screen.getByRole('checkbox', { name: /agree to the terms/i });
      const submitButton = screen.getByRole('button', { name: /create account/i });

      fireEvent.change(firstNameInput, { target: { value: 'Sarah' } });
      fireEvent.change(lastNameInput, { target: { value: 'Johnson' } });
      fireEvent.change(emailInput, { target: { value: 'sarah@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      fireEvent.click(doctorRadio);
      fireEvent.click(termsCheckbox);
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith({
          email: 'sarah@example.com',
          password: 'password123',
          firstName: 'Sarah',
          lastName: 'Johnson',
          role: 'doctor',
        });
        expect(mockNavigate).toHaveBeenCalledWith('/doctor/landing');
      });
    });
  });

  describe('Form Validation', () => {
    it('should show validation errors for invalid login form', async () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
        expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
      });
    });

    it('should show validation errors for invalid registration form', async () => {
      render(
        <TestWrapper>
          <RegisterPage />
        </TestWrapper>
      );

      const submitButton = screen.getByRole('button', { name: /create account/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/first name must be at least 2 characters/i)).toBeInTheDocument();
        expect(screen.getByText(/last name must be at least 2 characters/i)).toBeInTheDocument();
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('should validate password confirmation match', async () => {
      render(
        <TestWrapper>
          <RegisterPage />
        </TestWrapper>
      );

      const passwordInput = screen.getByLabelText(/^password$/i);
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const submitButton = screen.getByRole('button', { name: /create account/i });

      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
      });
    });
  });
});
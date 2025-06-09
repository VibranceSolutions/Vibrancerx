import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import App from '../App';
import { AuthProvider } from '../contexts/AuthContext';

// Mock the useAuth hook
const mockUser = {
  id: '1',
  email: 'patient@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'patient' as const,
};

const mockAuthContext = {
  user: null,
  isLoading: false,
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
  resetPassword: vi.fn(),
};

// Mock the auth context
vi.mock('../hooks/useAuth', () => ({
  useAuth: () => mockAuthContext,
}));

// Mock the logActivity function
vi.mock('../lib/utils', () => ({
  logActivity: vi.fn(),
  generateSessionId: () => 'test-session-id',
  formatCurrency: (amount: number) => `$${amount}`,
  formatDate: (date: Date) => date.toLocaleDateString(),
  formatTime: (date: Date) => date.toLocaleTimeString(),
  formatDateTime: (date: Date) => `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`,
  getInitials: (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase(),
  cn: (...args: any[]) => args.join(' '),
}));

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode; initialEntries?: string[] }> = ({ 
  children, 
  initialEntries = ['/'] 
}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <AuthProvider>
      {children}
    </AuthProvider>
  </MemoryRouter>
);

describe('Routing Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuthContext.user = null;
    mockAuthContext.isLoading = false;
  });

  describe('Public Routes', () => {
    it('should render home page for unauthenticated users', () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      expect(screen.getByText(/Healthcare at Your Fingertips/i)).toBeInTheDocument();
    });

    it('should render login page when navigating to /login', () => {
      render(
        <TestWrapper initialEntries={['/login']}>
          <App />
        </TestWrapper>
      );

      expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
      expect(screen.getByText(/Sign in to access your account/i)).toBeInTheDocument();
    });

    it('should render register page when navigating to /register', () => {
      render(
        <TestWrapper initialEntries={['/register']}>
          <App />
        </TestWrapper>
      );

      expect(screen.getByText(/Create your account/i)).toBeInTheDocument();
      expect(screen.getByText(/Join our healthcare community/i)).toBeInTheDocument();
    });
  });

  describe('Patient Routes - Authentication Required', () => {
    beforeEach(() => {
      mockAuthContext.user = mockUser;
    });

    it('should redirect unauthenticated users to login when accessing patient routes', () => {
      mockAuthContext.user = null;
      
      render(
        <TestWrapper initialEntries={['/patient/dashboard']}>
          <App />
        </TestWrapper>
      );

      expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    });

    it('should render patient landing page for authenticated patient', () => {
      render(
        <TestWrapper initialEntries={['/patient/landing']}>
          <App />
        </TestWrapper>
      );

      expect(screen.getByText(/Welcome to MediConnect, John!/i)).toBeInTheDocument();
      expect(screen.getByText(/Your Health, Our Priority/i)).toBeInTheDocument();
    });

    it('should render patient dashboard for authenticated patient', () => {
      render(
        <TestWrapper initialEntries={['/patient/dashboard']}>
          <App />
        </TestWrapper>
      );

      expect(screen.getByText(/Welcome back, John!/i)).toBeInTheDocument();
      expect(screen.getByText(/How are you feeling today?/i)).toBeInTheDocument();
    });

    it('should render doctor directory when navigating to find-doctors', () => {
      render(
        <TestWrapper initialEntries={['/patient/find-doctors']}>
          <App />
        </TestWrapper>
      );

      expect(screen.getByText(/Find a Doctor/i)).toBeInTheDocument();
      expect(screen.getByText(/Browse our network of trusted medical professionals/i)).toBeInTheDocument();
    });

    it('should render appointments page', () => {
      render(
        <TestWrapper initialEntries={['/patient/appointments']}>
          <App />
        </TestWrapper>
      );

      expect(screen.getByText(/My Appointments/i)).toBeInTheDocument();
      expect(screen.getByText(/Manage your upcoming and past appointments/i)).toBeInTheDocument();
    });

    it('should render patient profile page', () => {
      render(
        <TestWrapper initialEntries={['/patient/profile']}>
          <App />
        </TestWrapper>
      );

      expect(screen.getByText(/Profile Settings/i)).toBeInTheDocument();
      expect(screen.getByText(/Manage your personal information and preferences/i)).toBeInTheDocument();
    });
  });

  describe('Role-based Access Control', () => {
    it('should redirect doctor to doctor landing when accessing patient routes', () => {
      mockAuthContext.user = {
        ...mockUser,
        role: 'doctor' as const,
        firstName: 'Sarah',
        lastName: 'Johnson',
      };

      render(
        <TestWrapper initialEntries={['/patient/dashboard']}>
          <App />
        </TestWrapper>
      );

      // Should be redirected to doctor landing page
      expect(screen.getByText(/Welcome back, Dr. Johnson!/i)).toBeInTheDocument();
    });

    it('should redirect admin to admin landing when accessing patient routes', () => {
      mockAuthContext.user = {
        ...mockUser,
        role: 'admin' as const,
        firstName: 'Admin',
        lastName: 'User',
      };

      render(
        <TestWrapper initialEntries={['/patient/dashboard']}>
          <App />
        </TestWrapper>
      );

      // Should be redirected to admin landing page
      expect(screen.getByText(/Admin Dashboard - Admin User/i)).toBeInTheDocument();
    });

    it('should redirect patient to patient landing when accessing doctor routes', () => {
      render(
        <TestWrapper initialEntries={['/doctor/dashboard']}>
          <App />
        </TestWrapper>
      );

      // Should be redirected to patient landing page
      expect(screen.getByText(/Welcome to MediConnect, John!/i)).toBeInTheDocument();
    });
  });

  describe('Navigation within Patient Layout', () => {
    beforeEach(() => {
      mockAuthContext.user = mockUser;
    });

    it('should navigate between patient pages using sidebar links', async () => {
      render(
        <TestWrapper initialEntries={['/patient/dashboard']}>
          <App />
        </TestWrapper>
      );

      // Should be on dashboard initially
      expect(screen.getByText(/Welcome back, John!/i)).toBeInTheDocument();

      // Click on Find Doctors link in sidebar
      const findDoctorsLink = screen.getByRole('link', { name: /Find Doctors/i });
      fireEvent.click(findDoctorsLink);

      await waitFor(() => {
        expect(screen.getByText(/Browse our network of trusted medical professionals/i)).toBeInTheDocument();
      });
    });

    it('should show active state for current route in sidebar', () => {
      render(
        <TestWrapper initialEntries={['/patient/appointments']}>
          <App />
        </TestWrapper>
      );

      const appointmentsLink = screen.getByRole('link', { name: /My Appointments/i });
      expect(appointmentsLink.closest('a')).toHaveClass('bg-primary', 'text-white');
    });
  });

  describe('404 Not Found', () => {
    it('should render 404 page for non-existent routes', () => {
      render(
        <TestWrapper initialEntries={['/non-existent-route']}>
          <App />
        </TestWrapper>
      );

      expect(screen.getByText('404')).toBeInTheDocument();
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    });
  });

  describe('Login Redirect Logic', () => {
    it('should redirect authenticated patient to patient landing from login page', () => {
      mockAuthContext.user = mockUser;

      render(
        <TestWrapper initialEntries={['/login']}>
          <App />
        </TestWrapper>
      );

      // Should be redirected to patient landing page
      expect(screen.getByText(/Welcome to MediConnect, John!/i)).toBeInTheDocument();
    });

    it('should redirect authenticated doctor to doctor landing from login page', () => {
      mockAuthContext.user = {
        ...mockUser,
        role: 'doctor' as const,
        firstName: 'Sarah',
        lastName: 'Johnson',
      };

      render(
        <TestWrapper initialEntries={['/login']}>
          <App />
        </TestWrapper>
      );

      // Should be redirected to doctor landing page
      expect(screen.getByText(/Welcome back, Dr. Johnson!/i)).toBeInTheDocument();
    });
  });

  describe('Nested Route Parameters', () => {
    beforeEach(() => {
      mockAuthContext.user = mockUser;
    });

    it('should handle book appointment route with doctor ID parameter', () => {
      render(
        <TestWrapper initialEntries={['/patient/book/doctor-123']}>
          <App />
        </TestWrapper>
      );

      expect(screen.getByText(/Book an Appointment/i)).toBeInTheDocument();
      expect(screen.getByText(/Schedule a consultation with Dr./i)).toBeInTheDocument();
    });

    it('should handle consultation route with appointment ID parameter', () => {
      render(
        <TestWrapper initialEntries={['/patient/consultation/appointment-456']}>
          <App />
        </TestWrapper>
      );

      expect(screen.getByText(/Consultation Info/i)).toBeInTheDocument();
    });
  });
});
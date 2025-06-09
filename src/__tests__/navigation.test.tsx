import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import PatientLayout from '../components/layouts/PatientLayout';
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
  user: mockUser,
  isLoading: false,
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
  resetPassword: vi.fn(),
};

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => mockAuthContext,
}));

// Mock the Outlet component to show which route is active
const MockOutlet = () => {
  const location = window.location.pathname;
  return <div data-testid="outlet">Current route: {location}</div>;
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: MockOutlet,
  };
});

const TestWrapper: React.FC<{ children: React.ReactNode; initialEntries?: string[] }> = ({ 
  children, 
  initialEntries = ['/patient/dashboard'] 
}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <AuthProvider>
      {children}
    </AuthProvider>
  </MemoryRouter>
);

describe('Patient Layout Navigation Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Sidebar Navigation', () => {
    it('should render all navigation items', () => {
      render(
        <TestWrapper>
          <PatientLayout />
        </TestWrapper>
      );

      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Find Doctors')).toBeInTheDocument();
      expect(screen.getByText('My Appointments')).toBeInTheDocument();
      expect(screen.getByText('Messages')).toBeInTheDocument();
      expect(screen.getByText('My Prescriptions')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should highlight active navigation item', () => {
      render(
        <TestWrapper initialEntries={['/patient/appointments']}>
          <PatientLayout />
        </TestWrapper>
      );

      const appointmentsLink = screen.getByRole('link', { name: /My Appointments/i });
      expect(appointmentsLink).toHaveClass('bg-primary', 'text-white');
    });

    it('should navigate to different sections when clicked', async () => {
      render(
        <TestWrapper>
          <PatientLayout />
        </TestWrapper>
      );

      // Click on Find Doctors
      const findDoctorsLink = screen.getByRole('link', { name: /Find Doctors/i });
      fireEvent.click(findDoctorsLink);

      await waitFor(() => {
        expect(window.location.pathname).toBe('/patient/find-doctors');
      });
    });
  });

  describe('Mobile Navigation', () => {
    it('should show mobile menu button on small screens', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 640,
      });

      render(
        <TestWrapper>
          <PatientLayout />
        </TestWrapper>
      );

      const menuButton = screen.getByRole('button', { name: /open main menu/i });
      expect(menuButton).toBeInTheDocument();
    });

    it('should toggle mobile sidebar when menu button is clicked', async () => {
      render(
        <TestWrapper>
          <PatientLayout />
        </TestWrapper>
      );

      const menuButton = screen.getByRole('button');
      fireEvent.click(menuButton);

      // Mobile sidebar should be visible
      await waitFor(() => {
        const mobileSidebar = screen.getByTestId('mobile-sidebar');
        expect(mobileSidebar).toHaveClass('translate-x-0');
      });
    });
  });

  describe('User Menu', () => {
    it('should display user information in header', () => {
      render(
        <TestWrapper>
          <PatientLayout />
        </TestWrapper>
      );

      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should show user dropdown when clicked', async () => {
      render(
        <TestWrapper>
          <PatientLayout />
        </TestWrapper>
      );

      const userButton = screen.getByRole('button', { name: /user menu/i });
      fireEvent.click(userButton);

      await waitFor(() => {
        expect(screen.getByText('Your Profile')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Sign out')).toBeInTheDocument();
      });
    });

    it('should call logout when sign out is clicked', async () => {
      render(
        <TestWrapper>
          <PatientLayout />
        </TestWrapper>
      );

      const userButton = screen.getByRole('button', { name: /user menu/i });
      fireEvent.click(userButton);

      await waitFor(() => {
        const signOutButton = screen.getByText('Sign out');
        fireEvent.click(signOutButton);
        expect(mockAuthContext.logout).toHaveBeenCalled();
      });
    });
  });

  describe('Notifications', () => {
    it('should show notification bell with badge', () => {
      render(
        <TestWrapper>
          <PatientLayout />
        </TestWrapper>
      );

      const notificationBell = screen.getByRole('button', { name: /notifications/i });
      expect(notificationBell).toBeInTheDocument();
      
      // Should show notification badge
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('should show notifications dropdown when bell is clicked', async () => {
      render(
        <TestWrapper>
          <PatientLayout />
        </TestWrapper>
      );

      const notificationBell = screen.getByRole('button', { name: /notifications/i });
      fireEvent.click(notificationBell);

      await waitFor(() => {
        expect(screen.getByText('Notifications')).toBeInTheDocument();
        expect(screen.getByText('Appointment Reminder')).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('should hide sidebar on mobile by default', () => {
      render(
        <TestWrapper>
          <PatientLayout />
        </TestWrapper>
      );

      const mobileSidebar = screen.getByTestId('mobile-sidebar');
      expect(mobileSidebar).toHaveClass('-translate-x-full');
    });

    it('should show desktop sidebar on larger screens', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      render(
        <TestWrapper>
          <PatientLayout />
        </TestWrapper>
      );

      const desktopSidebar = screen.getByTestId('desktop-sidebar');
      expect(desktopSidebar).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for navigation', () => {
      render(
        <TestWrapper>
          <PatientLayout />
        </TestWrapper>
      );

      const navigation = screen.getByRole('navigation');
      expect(navigation).toBeInTheDocument();
      
      // Check for proper link roles
      const dashboardLink = screen.getByRole('link', { name: /Dashboard/i });
      expect(dashboardLink).toBeInTheDocument();
    });

    it('should support keyboard navigation', async () => {
      render(
        <TestWrapper>
          <PatientLayout />
        </TestWrapper>
      );

      const dashboardLink = screen.getByRole('link', { name: /Dashboard/i });
      dashboardLink.focus();
      
      expect(document.activeElement).toBe(dashboardLink);
      
      // Tab to next link
      fireEvent.keyDown(dashboardLink, { key: 'Tab' });
      
      await waitFor(() => {
        const findDoctorsLink = screen.getByRole('link', { name: /Find Doctors/i });
        expect(document.activeElement).toBe(findDoctorsLink);
      });
    });
  });
});
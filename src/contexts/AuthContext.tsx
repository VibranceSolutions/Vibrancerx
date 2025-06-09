import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { logActivity } from '../lib/utils';

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  }) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('telemedicine_user');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('telemedicine_user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      // This would be an API call in a real implementation
      // Simulating authentication for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock response - in a real app this would come from a secure API
      let mockUser: User;
      
      if (email.includes('patient')) {
        mockUser = {
          id: '1',
          email,
          firstName: 'John',
          lastName: 'Doe',
          role: 'patient',
          profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        };
      } else if (email.includes('doctor')) {
        mockUser = {
          id: '2',
          email,
          firstName: 'Sarah',
          lastName: 'Smith',
          role: 'doctor',
          profileImage: 'https://randomuser.me/api/portraits/women/65.jpg',
        };
      } else if (email.includes('admin')) {
        mockUser = {
          id: '3',
          email,
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
        };
      } else {
        // Default to patient role for demo
        mockUser = {
          id: '4',
          email,
          firstName: 'Test',
          lastName: 'User',
          role: 'patient',
          profileImage: 'https://randomuser.me/api/portraits/women/32.jpg',
        };
      }
      
      setUser(mockUser);
      localStorage.setItem('telemedicine_user', JSON.stringify(mockUser));
      
      logActivity(
        mockUser.id, 
        'login', 
        'auth', 
        `User logged in: ${mockUser.role}`
      );
      
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials and try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  }): Promise<void> => {
    try {
      setIsLoading(true);
      
      // This would be an API call in a real implementation
      // Simulating registration for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
      };
      
      setUser(newUser);
      localStorage.setItem('telemedicine_user', JSON.stringify(newUser));
      
      logActivity(
        newUser.id, 
        'register', 
        'auth', 
        `New user registered: ${newUser.role}`
      );
      
      toast.success('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    if (user) {
      logActivity(
        user.id, 
        'logout', 
        'auth', 
        `User logged out: ${user.role}`
      );
    }
    
    localStorage.removeItem('telemedicine_user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      // This would be an API call in a real implementation
      // Simulating password reset for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success(`Password reset instructions sent to ${email}`);
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Failed to send password reset. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;
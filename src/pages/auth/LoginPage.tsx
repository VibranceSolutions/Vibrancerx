import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, AlertCircle } from 'lucide-react';

import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      
      // Determine redirect based on email for demo purposes
      let redirectPath = '/patient/landing';
      if (data.email.includes('doctor')) {
        redirectPath = '/doctor/landing';
      } else if (data.email.includes('admin')) {
        redirectPath = '/admin/landing';
      }
      
      navigate(redirectPath);
    } catch (error) {
      setError('root', {
        message: 'Invalid email or password. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">
            Sign in to access your account
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {errors.root?.message && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-700">{errors.root.message}</p>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              autoComplete="email"
              leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
              error={errors.email?.message}
              {...register('email')}
            />
            
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="text-primary hover:text-primary-dark">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Sign in
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:text-primary-dark font-medium">
              Sign up
            </Link>
          </p>
          <div className="mt-6 flex flex-col space-y-2">
            <p className="text-xs text-gray-500">
              For demo purposes, use any of these credentials:
            </p>
            <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-medium text-blue-600">Patient Account</p>
                <p>Email: patient@example.com</p>
                <p>Password: password123</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-medium text-green-600">Doctor Account</p>
                <p>Email: doctor@example.com</p>
                <p>Password: password123</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-medium text-purple-600">Admin Account</p>
                <p>Email: admin@example.com</p>
                <p>Password: password123</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Or use any email containing "patient", "doctor", or "admin"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
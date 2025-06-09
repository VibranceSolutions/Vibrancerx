import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock, UserCheck, AlertCircle } from 'lucide-react';

import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['patient', 'doctor'] as const),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'patient',
      agreeToTerms: false,
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role as UserRole,
      });
      
      // Redirect to role-specific dashboard (not landing page)
      navigate(`/${data.role}/dashboard`);
    } catch (error) {
      setError('root', {
        message: 'Registration failed. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">
            Join our healthcare community
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
          
          {/* Role Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              I am a:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                selectedRole === 'patient' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              }`}>
                <input
                  type="radio"
                  value="patient"
                  {...register('role')}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <User className={`h-5 w-5 mr-2 ${
                    selectedRole === 'patient' ? 'text-primary' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    selectedRole === 'patient' ? 'text-primary' : 'text-gray-900'
                  }`}>
                    Patient
                  </span>
                </div>
              </label>
              
              <label className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                selectedRole === 'doctor' 
                  ? 'border-secondary bg-secondary/5' 
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              }`}>
                <input
                  type="radio"
                  value="doctor"
                  {...register('role')}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <UserCheck className={`h-5 w-5 mr-2 ${
                    selectedRole === 'doctor' ? 'text-secondary' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    selectedRole === 'doctor' ? 'text-secondary' : 'text-gray-900'
                  }`}>
                    Doctor
                  </span>
                </div>
              </label>
            </div>
            {errors.role && (
              <p className="text-sm text-red-600">{errors.role.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              leftIcon={<User className="h-5 w-5 text-gray-400" />}
              error={errors.firstName?.message}
              {...register('firstName')}
            />
            
            <Input
              label="Last Name"
              leftIcon={<User className="h-5 w-5 text-gray-400" />}
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>
          
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
            autoComplete="new-password"
            leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
            error={errors.password?.message}
            helperText="Must be at least 8 characters"
            {...register('password')}
          />
          
          <Input
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <div className="flex items-center">
            <input
              id="agree-terms"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              {...register('agreeToTerms')}
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <Link to="/terms" className="text-primary hover:text-primary-dark">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary hover:text-primary-dark">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
          )}

          {selectedRole === 'doctor' && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Doctor Registration:</strong> Your account will be reviewed and verified 
                    before activation. You'll receive an email once your credentials are confirmed.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
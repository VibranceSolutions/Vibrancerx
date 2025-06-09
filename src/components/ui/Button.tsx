import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    disabled,
    leftIcon,
    rightIcon,
    children,
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-lg transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-primary hover:bg-primary-dark text-white focus-visible:ring-primary': variant === 'primary',
            'bg-secondary hover:bg-secondary-dark text-white focus-visible:ring-secondary': variant === 'secondary',
            'bg-accent hover:bg-accent-dark text-white focus-visible:ring-accent': variant === 'accent',
            'bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-700': variant === 'outline',
            'bg-transparent hover:bg-gray-100 text-gray-700': variant === 'ghost',
            'bg-transparent text-primary hover:underline p-0': variant === 'link',
            'bg-red-600 hover:bg-red-700 text-white focus-visible:ring-red-500': variant === 'danger',
            'text-sm px-3 py-1.5': size === 'sm',
            'text-base px-4 py-2': size === 'md',
            'text-lg px-6 py-3': size === 'lg',
          },
          className
        )}
        disabled={isLoading || disabled}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
            xmlns="http://www.w3.org/2000/svg"
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
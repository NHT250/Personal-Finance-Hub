import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'premium-gradient text-on-primary hover:opacity-90 active:scale-95',
      secondary: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 active:scale-95',
      tertiary: 'bg-transparent text-primary hover:bg-primary/5 active:scale-95',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-8 py-4 text-sm',
      lg: 'px-10 py-5 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

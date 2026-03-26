import React from 'react';
import { cn } from '../lib/utils';

interface ChipProps {
  children: React.ReactNode;
  variant?: 'income' | 'expense' | 'neutral';
  className?: string;
}

export const Chip = ({ children, variant = 'neutral', className }: ChipProps) => {
  const variants = {
    income: 'bg-primary/10 text-primary',
    expense: 'bg-tertiary/10 text-tertiary',
    neutral: 'bg-surface-container-low text-on-surface-variant',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

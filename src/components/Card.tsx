import React from 'react';
import { cn } from '../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'low' | 'lowest' | 'bright';
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, variant = 'lowest', ...props }) => {
  const variants = {
    low: 'bg-surface-container-low',
    lowest: 'bg-surface-container-lowest ambient-shadow',
    bright: 'bg-surface-bright ambient-shadow',
  };

  return (
    <div
      className={cn(
        'rounded-md p-spacing-4 transition-all duration-300',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

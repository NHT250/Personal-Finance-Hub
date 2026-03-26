import { cn } from '../lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'tertiary';
  className?: string;
}

export const Progress = ({ value, max = 100, variant = 'primary', className }: ProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full bg-surface-container-low h-3 rounded-full overflow-hidden', className)}>
      <div
        className={cn(
          'h-full rounded-full transition-all duration-500 ease-out',
          variant === 'primary' ? 'bg-primary' : 'bg-tertiary'
        )}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

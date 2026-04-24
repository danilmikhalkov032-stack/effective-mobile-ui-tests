import { cn } from '../lib/cn';

export function Button({ children, className, variant = 'primary', ...props }) {
  return (
    <button
      className={cn(
        'btn',
        variant === 'primary' ? 'btn-primary' : 'btn-secondary',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

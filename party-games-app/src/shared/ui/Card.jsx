import { cn } from '../lib/cn';

export function Card({ children, className }) {
  return <div className={cn('card', className)}>{children}</div>;
}

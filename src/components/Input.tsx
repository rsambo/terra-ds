import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, disabled, className = '', ...props }, ref) => {
    const base =
      'w-full font-body-md text-on-surface placeholder-on-surface-muted focus:outline-none focus:ring-2 focus:ring-focus-ring transition-colors';

    const state = disabled
      ? 'bg-neutral text-on-surface-muted rounded-md px-md py-sm'
      : error
      ? 'bg-surface-raised text-error rounded-md px-md py-sm'
      : 'bg-surface-raised text-on-surface rounded-md px-md py-sm focus:bg-surface-overlay';

    return <input ref={ref} disabled={disabled} className={`${base} ${state} ${className}`} {...props} />;
  }
);
Input.displayName = 'Input';

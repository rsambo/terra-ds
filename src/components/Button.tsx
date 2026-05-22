import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', disabled, className = '', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-body-md transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring';

    const variants = {
      primary: disabled
        ? 'bg-neutral text-on-surface-muted rounded-md px-md py-sm'
        : 'bg-primary text-on-primary rounded-md px-md py-sm hover:bg-primary-container hover:text-on-surface',
      secondary: disabled
        ? 'bg-neutral text-on-surface-muted rounded-md px-md py-sm'
        : 'bg-secondary text-on-secondary rounded-md px-md py-sm hover:bg-secondary-container hover:text-on-surface',
      ghost: disabled
        ? 'bg-neutral text-on-surface-muted rounded-md px-md py-sm'
        : 'bg-surface text-on-surface rounded-md px-md py-sm hover:bg-surface-raised',
      destructive: disabled
        ? 'bg-neutral text-on-surface-muted rounded-md px-md py-sm'
        : 'bg-error text-on-error rounded-md px-md py-sm',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

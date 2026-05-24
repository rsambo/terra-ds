import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ interactive, className = '', children, ...props }, ref) => {
    const base = 'bg-surface-raised text-on-surface rounded-lg p-md transition-colors';
    const state = interactive
      ? 'hover:bg-surface-overlay hover:shadow-raised cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring'
      : '';

    return (
      <div ref={ref} className={`${base} ${state} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

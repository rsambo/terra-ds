import React from 'react';

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-surface-content-raised text-on-content-muted rounded-md p-md font-content-body-md ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Callout.displayName = 'Callout';

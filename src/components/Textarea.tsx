import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, disabled, className = '', ...props }, ref) => {
    const base =
      'w-full font-body-md text-on-surface placeholder-on-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring resize-y';

    const state = disabled
      ? 'bg-neutral text-on-surface-muted rounded-md px-md py-sm'
      : error
      ? 'bg-surface-raised text-error rounded-md px-md py-sm'
      : 'bg-surface-raised text-on-surface rounded-md px-md py-sm focus:bg-surface-overlay';

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={`${base} ${state} ${className}`}
        style={{ minHeight: '80px' }}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

import React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';

export interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: 'default' | 'success' | 'error';
  title: string;
  description?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

export const Toast: React.FC<ToastProps> = ({
  open,
  onOpenChange,
  variant = 'default',
  title,
  description,
  duration = 4000,
  action,
}) => {
  const variantClass =
    variant === 'success'
      ? 'bg-primary text-on-primary'
      : variant === 'error'
      ? 'bg-error text-on-error'
      : 'bg-surface-overlay text-on-surface';

  return (
    <ToastPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      duration={duration}
      className={`rounded-lg px-md py-sm shadow-overlay flex items-start gap-md ${variantClass}`}
    >
      <div className="flex-1 min-w-0">
        <ToastPrimitive.Title className="font-label-lg">{title}</ToastPrimitive.Title>
        {description && (
          <ToastPrimitive.Description className="font-body-sm opacity-80 mt-xs">
            {description}
          </ToastPrimitive.Description>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className={`shrink-0 font-label-lg underline ${
            variant === 'default'
              ? 'text-on-surface hover:text-on-surface-muted'
              : 'text-inherit opacity-90 hover:opacity-100'
          }`}
        >
          {action.label}
        </button>
      )}
      <ToastPrimitive.Close
        aria-label="Close"
        className={`shrink-0 font-label-lg leading-none ${
          variant === 'default' ? 'text-on-surface-muted hover:text-on-surface' : 'opacity-70 hover:opacity-100'
        }`}
      >
        ×
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
};

export const ToastViewport: React.FC = () => (
  <ToastPrimitive.Viewport className="fixed bottom-md right-md flex flex-col gap-sm z-50" />
);

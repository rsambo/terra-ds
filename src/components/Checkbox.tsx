import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

export interface CheckboxProps {
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  disabled?: boolean;
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onCheckedChange, disabled, label }) => {
  const id = React.useId();
  return (
    <div className="flex items-center gap-sm">
      <CheckboxPrimitive.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={`w-4 h-4 rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring flex items-center justify-center ${disabled ? 'bg-neutral border-border-subtle opacity-60 cursor-not-allowed' : checked ? 'bg-primary border-primary' : 'bg-surface-raised border-border'}`}
      >
        <CheckboxPrimitive.Indicator>
          {checked === 'indeterminate' ? (
            <span className="block w-2 h-0.5 bg-on-primary rounded-full" />
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-on-primary">
              <path d="M1 5L3.5 7.5L9 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label htmlFor={id} className={`font-label-lg ${disabled ? 'text-on-surface-muted' : 'text-on-surface'}`}>
          {label}
        </label>
      )}
    </div>
  );
};

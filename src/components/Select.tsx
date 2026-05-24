import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => (
  <SelectPrimitive.Item
    value={value}
    className="relative font-body-md text-on-surface rounded-sm px-md py-sm cursor-pointer outline-none data-[highlighted]:bg-surface-raised data-[state=checked]:text-accent select-none"
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="absolute right-sm inline-flex items-center justify-center">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-accent">
        <path d="M1 5L3.5 7.5L9 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
);

export const Select: React.FC<SelectProps> = ({ value, onValueChange, placeholder, disabled, children }) => (
  <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
    <SelectPrimitive.Trigger
      className={`inline-flex items-center justify-between w-full font-body-md rounded-md px-md py-sm focus:outline-none focus:ring-2 focus:ring-focus-ring ${disabled ? 'bg-neutral text-on-surface-muted cursor-not-allowed' : 'bg-surface-raised text-on-surface hover:bg-surface-overlay data-[state=open]:bg-surface-overlay'}`}
    >
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon className="text-on-surface-muted ml-sm">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className="bg-surface-overlay rounded-md shadow-overlay p-xs min-w-[var(--radix-select-trigger-width)] z-50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-150"
        position="popper"
        sideOffset={4}
      >
        <SelectPrimitive.Viewport className="p-xs">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  </SelectPrimitive.Root>
);

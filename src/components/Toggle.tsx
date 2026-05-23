import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

export interface ToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onCheckedChange, disabled, label }) => {
  const id = React.useId();
  return (
    <div className="flex items-center gap-sm">
      <SwitchPrimitive.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={`w-11 h-6 rounded-full relative transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring data-[state=checked]:bg-primary data-[state=unchecked]:bg-surface ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <SwitchPrimitive.Thumb
          className="block w-5 h-5 bg-on-primary rounded-full transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5 shadow-raised"
        />
      </SwitchPrimitive.Root>
      {label && (
        <label htmlFor={id} className={`font-label-lg ${disabled ? 'text-on-surface-muted' : 'text-on-surface'}`}>
          {label}
        </label>
      )}
    </div>
  );
};

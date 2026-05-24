import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  destructive?: boolean;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, children }) => (
  <DropdownMenuPrimitive.Root>
    <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className="bg-surface-overlay rounded-md shadow-overlay p-xs min-w-[160px] z-50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-150"
        sideOffset={4}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  </DropdownMenuPrimitive.Root>
);

export const DropdownMenuItem = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Item>, DropdownMenuItemProps>(
  ({ destructive, className = '', children, disabled, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      disabled={disabled}
      className={`font-body-md rounded-sm px-md py-sm cursor-pointer outline-none transition-colors data-[highlighted]:bg-surface-raised ${destructive ? 'text-error data-[highlighted]:bg-surface-raised' : 'text-on-surface'} ${disabled ? 'text-on-surface-muted opacity-50 pointer-events-none' : ''} ${className}`}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  )
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

export const DropdownMenuSeparator = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>>(
  ({ className = '', ...props }, ref) => (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={`border-t border-border-subtle my-xs ${className}`}
      {...props}
    />
  )
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

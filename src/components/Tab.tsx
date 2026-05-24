import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export interface TabProps {
  value: string;
  children: React.ReactNode;
}

export const TabList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className = '', ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`inline-flex items-center gap-xs bg-surface rounded-md p-xs ${className}`}
    {...props}
  />
));
TabList.displayName = 'TabList';

export const Tab = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className = '', ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={`inline-flex items-center justify-center font-label-lg rounded-sm px-md py-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring data-[state=active]:bg-surface-raised data-[state=active]:text-on-surface text-on-surface-muted hover:bg-surface-raised hover:text-on-surface ${className}`}
    {...props}
  />
));
Tab.displayName = 'Tab';

export const TabContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className = '', ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={`mt-sm focus:outline-none ${className}`}
    {...props}
  />
));
TabContent.displayName = 'TabContent';

export const TabsRoot = TabsPrimitive.Root;

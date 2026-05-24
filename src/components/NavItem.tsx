import React from 'react';

export interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  onClick?: () => void;
}

export const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ active, onClick, className = '', children, href, ...props }, ref) => {
    const base = 'inline-flex items-center font-label-lg rounded-sm px-md py-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring';

    const state = active
      ? 'bg-accent text-on-accent'
      : 'bg-surface text-on-surface-muted hover:bg-surface-raised hover:text-on-surface';

    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        className={`${base} ${state} ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }
);
NavItem.displayName = 'NavItem';

import React, { useState } from 'react';
import { NavItem } from './NavItem';
import { Tooltip } from './Tooltip';

export interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  collapsed?: boolean;
}

export interface SidebarSectionProps {
  label?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  icon?: React.ReactNode;
  indent?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({
  label,
  children,
  collapsible,
  defaultCollapsed,
}) => {
  const [open, setOpen] = useState(!defaultCollapsed);
  return (
    <div className="flex flex-col">
      {label && (
        <button
          onClick={() => collapsible && setOpen(!open)}
          className={`flex items-center justify-between font-label-sm text-on-surface-muted uppercase tracking-wide px-md py-xs ${collapsible ? 'cursor-pointer hover:text-on-surface' : ''}`}
        >
          <span>{label}</span>
          {collapsible && (
            <span className={`text-on-surface-muted transition-transform ${open ? 'rotate-90' : ''}`}>
              ›
            </span>
          )}
        </button>
      )}
      {(!collapsible || open) && <div className="flex flex-col">{children}</div>}
    </div>
  );
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
  active,
  icon,
  indent,
  onClick,
  href,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex items-center ${indent ? 'pl-xl' : ''}`}>
      {icon && (
        <span className={`mr-sm ${active ? 'text-on-accent' : 'text-on-surface-muted'}`}>
          {icon}
        </span>
      )}
      <NavItem
        active={active}
        onClick={onClick}
        href={href}
        className={`flex-1 ${className}`}
        {...props}
      >
        {children}
      </NavItem>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ children, className = '', collapsed }) => {
  return (
    <aside
      className={`bg-surface flex flex-col h-full border-r border-border-subtle overflow-y-auto ${collapsed ? 'w-14' : 'w-60'} ${className}`}
    >
      <div className="flex flex-col gap-sm py-md">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          if (child.type === SidebarSection) {
            return (
              <SidebarSection
                {...child.props}
                label={collapsed ? undefined : child.props.label}
              />
            );
          }
          if (child.type === SidebarItem && collapsed) {
            const itemProps = child.props as SidebarItemProps;
            return (
              <div className="flex justify-center py-sm">
                <Tooltip content={typeof itemProps.children === 'string' ? itemProps.children : ''} side="right">
                  <span className={`cursor-pointer ${itemProps.active ? 'text-on-accent' : 'text-on-surface-muted'}`}>
                    {itemProps.icon || <span className="w-4 h-4 block" />}
                  </span>
                </Tooltip>
              </div>
            );
          }
          return child;
        })}
      </div>
    </aside>
  );
};

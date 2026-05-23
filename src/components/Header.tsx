import React from 'react';
import { Breadcrumb } from './Breadcrumb';

export interface HeaderProps {
  title?: React.ReactNode;
  breadcrumb?: { label: string; href?: string; onClick?: () => void }[];
  actions?: React.ReactNode;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, breadcrumb, actions, className = '' }) => {
  return (
    <header className={`bg-surface-raised border-b border-border-subtle ${className}`}>
      <div className="flex items-center justify-between px-lg py-sm h-14">
        <div className="flex items-center min-w-0">
          {breadcrumb ? (
            <Breadcrumb items={breadcrumb} />
          ) : title ? (
            <h1 className="font-heading-sm text-on-surface truncate">{title}</h1>
          ) : null}
        </div>
        {actions && <div className="flex items-center gap-sm flex-shrink-0">{actions}</div>}
      </div>
    </header>
  );
};

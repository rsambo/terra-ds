import React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`bg-surface rounded-lg p-2xl flex flex-col items-center text-center ${className}`}>
      {icon && (
        <div className="w-12 h-12 text-on-surface-muted mb-md flex items-center justify-center">
          {icon}
        </div>
      )}
      <h3 className="font-heading-sm text-on-surface mb-xs">{title}</h3>
      {description && (
        <p className="font-body-md text-on-surface-muted max-w-xs mb-lg">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
};

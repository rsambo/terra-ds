import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'error';
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', className = '', children, ...props }) => {
  const base = 'inline-flex items-center justify-center font-label-sm rounded-full px-xs py-2xs';

  const variants = {
    default: 'bg-secondary text-on-secondary',
    accent: 'bg-accent-container text-on-accent',
    error: 'bg-error text-on-error',
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

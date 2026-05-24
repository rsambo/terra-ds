import React from 'react';

export interface SkipLinkProps {
  href?: string;
  children?: React.ReactNode;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  href = '#main-content',
  children = 'Skip to main content',
}) => {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:fixed focus:top-sm focus:left-sm focus:z-50 focus:bg-primary focus:text-on-primary focus:rounded-md focus:px-md focus:py-sm focus:font-label-lg focus:shadow-overlay"
    >
      {children}
    </a>
  );
};

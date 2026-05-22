import React from 'react';

export interface ContentPageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ContentPage = React.forwardRef<HTMLDivElement, ContentPageProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-surface-content text-on-content rounded-none p-lg font-content-body-md max-w-prose mx-auto ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ContentPage.displayName = 'ContentPage';

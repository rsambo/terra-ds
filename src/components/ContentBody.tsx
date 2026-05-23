import React from 'react';

export interface ContentBodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'md' | 'lg';
}

export const ContentBody = React.forwardRef<HTMLParagraphElement, ContentBodyProps>(
  ({ size = 'md', className = '', children, ...props }, ref) => {
    const sizeClass = size === 'lg' ? 'font-content-body-lg' : 'font-content-body-md';
    const leading = size === 'lg' ? 'leading-[1.75]' : 'leading-[1.6]';
    return (
      <p ref={ref} className={`${sizeClass} ${leading} text-on-content ${className}`} {...props}>
        {children}
      </p>
    );
  }
);
ContentBody.displayName = 'ContentBody';

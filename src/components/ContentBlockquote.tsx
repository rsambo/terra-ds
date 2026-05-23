import React from 'react';

export interface ContentBlockquoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode;
}

export const ContentBlockquote = React.forwardRef<HTMLQuoteElement, ContentBlockquoteProps>(
  ({ className = '', children, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={`font-content-blockquote italic text-on-content border-l-2 border-border pl-md ${className}`}
      {...props}
    >
      {children}
    </blockquote>
  )
);
ContentBlockquote.displayName = 'ContentBlockquote';

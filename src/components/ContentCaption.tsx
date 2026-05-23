import React from 'react';

export interface ContentCaptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const ContentCaption = React.forwardRef<HTMLParagraphElement, ContentCaptionProps>(
  ({ className = '', children, ...props }, ref) => (
    <p
      ref={ref}
      className={`font-content-caption italic text-on-content-muted ${className}`}
      {...props}
    >
      {children}
    </p>
  )
);
ContentCaption.displayName = 'ContentCaption';

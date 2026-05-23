import React from 'react';

export interface ContentHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
}

export const ContentHeading = React.forwardRef<HTMLHeadingElement, ContentHeadingProps>(
  ({ level = 1, className = '', children, ...props }, ref) => {
    const Tag = `h${level}` as const;
    const sizeMap: Record<number, string> = {
      1: 'font-content-heading-lg text-on-content',
      2: 'font-content-heading-md text-on-content',
      3: 'font-content-heading-sm text-on-content',
      4: 'font-content-heading-sm text-on-content',
    };
    return (
      <Tag ref={ref} className={`${sizeMap[level]} ${className}`} {...props}>
        {children}
      </Tag>
    );
  }
);
ContentHeading.displayName = 'ContentHeading';

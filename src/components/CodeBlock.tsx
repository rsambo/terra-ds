import React from 'react';

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  language?: string;
  children: React.ReactNode;
}

export const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ language, className = '', children, ...props }, ref) => (
    <div className="relative">
      {language && (
        <span className="absolute top-sm right-sm font-label-sm text-on-surface-muted">
          {language}
        </span>
      )}
      <pre
        ref={ref}
        className={`bg-surface rounded-md p-md overflow-x-auto font-code-md text-on-surface leading-[1.5] ${className}`}
        {...props}
      >
        <code>{children}</code>
      </pre>
    </div>
  )
);
CodeBlock.displayName = 'CodeBlock';

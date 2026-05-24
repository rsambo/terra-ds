import React from 'react';

export interface AppShellProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  header,
  sidebar,
  children,
  className = '',
}) => {
  return (
    <div className={`flex flex-col h-screen bg-surface ${className}`}>
      {header && <div className="flex-shrink-0">{header}</div>}
      <div className="flex flex-1 overflow-hidden">
        {sidebar && (
          <div className="flex-shrink-0 h-full overflow-hidden">
            {sidebar}
          </div>
        )}
        <main id="main-content" className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

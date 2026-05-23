import React from 'react';

export interface BreadcrumbProps {
  items: { label: string; href?: string; onClick?: () => void }[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="breadcrumb" className={className}>
      <ol className="flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                <span
                  className="font-label-sm text-on-surface"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  {item.href ? (
                    <a
                      href={item.href}
                      onClick={item.onClick}
                      className="font-label-sm text-on-surface-muted hover:text-on-surface transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="font-label-sm text-on-surface-muted hover:text-on-surface transition-colors"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <span className="font-label-sm text-on-surface-muted">
                      {item.label}
                    </span>
                  )}
                  <span className="text-on-surface-muted mx-xs" aria-hidden="true">
                    ›
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

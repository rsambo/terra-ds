import React, { useState, useRef, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  children: React.ReactNode;
}

export interface CommandMenuSectionProps {
  label?: string;
  children: React.ReactNode;
}

export interface CommandMenuItemProps {
  onSelect: () => void;
  icon?: React.ReactNode;
  shortcut?: string;
  children: React.ReactNode;
}

export const CommandMenuItem: React.FC<CommandMenuItemProps> = ({ onSelect, icon, shortcut, children }) => {
  return (
    <div
      onClick={onSelect}
      className="flex items-center gap-sm font-body-md text-on-surface rounded-sm px-md py-sm cursor-pointer outline-none transition-colors data-[highlighted]:bg-surface-raised"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSelect();
      }}
    >
      {icon && <span className="text-on-surface-muted">{icon}</span>}
      <span className="flex-1">{children}</span>
      {shortcut && <span className="font-label-sm text-on-surface-muted">{shortcut}</span>}
    </div>
  );
};

export const CommandMenuSection: React.FC<CommandMenuSectionProps> = ({ label, children }) => (
  <div className="mt-xs">
    {label && (
      <div className="font-label-sm text-on-surface-muted uppercase px-md py-xs">
        {label}
      </div>
    )}
    <div className="flex flex-col">{children}</div>
  </div>
);

export const CommandMenu: React.FC<CommandMenuProps> = ({ open, onOpenChange, placeholder = 'Search…', children }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed top-[20vh] left-1/2 -translate-x-1/2 bg-surface-overlay rounded-lg shadow-overlay w-full max-w-xl overflow-hidden focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          onKeyDown={(e) => {
            if (e.key === 'Escape') onOpenChange(false);
          }}
        >
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full font-body-lg text-on-surface placeholder-on-surface-muted px-lg py-md outline-none border-b border-border-subtle bg-transparent"
          />
          <div className="max-h-80 overflow-y-auto py-sm">
            {query ? (
              <div className="px-lg py-md font-body-md text-on-surface-muted">
                No results for “{query}”
              </div>
            ) : (
              children
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

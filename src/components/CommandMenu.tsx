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

export const CommandMenuItem = React.forwardRef<HTMLDivElement, CommandMenuItemProps>(
  ({ onSelect, icon, shortcut, children }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onSelect}
        className="flex items-center gap-sm font-body-md text-on-surface rounded-sm px-md py-sm cursor-pointer outline-none transition-colors hover:bg-surface-raised focus:bg-surface-raised focus:outline-none"
        role="option"
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSelect();
        }}
      >
        {icon && <span className="text-on-surface-muted">{icon}</span>}
        <span className="flex-1">{children}</span>
        {shortcut && <span className="font-label-sm text-on-surface-muted">{shortcut}</span>}
      </div>
    );
  }
);
CommandMenuItem.displayName = 'CommandMenuItem';

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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const flatChildren = React.useMemo(() => {
    const items: React.ReactElement[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === CommandMenuSection) {
        React.Children.forEach(child.props.children, (sectionChild) => {
          if (React.isValidElement(sectionChild) && sectionChild.type === CommandMenuItem) {
            items.push(sectionChild);
          }
        });
      } else if (React.isValidElement(child) && child.type === CommandMenuItem) {
        items.push(child);
      }
    });
    return items;
  }, [children]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setFocusedIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setFocusedIndex(-1);
    }
  }, [open]);

  useEffect(() => {
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const count = flatChildren.length;
    if (count === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % count);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev <= 0 ? count - 1 : prev - 1));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      const item = flatChildren[focusedIndex];
      if (item && item.props.onSelect) {
        item.props.onSelect();
      }
      onOpenChange(false);
    }
  };

  let itemIndex = 0;
  const childrenWithRefs = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if (child.type === CommandMenuSection) {
      const sectionChildren = React.Children.map(child.props.children, (sectionChild) => {
        if (!React.isValidElement(sectionChild) || sectionChild.type !== CommandMenuItem) return sectionChild;
        const index = itemIndex++;
        return React.cloneElement(sectionChild as React.ReactElement<any>, {
          ref: (el: HTMLDivElement | null) => {
            itemRefs.current[index] = el;
          },
        });
      });
      return React.cloneElement(child, { children: sectionChildren });
    }
    if (child.type === CommandMenuItem) {
      const index = itemIndex++;
      return React.cloneElement(child as React.ReactElement<any>, {
        ref: (el: HTMLDivElement | null) => {
          itemRefs.current[index] = el;
        },
      });
    }
    return child;
  });

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed top-[20vh] left-1/2 -translate-x-1/2 bg-surface-overlay rounded-lg shadow-overlay w-full max-w-xl overflow-hidden focus-visible:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 motion-reduce:animate-none"
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
          <div
            className="max-h-80 overflow-y-auto py-sm"
            role="listbox"
            aria-label="Commands"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            {React.Children.count(children) === 0 ? (
              <div className="px-lg py-md font-body-md text-on-surface-muted">
                No results
              </div>
            ) : (
              childrenWithRefs
            )}
          </div>
          <div className="sr-only" aria-live="polite">
            {React.Children.count(children)} results
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

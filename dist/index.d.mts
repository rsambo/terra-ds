import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'accent' | 'error';
}
declare const Badge: React.FC<BadgeProps>;

interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    active?: boolean;
    onClick?: () => void;
}
declare const NavItem: React.ForwardRefExoticComponent<NavItemProps & React.RefAttributes<HTMLAnchorElement>>;

declare const TabList: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsListProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const Tab: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const TabContent: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const TabsRoot: React.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>>;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    interactive?: boolean;
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: React.ReactNode;
    children: React.ReactNode;
}
declare const Dialog: React.FC<DialogProps>;

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
    role: 'user' | 'assistant';
}
declare const ChatBubble: React.ForwardRefExoticComponent<ChatBubbleProps & React.RefAttributes<HTMLDivElement>>;

interface ContentPageProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
declare const ContentPage: React.ForwardRefExoticComponent<ContentPageProps & React.RefAttributes<HTMLDivElement>>;

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
declare const Callout: React.ForwardRefExoticComponent<CalloutProps & React.RefAttributes<HTMLDivElement>>;

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

interface ToggleProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
}
declare const Toggle: React.FC<ToggleProps>;

interface CheckboxProps {
    checked?: boolean | 'indeterminate';
    onCheckedChange?: (checked: boolean | 'indeterminate') => void;
    disabled?: boolean;
    label?: string;
}
declare const Checkbox: React.FC<CheckboxProps>;

interface SelectProps {
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    children: React.ReactNode;
}
interface SelectItemProps {
    value: string;
    children: React.ReactNode;
}
declare const SelectItem: React.FC<SelectItemProps>;
declare const Select: React.FC<SelectProps>;

interface DropdownMenuProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
}
interface DropdownMenuItemProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
    destructive?: boolean;
}
declare const DropdownMenu: React.FC<DropdownMenuProps>;
declare const DropdownMenuItem: React.ForwardRefExoticComponent<DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

interface ContentHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: 1 | 2 | 3 | 4;
}
declare const ContentHeading: React.ForwardRefExoticComponent<ContentHeadingProps & React.RefAttributes<HTMLHeadingElement>>;

interface ContentBodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
    size?: 'md' | 'lg';
}
declare const ContentBody: React.ForwardRefExoticComponent<ContentBodyProps & React.RefAttributes<HTMLParagraphElement>>;

interface ContentBlockquoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
    children: React.ReactNode;
}
declare const ContentBlockquote: React.ForwardRefExoticComponent<ContentBlockquoteProps & React.RefAttributes<HTMLQuoteElement>>;

interface ContentCaptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
}
declare const ContentCaption: React.ForwardRefExoticComponent<ContentCaptionProps & React.RefAttributes<HTMLParagraphElement>>;

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
    language?: string;
    children: React.ReactNode;
}
declare const CodeBlock: React.ForwardRefExoticComponent<CodeBlockProps & React.RefAttributes<HTMLPreElement>>;

interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    delayDuration?: number;
}
declare const Tooltip: React.FC<TooltipProps>;

interface BreadcrumbProps {
    items: {
        label: string;
        href?: string;
        onClick?: () => void;
    }[];
    className?: string;
}
declare const Breadcrumb: React.FC<BreadcrumbProps>;

interface HeaderProps {
    title?: React.ReactNode;
    breadcrumb?: {
        label: string;
        href?: string;
        onClick?: () => void;
    }[];
    actions?: React.ReactNode;
    className?: string;
}
declare const Header: React.FC<HeaderProps>;

interface SidebarProps {
    children: React.ReactNode;
    className?: string;
    collapsed?: boolean;
}
interface SidebarSectionProps {
    label?: string;
    children: React.ReactNode;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
}
interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    active?: boolean;
    icon?: React.ReactNode;
    indent?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}
declare const SidebarSection: React.FC<SidebarSectionProps>;
declare const SidebarItem: React.FC<SidebarItemProps>;
declare const Sidebar: React.FC<SidebarProps>;

interface AppShellProps {
    header?: React.ReactNode;
    sidebar?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}
declare const AppShell: React.FC<AppShellProps>;

interface CommandMenuProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    placeholder?: string;
    children: React.ReactNode;
}
interface CommandMenuSectionProps {
    label?: string;
    children: React.ReactNode;
}
interface CommandMenuItemProps {
    onSelect: () => void;
    icon?: React.ReactNode;
    shortcut?: string;
    children: React.ReactNode;
}
declare const CommandMenuItem: React.FC<CommandMenuItemProps>;
declare const CommandMenuSection: React.FC<CommandMenuSectionProps>;
declare const CommandMenu: React.FC<CommandMenuProps>;

interface AvatarProps {
    src?: string;
    alt?: string;
    initials?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    muted?: boolean;
    className?: string;
}
declare const Avatar: React.FC<AvatarProps>;
interface AvatarGroupProps {
    avatars: Pick<AvatarProps, 'src' | 'alt' | 'initials'>[];
    max?: number;
    size?: AvatarProps['size'];
}
declare const AvatarGroup: React.FC<AvatarGroupProps>;

interface ToastProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    variant?: 'default' | 'success' | 'error';
    title: string;
    description?: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}
declare const Toast: React.FC<ToastProps>;
declare const ToastViewport: React.FC;

interface ToastItem extends Omit<ToastProps, 'open' | 'onOpenChange'> {
    id: string;
}
declare function useToast(): {
    toasts: ToastItem[];
    toast: (options: Omit<ToastProps, "open" | "onOpenChange">) => void;
    dismiss: (id: string) => void;
};

interface SkeletonProps {
    width?: string;
    height?: string;
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
    className?: string;
}
declare const Skeleton: React.FC<SkeletonProps>;
interface SkeletonTextProps {
    lines?: number;
    lastLineWidth?: string;
}
declare const SkeletonText: React.FC<SkeletonTextProps>;

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}
declare const EmptyState: React.FC<EmptyStateProps>;

interface Column<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    width?: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
}
interface DataTableProps<T extends {
    id: string | number;
}> {
    columns: Column<T>[];
    rows: T[];
    selectable?: boolean;
    selectedIds?: (string | number)[];
    onSelectionChange?: (ids: (string | number)[]) => void;
    sortKey?: keyof T;
    sortDirection?: 'asc' | 'desc';
    onSort?: (key: keyof T) => void;
    emptyState?: React.ReactNode;
    className?: string;
}
declare const DataTableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>>;
declare const DataTableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>>;
declare const DataTableHeader: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>>;
declare function DataTable<T extends {
    id: string | number;
}>({ columns, rows, selectable, selectedIds, onSelectionChange, sortKey, sortDirection, onSort, emptyState, className, }: DataTableProps<T>): react_jsx_runtime.JSX.Element;

export { AppShell, type AppShellProps, Avatar, AvatarGroup, type AvatarGroupProps, type AvatarProps, Badge, type BadgeProps, Breadcrumb, type BreadcrumbProps, Button, type ButtonProps, Callout, type CalloutProps, Card, type CardProps, ChatBubble, type ChatBubbleProps, Checkbox, type CheckboxProps, CodeBlock, type CodeBlockProps, type Column, CommandMenu, CommandMenuItem, type CommandMenuItemProps, type CommandMenuProps, CommandMenuSection, type CommandMenuSectionProps, ContentBlockquote, type ContentBlockquoteProps, ContentBody, type ContentBodyProps, ContentCaption, type ContentCaptionProps, ContentHeading, type ContentHeadingProps, ContentPage, type ContentPageProps, DataTable, DataTableCell, DataTableHeader, type DataTableProps, DataTableRow, Dialog, type DialogProps, DropdownMenu, DropdownMenuItem, type DropdownMenuItemProps, type DropdownMenuProps, DropdownMenuSeparator, EmptyState, type EmptyStateProps, Header, type HeaderProps, Input, type InputProps, NavItem, type NavItemProps, Select, SelectItem, type SelectItemProps, type SelectProps, Sidebar, SidebarItem, type SidebarItemProps, type SidebarProps, SidebarSection, type SidebarSectionProps, Skeleton, type SkeletonProps, SkeletonText, type SkeletonTextProps, Tab, TabContent, TabList, TabsRoot, Textarea, type TextareaProps, Toast, type ToastProps, ToastViewport, Toggle, type ToggleProps, Tooltip, type TooltipProps, useToast };

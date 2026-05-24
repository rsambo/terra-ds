import React from 'react';
import { Checkbox } from './Checkbox';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataTableProps<T extends { id: string | number }> {
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

export const DataTableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <td className={`px-md py-sm font-body-md text-on-surface ${className}`} {...props}>
    {children}
  </td>
);

export const DataTableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <tr className={`border-b border-border-subtle transition-colors ${className}`} {...props}>
    {children}
  </tr>
);

export const DataTableHeader: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <th
    scope="col"
    className={`px-md py-sm font-label-lg text-on-surface-muted text-left ${className}`}
    {...props}
  >
    {children}
  </th>
);

export function DataTable<T extends { id: string | number }>({
  columns,
  rows,
  selectable,
  selectedIds = [],
  onSelectionChange,
  sortKey,
  sortDirection,
  onSort,
  emptyState,
  className = '',
}: DataTableProps<T>) {
  const allSelected = rows.length > 0 && rows.every((row) => selectedIds.includes(row.id));
  const someSelected = rows.some((row) => selectedIds.includes(row.id)) && !allSelected;

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(rows.map((row) => row.id));
    }
  };

  const handleSelectRow = (id: string | number) => {
    if (!onSelectionChange) return;
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((sid) => sid !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const colCount = selectable ? columns.length + 1 : columns.length;

  return (
    <div className={`overflow-x-auto rounded-lg border border-border-subtle ${className}`}>
      <table className="w-full border-collapse">
        <thead className="bg-surface">
          <DataTableRow>
            {selectable && (
              <DataTableHeader className="w-12">
                <Checkbox
                  checked={someSelected ? 'indeterminate' : allSelected}
                  onCheckedChange={handleSelectAll}
                />
              </DataTableHeader>
            )}
            {columns.map((col) => {
              const isSorted = sortKey === col.key;
              return (
                <DataTableHeader
                  key={String(col.key)}
                  className={col.sortable ? 'cursor-pointer hover:text-on-surface transition-colors' : ''}
                  onClick={() => col.sortable && onSort?.(col.key)}
                  aria-sort={isSorted ? (sortDirection === 'asc' ? 'ascending' : 'descending') : undefined}
                  style={col.width ? { width: col.width } : undefined}
                >
                  <div className="flex items-center gap-xs">
                    {col.label}
                    {col.sortable && (
                      <span className={isSorted ? 'text-accent' : 'text-on-surface-muted'}>
                        {isSorted ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
                      </span>
                    )}
                  </div>
                </DataTableHeader>
              );
            })}
          </DataTableRow>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <DataTableRow>
              <td colSpan={colCount} className="px-md py-2xl text-center">
                {emptyState || (
                  <span className="font-body-md text-on-surface-muted">No results</span>
                )}
              </td>
            </DataTableRow>
          ) : (
            rows.map((row) => {
              const isSelected = selectedIds.includes(row.id);
              return (
                <DataTableRow
                  key={row.id}
                  className={`bg-surface-raised text-on-surface hover:bg-surface-overlay ${
                    isSelected ? 'bg-accent-container' : ''
                  }`}
                >
                  {selectable && (
                    <DataTableCell className="w-12">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleSelectRow(row.id)}
                      />
                    </DataTableCell>
                  )}
                  {columns.map((col) => {
                    const value = row[col.key];
                    return (
                      <DataTableCell key={String(col.key)}>
                        {col.render ? col.render(value, row) : String(value ?? '')}
                      </DataTableCell>
                    );
                  })}
                </DataTableRow>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

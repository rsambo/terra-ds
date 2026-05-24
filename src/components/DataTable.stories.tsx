import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DataTable } from './DataTable';
import { EmptyState } from './EmptyState';
import { Button } from './Button';
import { Avatar } from './Avatar';
import { Badge } from './Badge';

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  title: 'Data/DataTable',
};
export default meta;

type Story = StoryObj<typeof DataTable>;

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'Away' | 'Offline';
  lastActive: string;
}

const teamData: TeamMember[] = [
  { id: '1', name: 'Robin Sambo', role: 'Product Designer', department: 'Design', status: 'Active', lastActive: '2 min ago' },
  { id: '2', name: 'Maya Chen', role: 'Engineering Lead', department: 'Engineering', status: 'Active', lastActive: '15 min ago' },
  { id: '3', name: 'James Wilson', role: 'Content Strategist', department: 'Marketing', status: 'Away', lastActive: '1 hr ago' },
  { id: '4', name: 'Aisha Patel', role: 'Frontend Engineer', department: 'Engineering', status: 'Active', lastActive: '5 min ago' },
  { id: '5', name: 'Leo Martinez', role: 'UX Researcher', department: 'Design', status: 'Offline', lastActive: '3 days ago' },
  { id: '6', name: 'Sarah Kim', role: 'Product Manager', department: 'Product', status: 'Active', lastActive: '30 min ago' },
  { id: '7', name: 'David Okafor', role: 'Backend Engineer', department: 'Engineering', status: 'Away', lastActive: '2 hr ago' },
  { id: '8', name: 'Emily Zhang', role: 'Data Analyst', department: 'Analytics', status: 'Active', lastActive: '10 min ago' },
];

export const Basic: Story = {
  render: () => (
    <DataTable
      columns={[
        { key: 'name', label: 'Name', sortable: true },
        { key: 'role', label: 'Role' },
        { key: 'department', label: 'Department', sortable: true },
        { key: 'status', label: 'Status' },
        { key: 'lastActive', label: 'Last Active' },
      ]}
      rows={teamData}
    />
  ),
};

export const WithCustomCells: Story = {
  render: () => (
    <DataTable
      columns={[
        {
          key: 'name',
          label: 'Name',
          render: (value) => (
            <div className="flex items-center gap-sm">
              <Avatar alt={String(value)} size="sm" />
              <span className="font-body-md text-on-surface">{String(value)}</span>
            </div>
          ),
        },
        { key: 'role', label: 'Role' },
        { key: 'department', label: 'Department' },
        {
          key: 'status',
          label: 'Status',
          render: (value) => (
            <Badge variant={value === 'Active' ? 'accent' : value === 'Away' ? 'default' : 'error'}>
              {String(value)}
            </Badge>
          ),
        },
        { key: 'lastActive', label: 'Last Active' },
      ]}
      rows={teamData}
    />
  ),
};

export const Selectable: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<(string | number)[]>(['2', '4']);
    return (
      <DataTable
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        columns={[
          { key: 'name', label: 'Name', sortable: true },
          { key: 'role', label: 'Role' },
          { key: 'department', label: 'Department' },
          { key: 'status', label: 'Status' },
        ]}
        rows={teamData}
      />
    );
  },
};

export const Empty: Story = {
  render: () => (
    <DataTable
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'department', label: 'Department' },
      ]}
      rows={[]}
      emptyState={
        <EmptyState
          icon={
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          title="No team members"
          description="Invite colleagues to collaborate on this project."
          action={<Button variant="primary">Invite People</Button>}
        />
      }
    />
  ),
};

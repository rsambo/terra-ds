import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Button } from './Button';
import { DataTable } from './DataTable';

const meta: Meta<typeof EmptyState> = {
  component: EmptyState,
  title: 'Feedback/EmptyState',
};
export default meta;

type Story = StoryObj<typeof EmptyState>;

export const WithAction: Story = {
  render: () => (
    <EmptyState
      icon={
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
      }
      title="No documents yet"
      description="Get started by creating your first document."
      action={<Button variant="primary">New Document</Button>}
    />
  ),
};

export const TitleAndDescription: Story = {
  render: () => (
    <EmptyState
      title="No results found"
      description="Try adjusting your search or filters to find what you're looking for."
    />
  ),
};

export const InsideDataTable: Story = {
  render: () => (
    <DataTable
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status' },
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

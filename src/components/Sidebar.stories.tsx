import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, SidebarSection, SidebarItem } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: 'Structure/Sidebar',
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Full: Story = {
  render: () => (
    <div className="h-96 bg-surface">
      <Sidebar>
        <SidebarSection label="Main">
          <SidebarItem active href="#" icon={<span className="w-4 h-4 block rounded-sm bg-primary" />}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="#" icon={<span className="w-4 h-4 block rounded-sm bg-secondary" />}>
            Documents
          </SidebarItem>
          <SidebarItem href="#" icon={<span className="w-4 h-4 block rounded-sm bg-border" />}>
            Settings
          </SidebarItem>
        </SidebarSection>
        <SidebarSection label="Projects" collapsible>
          <SidebarItem href="#" icon={<span className="w-4 h-4 block rounded-sm bg-accent" />}>
            Terra DS
          </SidebarItem>
          <SidebarItem href="#" indent>
            Phase 1
          </SidebarItem>
          <SidebarItem href="#" indent>
            Phase 2
          </SidebarItem>
        </SidebarSection>
      </Sidebar>
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <div className="h-96 bg-surface">
      <Sidebar collapsed>
        <SidebarSection>
          <SidebarItem active href="#" icon={<span className="w-4 h-4 block rounded-sm bg-primary" />}>
            Dashboard
          </SidebarItem>
          <SidebarItem href="#" icon={<span className="w-4 h-4 block rounded-sm bg-secondary" />}>
            Documents
          </SidebarItem>
          <SidebarItem href="#" icon={<span className="w-4 h-4 block rounded-sm bg-border" />}>
            Settings
          </SidebarItem>
        </SidebarSection>
        <SidebarSection>
          <SidebarItem href="#" icon={<span className="w-4 h-4 block rounded-sm bg-accent" />}>
            Terra DS
          </SidebarItem>
        </SidebarSection>
      </Sidebar>
    </div>
  ),
};

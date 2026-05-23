import type { Meta, StoryObj } from '@storybook/react';
import { AppShell } from './AppShell';
import { Header } from './Header';
import { Sidebar, SidebarSection, SidebarItem } from './Sidebar';
import { ContentPage } from './ContentPage';
import { Button } from './Button';

const meta: Meta<typeof AppShell> = {
  component: AppShell,
  title: 'Structure/AppShell',
};
export default meta;

type Story = StoryObj<typeof AppShell>;

export const FullLayout: Story = {
  render: () => (
    <div className="h-screen -m-4">
      <AppShell
        header={
          <Header
            breadcrumb={[
              { label: 'Home', href: '#' },
              { label: 'Projects', href: '#' },
              { label: 'Terra DS' },
            ]}
            actions={<Button variant="primary">New</Button>}
          />
        }
        sidebar={
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
            </SidebarSection>
          </Sidebar>
        }
      >
        <ContentPage>
          <h1 className="font-content-display text-on-content mb-md">Terra DS</h1>
          <p className="font-content-body-lg text-on-content-muted leading-relaxed">
            This is the full AppShell layout. A Header sits at the top, a Sidebar on the left,
            and the main content area scrolls independently. The content register is rendered
            inside the main area, bringing its own warm surface.
          </p>
        </ContentPage>
      </AppShell>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { TabsRoot, TabList, Tab, TabContent } from './Tab';

const meta: Meta = {
  title: 'UI/Tab',
};
export default meta;

type Story = StoryObj;

export const All: Story = {
  render: () => (
    <TabsRoot defaultValue="tab1">
      <TabList>
        <Tab value="tab1">First</Tab>
        <Tab value="tab2">Second</Tab>
        <Tab value="tab3">Third</Tab>
      </TabList>
      <TabContent value="tab1">
        <div className="p-md bg-surface-raised rounded-md text-on-surface">Content for first tab</div>
      </TabContent>
      <TabContent value="tab2">
        <div className="p-md bg-surface-raised rounded-md text-on-surface">Content for second tab</div>
      </TabContent>
      <TabContent value="tab3">
        <div className="p-md bg-surface-raised rounded-md text-on-surface">Content for third tab</div>
      </TabContent>
    </TabsRoot>
  ),
};

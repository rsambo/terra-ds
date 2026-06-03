import React, { useState } from 'react';
import {
  Button,
  Input,
  Badge,
  NavItem,
  Card,
  Callout,
  ChatBubble,
  Tab,
  TabList,
  TabContent,
  TabsRoot,
  DataTable,
  DataTableHeader,
  DataTableRow,
  DataTableCell,
  Dialog,
  DropdownMenu,
  DropdownMenuItem,
  Select,
  SelectItem,
  Breadcrumb,
  Avatar,
  ContentPage,
  Textarea,
  Checkbox,
  Toggle,
} from '../src/components';

export const Sampler: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tab, setTab] = useState('buttons');
  const [toggleOn, setToggleOn] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);

  return (
    <div className="p-lg space-y-xl">
      <h2 className="font-heading-md text-on-surface">Live Sampler</h2>

      {/* Buttons */}
      <section>
        <h3 className="font-label-lg text-on-surface-muted mb-sm">Buttons</h3>
        <Card className="flex flex-wrap items-center gap-md">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </Card>
      </section>

      {/* Inputs */}
      <section>
        <h3 className="font-label-lg text-on-surface-muted mb-sm">Inputs</h3>
        <Card className="flex flex-col gap-md max-w-md">
          <Input placeholder="Default input…" />
          <Input placeholder="Error state…" error />
          <Input placeholder="Disabled…" disabled />
          <Textarea placeholder="Textarea…" />
          <Select placeholder="Select an option">
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </Select>
        </Card>
      </section>

      {/* Badges + Nav */}
      <section>
        <h3 className="font-label-lg text-on-surface-muted mb-sm">Badges & Navigation</h3>
        <Card className="flex flex-wrap items-center gap-md">
          <Badge>Default</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="error">Error</Badge>
          <div className="flex gap-sm">
            <NavItem>Home</NavItem>
            <NavItem active>Active</NavItem>
          </div>
        </Card>
      </section>

      {/* Tabs */}
      <section>
        <h3 className="font-label-lg text-on-surface-muted mb-sm">Tabs</h3>
        <Card>
          <TabsRoot value={tab} onValueChange={setTab}>
            <TabList>
              <Tab value="buttons">Buttons</Tab>
              <Tab value="inputs">Inputs</Tab>
              <Tab value="content">Content</Tab>
            </TabList>
            <TabContent value="buttons">
              <p className="font-body-md text-on-surface">Button tab content.</p>
            </TabContent>
            <TabContent value="inputs">
              <p className="font-body-md text-on-surface">Input tab content.</p>
            </TabContent>
            <TabContent value="content">
              <p className="font-body-md text-on-surface">Content tab content.</p>
            </TabContent>
          </TabsRoot>
        </Card>
      </section>

      {/* Chat bubbles */}
      <section>
        <h3 className="font-label-lg text-on-surface-muted mb-sm">Chat Bubbles</h3>
        <Card className="space-y-md max-w-xl">
          <ChatBubble role="user">This is a user message bubble.</ChatBubble>
          <ChatBubble role="assistant">This is an assistant message bubble.</ChatBubble>
        </Card>
      </section>

      {/* Content */}
      <section>
        <h3 className="font-label-lg text-on-surface-muted mb-sm">Content Paper</h3>
        <ContentPage>
          <h1 className="font-content-heading-lg">Content Heading</h1>
          <p className="font-content-body-md mt-sm">
            Long-form content lives on the warmest cream surface. The interface recedes so the words can breathe.
          </p>
          <Callout className="mt-md">A callout nested inside content.</Callout>
        </ContentPage>
      </section>

      {/* Data Table */}
      <section>
        <h3 className="font-label-lg text-on-surface-muted mb-sm">Data Table</h3>
        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'role', label: 'Role' },
            { key: 'status', label: 'Status' },
          ]}
          rows={[
            { id: 1, name: 'Alice', role: 'Engineer', status: 'Active' },
            { id: 2, name: 'Bob', role: 'Designer', status: 'Away' },
            { id: 3, name: 'Carol', role: 'PM', status: 'Active' },
          ]}
        />
      </section>

      {/* Dialog snapshot */}
      <section>
        <h3 className="font-label-lg text-on-surface-muted mb-sm">Dialog</h3>
        <Card className="flex items-center gap-md">
          <Button variant="primary" onClick={() => setDialogOpen(true)}>Open Dialog</Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen} title="Sample Dialog">
            <p className="font-body-md text-on-surface">This is a dialog content area.</p>
            <div className="flex justify-end gap-sm mt-md">
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setDialogOpen(false)}>Confirm</Button>
            </div>
          </Dialog>
        </Card>
      </section>

      {/* Dropdown snapshot */}
      <section>
        <h3 className="font-label-lg text-on-surface-muted mb-sm">Dropdown Menu</h3>
        <Card className="flex items-center gap-md">
          <DropdownMenu trigger={<Button variant="secondary">Open Menu</Button>}>
            <DropdownMenuItem>Item One</DropdownMenuItem>
            <DropdownMenuItem>Item Two</DropdownMenuItem>
            <DropdownMenuItem destructive>Delete</DropdownMenuItem>
          </DropdownMenu>
        </Card>
      </section>

      {/* Breadcrumb + Avatar */}
      <section>
        <h3 className="font-label-lg text-on-surface-muted mb-sm">Breadcrumb & Avatar</h3>
        <Card className="flex flex-wrap items-center gap-md">
          <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Projects', href: '#' }, { label: 'Terra DS' }]} />
          <Avatar fallback="AB" />
          <Avatar fallback="CD" />
        </Card>
      </section>

      {/* Toggle + Checkbox */}
      <section>
        <h3 className="font-label-lg text-on-surface-muted mb-sm">Toggle & Checkbox</h3>
        <Card className="flex items-center gap-md">
          <Toggle checked={toggleOn} onCheckedChange={setToggleOn} />
          <Checkbox checked={checkboxChecked} onCheckedChange={setCheckboxChecked} />
        </Card>
      </section>
    </div>
  );
};

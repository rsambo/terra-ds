import { Button } from './Button';
import { Card } from './Card';
import { Badge } from './Badge';
import { NavItem } from './NavItem';
import { Input } from './Input';
import { Callout } from './Callout';

export default {
  title: 'Themes',
};

const ComponentSet = () => (
  <div className="flex flex-col gap-md p-lg">
    <div className="flex gap-sm">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
    <div className="flex gap-sm">
      <Badge>Default</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="error">Error</Badge>
    </div>
    <div className="flex gap-sm">
      <NavItem>Home</NavItem>
      <NavItem active>Settings</NavItem>
    </div>
    <Input placeholder="Type something…" />
    <Card>
      <h3 className="font-heading-sm text-on-surface mb-sm">Card title</h3>
      <p className="font-body-md text-on-surface-muted">
        Card content using the surface-raised register.
      </p>
    </Card>
    <Callout>
      A callout using the content register for long-form reading context.
    </Callout>
  </div>
);

export const LightAndDark = () => (
  <div className="flex gap-0">
    <div className="flex-1 bg-surface">
      <div className="font-label-sm text-on-surface-muted uppercase px-lg pt-lg">
        Light Theme
      </div>
      <ComponentSet />
    </div>
    <div className="flex-1 bg-surface dark">
      <div className="font-label-sm text-on-surface-muted uppercase px-lg pt-lg">
        Dark Theme
      </div>
      <ComponentSet />
    </div>
  </div>
);

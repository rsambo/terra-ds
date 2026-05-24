import type { Meta, StoryObj } from '@storybook/react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { Toast, ToastViewport } from './Toast';
import { useToast } from './useToast';
import { Button } from './Button';

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: 'Feedback/Toast',
  decorators: [
    (Story) => (
      <ToastPrimitive.Provider>
        <Story />
        <ToastViewport />
      </ToastPrimitive.Provider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Toast>;

function DefaultToastDemo() {
  const { toasts, toast, dismiss } = useToast();
  return (
    <>
      <Button variant="primary" onClick={() => toast({ title: 'Document saved' })}>
        Show Default Toast
      </Button>
      {toasts.map((t) => (
        <Toast key={t.id} {...t} open onOpenChange={() => dismiss(t.id)} />
      ))}
    </>
  );
}

export const Default: Story = {
  render: () => <DefaultToastDemo />,
};

function SuccessToastDemo() {
  const { toasts, toast, dismiss } = useToast();
  return (
    <>
      <Button variant="primary" onClick={() => toast({ title: 'Published', variant: 'success' })}>
        Show Success Toast
      </Button>
      {toasts.map((t) => (
        <Toast key={t.id} {...t} open onOpenChange={() => dismiss(t.id)} />
      ))}
    </>
  );
}

export const Success: Story = {
  render: () => <SuccessToastDemo />,
};

function ErrorToastDemo() {
  const { toasts, toast, dismiss } = useToast();
  return (
    <>
      <Button variant="primary" onClick={() => toast({ title: 'Upload failed', description: 'The file exceeded the size limit.', variant: 'error' })}>
        Show Error Toast
      </Button>
      {toasts.map((t) => (
        <Toast key={t.id} {...t} open onOpenChange={() => dismiss(t.id)} />
      ))}
    </>
  );
}

export const Error: Story = {
  render: () => <ErrorToastDemo />,
};

function ActionToastDemo() {
  const { toasts, toast, dismiss } = useToast();
  return (
    <>
      <Button
        variant="primary"
        onClick={() =>
          toast({
            title: 'Changes unsaved',
            description: 'You have unsaved changes.',
            action: { label: 'Save', onClick: () => {} },
          })
        }
      >
        Show Action Toast
      </Button>
      {toasts.map((t) => (
        <Toast key={t.id} {...t} open onOpenChange={() => dismiss(t.id)} />
      ))}
    </>
  );
}

export const WithAction: Story = {
  render: () => <ActionToastDemo />,
};

function StackedToastDemo() {
  const { toasts, toast, dismiss } = useToast();
  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          toast({ title: 'First notification' });
          setTimeout(() => toast({ title: 'Second notification', variant: 'success' }), 200);
          setTimeout(() => toast({ title: 'Third notification', variant: 'error' }), 400);
        }}
      >
        Stack Three Toasts
      </Button>
      {toasts.map((t) => (
        <Toast key={t.id} {...t} open onOpenChange={() => dismiss(t.id)} />
      ))}
    </>
  );
}

export const Stacked: Story = {
  render: () => <StackedToastDemo />,
};

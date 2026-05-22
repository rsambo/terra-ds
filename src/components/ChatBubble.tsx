import React from 'react';

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  role: 'user' | 'assistant';
}

export const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ role, className = '', children, ...props }, ref) => {
    const isUser = role === 'user';
    const base = 'max-w-xl rounded-lg p-md font-body-md';
    const tone = isUser
      ? 'bg-surface-chat-user text-on-chat ml-auto'
      : 'bg-surface-chat-assistant text-on-chat mr-auto';

    return (
      <div ref={ref} className={`${base} ${tone} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
ChatBubble.displayName = 'ChatBubble';

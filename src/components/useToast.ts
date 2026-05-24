import { useState, useCallback } from 'react';
import type { ToastProps } from './Toast';

interface ToastItem extends Omit<ToastProps, 'open' | 'onOpenChange'> {
  id: string;
}

let idCounter = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((options: Omit<ToastProps, 'open' | 'onOpenChange'>) => {
    const id = `toast-${++idCounter}`;
    const item: ToastItem = { id, ...options };
    setToasts((prev) => [...prev, item]);

    const duration = options.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration + 300);
    }
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, toast, dismiss };
}

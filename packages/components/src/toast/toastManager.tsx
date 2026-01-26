import { type ReactNode } from 'react';
import {
  ColoredCheckmarkCircle,
  ColoredXmarkCircle,
  ColoredExclamationmarkCircle,
} from '@dds-app/icons';

const ICON_SIZE = 22;
const DEFAULT_POSITION = 'top';
const DEFAULT_DURATION = 3000;

export interface ToastOptions {
  position?: 'top' | 'bottom';
  duration?: number;
  icon?: ReactNode;
}

export interface ToastItem {
  id: string;
  message: string;
  position: 'top' | 'bottom';
  duration: number;
  icon?: ReactNode;
}

type Listener = (toasts: ToastItem[]) => void;

const createToastManager = () => {
  let toasts: ToastItem[] = [];
  let idCounter = 0;
  const listeners = new Set<Listener>();

  const notify = () => {
    listeners.forEach((listener) => listener([...toasts]));
  };

  const show = (message: string, options: ToastOptions = {}) => {
    const id = `toast-${++idCounter}`;

    toasts = [
      ...toasts,
      {
        id,
        message,
        position: options.position ?? DEFAULT_POSITION,
        duration: options.duration ?? DEFAULT_DURATION,
        icon: options.icon,
      },
    ];

    notify();
    return id;
  };

  const hide = (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  };

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  return { show, hide, subscribe };
};

export const toastManager = createToastManager();

type OptionsWithoutIcon = Omit<ToastOptions, 'icon'>;

const createToast = () => {
  const toastFn = (message: string, options?: ToastOptions) =>
    toastManager.show(message, options);

  toastFn.success = (message: string, options?: OptionsWithoutIcon) =>
    toastManager.show(message, {
      ...options,
      icon: <ColoredCheckmarkCircle size={ICON_SIZE} />,
    });

  toastFn.error = (message: string, options?: OptionsWithoutIcon) =>
    toastManager.show(message, {
      ...options,
      icon: <ColoredXmarkCircle size={ICON_SIZE} />,
    });

  toastFn.warning = (message: string, options?: OptionsWithoutIcon) =>
    toastManager.show(message, {
      ...options,
      icon: <ColoredExclamationmarkCircle size={ICON_SIZE} />,
    });

  toastFn.hide = toastManager.hide;

  return toastFn;
};

export const toast = createToast();

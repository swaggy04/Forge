"use client";

import * as React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5000;

type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
};

type State = {
  toasts: Toast[];
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = {
  toasts: [],
};

function dispatch(state: State) {
  memoryState = state;

  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

export function toast({
  title,
  description,
  variant,
}: Omit<Toast, "id">) {
  const id = crypto.randomUUID();

  const newToast: Toast = {
    id,
    title,
    description,
    variant,
  };

  dispatch({
    ...memoryState,
    toasts: [newToast, ...memoryState.toasts].slice(0, TOAST_LIMIT),
  });

  setTimeout(() => {
    dismiss(id);
  }, TOAST_REMOVE_DELAY);

  return {
    id,
    dismiss: () => dismiss(id),
  };
}

export function dismiss(toastId?: string) {
  dispatch({
    ...memoryState,
    toasts: memoryState.toasts.filter(
      (toast) => toast.id !== toastId,
    ),
  });
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);

    return () => {
      const index = listeners.indexOf(setState);

      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss,
  };
}
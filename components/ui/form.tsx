"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
} from "react-hook-form";

export const Form = FormProvider;

export function FormField<T extends object>(props: ControllerProps<T>) {
  return <Controller {...props} />;
}

export function FormItem({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}

export function FormLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={`text-sm font-medium ${className ?? ""}`}
    >
      {children}
    </label>
  );
}

export function FormControl({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}

export function FormMessage() {
  const { formState } = useFormContext();
  const error = Object.values(formState.errors)[0];

  if (!error) return null;

  return (
    <p className="text-sm text-red-500">
      {error.message as string}
    </p>
  );
}
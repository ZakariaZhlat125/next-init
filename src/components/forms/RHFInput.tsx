"use client";

import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Input, InputProps } from "@/components/ui/Input";

export type RHFInputProps = {
  methods: UseFormReturn<any>;
  name: string;
} & Omit<InputProps, "value" | "onChange">;

export function RHFInput({ methods, name, ...props }: RHFInputProps) {
  const {
    control,
    formState: { errors },
  } = methods;

  const fieldError = (errors as any)?.[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input
          {...props}
          name={name}
          value={field.value as any}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={!!fieldError}
          errorText={fieldError?.message as string | undefined}
        />
      )}
    />
  );
}

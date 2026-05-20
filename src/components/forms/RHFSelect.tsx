"use client";

import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Select, SelectOption, SelectProps } from "@/components/ui/Select";

export type RHFSelectProps = {
  methods: UseFormReturn<any>;
  name: string;
} & Omit<SelectProps, "value" | "onChange">;

export function RHFSelect({ methods, name, ...props }: RHFSelectProps) {
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
        <Select
          {...props}
          value={field.value}
          onChange={field.onChange}
          error={!!fieldError}
          errorText={fieldError?.message as string | undefined}
        />
      )}
    />
  );
}

"use client";

import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Checkbox, CheckboxProps } from "@/components/ui/Checkbox";

export type RHFCheckboxProps = {
  methods: UseFormReturn<any>;
  name: string;
} & Omit<CheckboxProps, "checked" | "onChange">;

export function RHFCheckbox({ methods, name, ...props }: RHFCheckboxProps) {
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
        <Checkbox
          {...props}
          checked={field.value}
          onChange={field.onChange}
          error={!!fieldError}
          errorText={fieldError?.message as string | undefined}
        />
      )}
    />
  );
}

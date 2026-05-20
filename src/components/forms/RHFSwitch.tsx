"use client";

import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Switch, SwitchProps } from "@/components/ui/Switch";

export type RHFSwitchProps = {
  methods: UseFormReturn<any>;
  name: string;
} & Omit<SwitchProps, "checked" | "onChange">;

export function RHFSwitch({ methods, name, ...props }: RHFSwitchProps) {
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
        <Switch
          {...props}
          checked={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
}

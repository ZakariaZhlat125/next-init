"use client";

import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { TextArea, TextAreaProps } from "@/components/ui/TextArea";

export type RHFTextAreaProps = {
  methods: UseFormReturn<any>;
  name: string;
} & Omit<TextAreaProps, "value" | "onChange">;

export function RHFTextArea({ methods, name, ...props }: RHFTextAreaProps) {
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
        <TextArea
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

import { z } from 'zod';

export interface ValidationSchemaOptions {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

export function emailSchema(options: { required?: boolean } = {}) {
  const { required = true } = options;
  
  if (required) {
    return z.string().email();
  }
  
  return z.string().email().optional().or(z.literal(''));
}

export function passwordSchema(minLength: number = 8, maxLength: number = 128) {
  return z.string().min(minLength).max(maxLength);
}

export function strongPasswordSchema(minLength: number = 8, maxLength: number = 128) {
  return z
    .string()
    .min(minLength)
    .max(maxLength)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      { message: 'validation.password.strong' }
    );
}

export function nameSchema(minLength: number = 2, maxLength: number = 100) {
  return z.string().min(minLength).max(maxLength);
}

export function phoneSchema() {
  return z.string().regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/);
}

export function urlSchema(options: { required?: boolean } = {}) {
  const { required = true } = options;
  
  if (required) {
    return z.string().url();
  }
  
  return z.string().url().optional().or(z.literal(''));
}

export function dateSchema() {
  return z.coerce.date();
}

export function numberSchema(options: { min?: number; max?: number } = {}) {
  let schema = z.number();
  
  if (options.min !== undefined) {
    schema = schema.min(options.min);
  }
  
  if (options.max !== undefined) {
    schema = schema.max(options.max);
  }
  
  return schema;
}

export function matchFieldSchema<T extends z.ZodTypeAny>(
  fieldName: string,
  fieldSchema: T,
  customMessage?: string
) {
  return z
    .object({
      [fieldName]: fieldSchema,
      [`${fieldName}Confirmation`]: fieldSchema,
    })
    .refine((data) => data[fieldName] === data[`${fieldName}Confirmation`], {
      message: customMessage || 'validation.match.password',
      path: [`${fieldName}Confirmation`],
    });
}

export function createPasswordMatchSchema(minLength: number = 8) {
  return z
    .object({
      password: passwordSchema(minLength),
      confirmPassword: passwordSchema(minLength),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'validation.match.password',
      path: ['confirmPassword'],
    });
}

export function optionalString(minLength?: number, maxLength?: number) {
  let schema = z.string().optional().or(z.literal(''));
  
  if (minLength !== undefined) {
    schema = z.string().min(minLength).optional().or(z.literal(''));
  }
  
  if (maxLength !== undefined && minLength !== undefined) {
    schema = z.string().min(minLength).max(maxLength).optional().or(z.literal(''));
  }
  
  return schema;
}

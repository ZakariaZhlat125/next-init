'use client';

import { forwardRef } from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends Omit<AntInputProps, 'size'> {
  error?: boolean;
  label?: string;
  errorText?: string;
  size?: 'sm' | 'md' | 'lg';
  // Optional styling hooks for the wrapper/label/error
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

export const Input = forwardRef<any, InputProps>(
  ({ 
    className,
    containerClassName,
    labelClassName,
    errorClassName,
    error,
    label,
    errorText,
    size = 'md',
    ...props
  }, ref) => {
    const { tokens } = useTheme();

    const antdSize = {
      sm: 'small',
      md: 'middle',
      lg: 'large',
    } as const;

    const heightStyles = {
      sm: '38px',
      md: '44px',
      lg: '52px',
    };

    // Use Ant Design Password input when type is password to enable built-in visibility toggle support
    const BaseInput: any = props?.type === 'password' ? (AntInput as any).Password : AntInput;

    // Generate an id from provided id or name to link label and input
    const inputId = (props as any)?.id ?? (props as any)?.name ?? undefined;
    const errorId = inputId ? `${inputId}-error` : undefined;

    return (
      <div className={cn('flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label
            className={cn('text-sm font-medium mb-0.5', labelClassName)}
            style={{ color: tokens.text }}
            htmlFor={inputId}
          >
            {label}
          </label>
        )}
        <BaseInput
          ref={ref}
          className={cn(
            'custom-input',
            className
          )}
          size={antdSize[size]}
          status={error ? 'error' : undefined}
          style={{
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
            borderRadius: '8px',
            border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
            height: heightStyles[size],
            padding: '10px 16px',
            fontSize: '14px',
            '--ant-color-text-placeholder': 'var(--text-muted)',
          }}
          
          id={inputId}
          aria-invalid={error || undefined}
          aria-describedby={error && errorText && errorId ? errorId : undefined}
          {...props}
        />
        <style jsx global>{`
          .custom-input:hover {
            border-color: var(--primary) !important;
          }
          .custom-input:focus,
          .custom-input:focus-within {
            border-color: var(--primary) !important;
            box-shadow: 0 0 0 3px var(--focus-ring) !important;
            outline: none !important;
          }
          .custom-input input {
            background-color: transparent !important;
            color: var(--text) !important;
          }
          .custom-input textarea {
            background-color: transparent !important;
            color: var(--text) !important;
          }
          .custom-input .ant-input-password-icon {
            color: var(--text-secondary) !important;
          }
        `}</style>
        {error && errorText && (
          <p id={errorId} className={cn('text-xs mt-1', errorClassName)} style={{ color: tokens.danger }}>
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

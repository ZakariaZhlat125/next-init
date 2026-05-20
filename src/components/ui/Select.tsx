'use client';

import { forwardRef } from 'react';
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<AntSelectProps, 'size' | 'options'> {
  error?: boolean;
  label?: string;
  errorText?: string;
  options: SelectOption[];
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
}

export const Select = forwardRef<any, SelectProps>(
  ({ 
    className, 
    error, 
    label, 
    errorText, 
    options, 
    placeholder,
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

    const antOptions = options.map((option) => ({
      value: option.value,
      label: option.label,
      disabled: option.disabled,
    }));

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label 
            className="text-sm font-medium mb-0.5"
            style={{ color: tokens.text }}
          >
            {label}
          </label>
        )}
        <AntSelect
          ref={ref}
          className={cn(
            'neumorphic-flat custom-select',
            className
          )}
          placeholder={placeholder}
          options={antOptions}
          size={antdSize[size]}
          status={error ? 'error' : undefined}
          style={{
            width: '100%',
            height: heightStyles[size],
          }}
          popupClassName="custom-select-dropdown"
          {...props}
        />
        {error && errorText && (
          <p className="text-xs mt-1" style={{ color: tokens.danger }}>
            {errorText}
          </p>
        )}
        <style jsx global>{`
          .custom-select .ant-select-selector {
            background-color: var(--surface) !important;
            color: var(--text) !important;
            border-radius: 8px !important;
            border: 1px solid var(--border) !important;
            height: ${heightStyles[size]} !important;
            padding: 10px 16px !important;
            font-size: 14px !important;
          }
          .custom-select:hover .ant-select-selector {
            border-color: var(--primary) !important;
          }
          .custom-select.ant-select-focused .ant-select-selector {
            border-color: var(--primary) !important;
            box-shadow: 0 0 0 3px var(--focus-ring) !important;
          }
          .custom-select .ant-select-selection-item {
            line-height: ${heightStyles[size]} !important;
            padding: 0 !important;
            color: var(--text) !important;
            font-weight: 500 !important;
          }
          .custom-select .ant-select-selection-placeholder {
            line-height: ${heightStyles[size]} !important;
            padding: 0 !important;
            color: var(--text-muted) !important;
            opacity: 0.6 !important;
          }
          .custom-select .ant-select-arrow {
            color: var(--text-secondary) !important;
          }
          .custom-select-dropdown {
            background-color: var(--surface) !important;
            border: 1px solid var(--border) !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          }
          .custom-select-dropdown .ant-select-item {
            color: var(--text) !important;
            padding: 8px 12px !important;
          }
          .custom-select-dropdown .ant-select-item-option-selected {
            background-color: var(--primary-soft) !important;
            color: var(--primary) !important;
            font-weight: 600 !important;
          }
          .custom-select-dropdown .ant-select-item-option-active:not(.ant-select-item-option-selected) {
            background-color: var(--surface-hover) !important;
          }
          .custom-select-dropdown .ant-select-item-option:hover {
            background-color: var(--surface-hover) !important;
          }
        `}</style>
      </div>
    );
  }
);

Select.displayName = 'Select';

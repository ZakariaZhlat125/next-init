'use client';

import { forwardRef } from 'react';
import { Checkbox as AntCheckbox, CheckboxProps as AntCheckboxProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface CheckboxProps extends Omit<AntCheckboxProps, 'children'> {
  label?: string;
  error?: boolean;
  errorText?: string;
}

export const Checkbox = forwardRef<any, CheckboxProps>(
  ({ 
    className, 
    label,
    error,
    errorText,
    ...props 
  }, ref) => {
    const { tokens } = useTheme();

    return (
      <>
        <div className="flex flex-col gap-1">
          <AntCheckbox
            ref={ref}
            className={cn('custom-checkbox', className)}
            {...props}
          >
            {label && (
              <span style={{ color: 'var(--text)', fontSize: '14px' }}>
                {label}
              </span>
            )}
          </AntCheckbox>
          {error && errorText && (
            <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>
              {errorText}
            </p>
          )}
        </div>
        <style jsx global>{`
          .custom-checkbox .ant-checkbox-inner {
            background-color: var(--surface) !important;
            border-color: var(--border) !important;
          }
          .custom-checkbox:hover .ant-checkbox-inner {
            border-color: var(--primary) !important;
          }
          .custom-checkbox .ant-checkbox-checked .ant-checkbox-inner {
            background-color: var(--primary) !important;
            border-color: var(--primary) !important;
          }
          .custom-checkbox .ant-checkbox-wrapper:focus-within {
            box-shadow: 0 0 0 3px var(--focus-ring) !important;
          }
        `}</style>
      </>
    );
  }
);

Checkbox.displayName = 'Checkbox';

'use client';

import { forwardRef } from 'react';
import { Input } from 'antd';
import { TextAreaProps as AntTextAreaProps } from 'antd/es/input';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

const { TextArea: AntTextArea } = Input;

export interface TextAreaProps extends Omit<AntTextAreaProps, 'size'> {
  error?: boolean;
  label?: string;
  errorText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TextArea = forwardRef<any, TextAreaProps>(
  ({ 
    className, 
    error, 
    label, 
    errorText, 
    size = 'md',
    ...props 
  }, ref) => {
    const { tokens } = useTheme();

    const minRowsStyles = {
      sm: 2,
      md: 3,
      lg: 4,
    };

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
        <AntTextArea
          ref={ref}
          className={cn(
            'custom-textarea',
            className
          )}
          status={error ? 'error' : undefined}
          autoSize={{ minRows: minRowsStyles[size], maxRows: 8 }}
          style={{
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
            borderRadius: '8px',
            border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
            padding: '10px 16px',
            fontSize: '14px',
            resize: 'vertical',
          }}
          {...props}
        />
        <style jsx global>{`
          .custom-textarea:hover {
            border-color: var(--primary) !important;
          }
          .custom-textarea:focus {
            border-color: var(--primary) !important;
            box-shadow: 0 0 0 3px var(--focus-ring) !important;
            outline: none !important;
          }
          .custom-textarea::placeholder {
            color: var(--text-muted) !important;
          }
        `}</style>
        {error && errorText && (
          <p className="text-xs mt-1" style={{ color: tokens.danger }}>
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

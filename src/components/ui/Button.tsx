'use client';

import { forwardRef } from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends Omit<AntButtonProps, 'size' | 'variant' | 'htmlType'> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'link' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  htmlType?: 'submit' | 'button' | 'reset';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    disabled,
    children,
    onClick,
    ...props 
  }, ref) => {
    const { tokens } = useTheme();

    const variantToType = {
      primary: 'primary',
      secondary: 'default',
      success: 'primary',
      warning: 'primary',
      danger: 'primary',
      ghost: 'text',
      link: 'link',
      gradient: 'primary',
    } as const;

    const antdSize = {
      sm: 'small',
      md: 'middle',
      lg: 'large',
    } as const;

    const getCustomStyle = () => {
      switch (variant) {
        case 'primary':
          return { 
            backgroundColor: 'var(--primary)',
            borderColor: 'var(--primary)',
            color: '#ffffff',
          };
        case 'secondary':
          return { 
            backgroundColor: 'var(--secondary)',
            borderColor: 'var(--border)',
            color: 'var(--text)',
          };
        case 'success':
          return { 
            backgroundColor: 'var(--success)',
            borderColor: 'var(--success)',
            color: '#ffffff',
          };
        case 'warning':
          return { 
            backgroundColor: 'var(--warning)',
            borderColor: 'var(--warning)',
            color: '#ffffff',
          };
        case 'danger':
          return { 
            backgroundColor: 'var(--danger)',
            borderColor: 'var(--danger)',
            color: '#ffffff',
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: 'var(--text)',
          };
        case 'gradient':
          return {
            background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)',
            boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)',
            border: 'none',
            color: '#ffffff',
          };
        default:
          return {};
      }
    };

    return (
      <>
        <AntButton
          ref={ref}
          type={variantToType[variant]}
          size={antdSize[size]}
          loading={isLoading}
          disabled={disabled}
          className={cn(
            'custom-button',
            `custom-button-${variant}`,
            variant === 'gradient' && 'text-white! hover:opacity-90',
            className
          )}
          style={getCustomStyle()}
          onClick={onClick}
          {...props}
        >
          {children}
        </AntButton>
        <style jsx global>{`
          .custom-button-primary:hover:not(:disabled) {
            background-color: var(--primary-hover) !important;
            border-color: var(--primary-hover) !important;
          }
          .custom-button-secondary:hover:not(:disabled) {
            background-color: var(--surface-hover) !important;
          }
          .custom-button:focus {
            box-shadow: 0 0 0 3px var(--focus-ring) !important;
          }
        `}</style>
      </>
    );
  }
);

Button.displayName = 'Button';

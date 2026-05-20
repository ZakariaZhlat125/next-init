'use client';

import { ReactNode } from 'react';
import { Badge as AntBadge, BadgeProps as AntBadgeProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface BadgeProps extends Omit<AntBadgeProps, 'color'> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  children?: ReactNode;
}

export const Badge = ({ 
  className, 
  variant = 'default',
  children,
  ...props 
}: BadgeProps) => {
  const { tokens } = useTheme();

  const variantColors = {
    primary: tokens.primary,
    success: tokens.success,
    warning: tokens.warning,
    danger: tokens.danger,
    info: '#0ea5e9',
    default: tokens.textSecondary,
  };

  return (
    <AntBadge
      className={cn(className)}
      color={variantColors[variant]}
      {...props}
    >
      {children}
    </AntBadge>
  );
};

Badge.displayName = 'Badge';

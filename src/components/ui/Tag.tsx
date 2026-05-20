'use client';

import { Tag as AntTag, TagProps as AntTagProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface TagProps extends Omit<AntTagProps, 'color' | 'variant'> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
}

export const Tag = ({ 
  className,
  variant = 'default',
  children,
  ...props 
}: TagProps) => {
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
    <AntTag
      className={cn(className)}
      color={variantColors[variant]}
      {...props}
    >
      {children}
    </AntTag>
  );
};

Tag.displayName = 'Tag';

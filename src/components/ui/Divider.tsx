'use client';

import { Divider as AntDivider, DividerProps as AntDividerProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface DividerProps extends AntDividerProps {}

export const Divider = ({ 
  className,
  ...props 
}: DividerProps) => {
  const { tokens } = useTheme();

  return (
    <AntDivider
      className={cn(className)}
      style={{
        borderColor: tokens.border,
      }}
      {...props}
    />
  );
};

Divider.displayName = 'Divider';

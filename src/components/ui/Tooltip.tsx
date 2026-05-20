'use client';

import { Tooltip as AntTooltip, TooltipProps as AntTooltipProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface TooltipProps extends AntTooltipProps {}

export const Tooltip = ({ 
  className,
  children,
  ...props 
}: TooltipProps) => {
  const { tokens } = useTheme();

  return (
    <AntTooltip
      className={cn(className)}
      overlayStyle={{
        maxWidth: '300px',
      }}
      overlayInnerStyle={{
        backgroundColor: tokens.surface,
        color: tokens.text,
        boxShadow: `0 4px 12px ${tokens.shadowDark}`,
      }}
      {...props}
    >
      {children}
    </AntTooltip>
  );
};

Tooltip.displayName = 'Tooltip';

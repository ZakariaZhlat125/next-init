'use client';

import { Spin, SpinProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface SpinnerProps extends SpinProps {
  size?: 'small' | 'default' | 'large';
  centered?: boolean;
}

export const Spinner = ({ 
  className,
  size = 'default',
  centered = false,
  ...props 
}: SpinnerProps) => {
  const { tokens } = useTheme();

  const spinner = (
    <Spin
      className={cn(className)}
      size={size}
      style={{
        color: tokens.primary,
      }}
      {...props}
    />
  );

  if (centered) {
    return (
      <div className="flex items-center justify-center w-full py-12">
        {spinner}
      </div>
    );
  }

  return spinner;
};

Spinner.displayName = 'Spinner';

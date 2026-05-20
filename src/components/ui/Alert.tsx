'use client';

import { Alert as AntAlert, AlertProps as AntAlertProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface AlertProps extends Omit<AntAlertProps, 'type'> {
  variant?: 'success' | 'info' | 'warning' | 'error';
}

export const Alert = ({ 
  className,
  variant = 'info',
  ...props 
}: AlertProps) => {
  const { tokens } = useTheme();

  return (
    <AntAlert
      className={cn(className)}
      type={variant}
      style={{
        borderRadius: '8px',
      }}
      {...props}
    />
  );
};

Alert.displayName = 'Alert';

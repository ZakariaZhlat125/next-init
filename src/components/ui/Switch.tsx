'use client';

import { forwardRef } from 'react';
import { Switch as AntSwitch, SwitchProps as AntSwitchProps } from 'antd';
import { useTheme } from '@/lib/theme/use-theme';
import { cn } from '@/lib/utils/cn';

export interface SwitchProps extends AntSwitchProps {
  label?: string;
}

export const Switch = forwardRef<any, SwitchProps>(
  ({ 
    className, 
    label,
    ...props 
  }, ref) => {
    const { tokens } = useTheme();

    return (
      <>
        <div className="flex items-center gap-3">
          <AntSwitch
            ref={ref}
            className={cn('custom-switch', className)}
            {...props}
          />
          {label && (
            <label 
              className="text-sm font-medium cursor-pointer"
              style={{ color: 'var(--text)' }}
              onClick={() => props.onChange?.(!props.checked, {} as any)}
            >
              {label}
            </label>
          )}
        </div>
        <style jsx global>{`
          .custom-switch.ant-switch-checked {
            background-color: var(--primary) !important;
          }
          .custom-switch:not(.ant-switch-checked) {
            background-color: var(--border) !important;
          }
          .custom-switch:focus {
            box-shadow: 0 0 0 3px var(--focus-ring) !important;
          }
        `}</style>
      </>
    );
  }
);

Switch.displayName = 'Switch';

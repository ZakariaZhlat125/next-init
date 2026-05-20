'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';
import { ReloadOutlined, WarningOutlined } from '@ant-design/icons';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
  showIcon?: boolean;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while loading the data. Please try again.',
  onRetry,
  fullScreen = false,
  showIcon = true,
}: ErrorStateProps) {
  const { tokens } = useTheme();

  const content = (
    <Card className="p-8 max-w-md w-full">
      <div className="flex flex-col items-center text-center gap-6">
        {showIcon && (
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: `${tokens.danger}15`,
              color: tokens.danger,
            }}
          >
            <WarningOutlined className="text-4xl" />
          </div>
        )}

        <div className="space-y-2">
          <h3
            className="text-xl font-bold"
            style={{ color: tokens.text }}
          >
            {title}
          </h3>
          <p
            className="text-sm"
            style={{ color: tokens.textSecondary }}
          >
            {message}
          </p>
        </div>

        {onRetry && (
          <Button
            variant="primary"
            onClick={onRetry}
            className="gap-2"
          >
            <ReloadOutlined />
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );

  if (fullScreen) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: tokens.background }}
      >
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-6">
      {content}
    </div>
  );
}

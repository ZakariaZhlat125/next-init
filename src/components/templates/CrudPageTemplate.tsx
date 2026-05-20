'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui';
import { useTheme } from '@/lib/theme/use-theme';
import { PlusOutlined } from '@ant-design/icons';

export interface CrudPageTemplateProps {
  title: string;
  description: string;
  children: ReactNode;
  onAdd?: () => void;
  addButtonText?: string;
  extraActions?: ReactNode;
}

export function CrudPageTemplate({
  title,
  description,
  children,
  onAdd,
  addButtonText = 'Add New',
  extraActions,
}: CrudPageTemplateProps) {
  const { tokens } = useTheme();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: tokens.text }}>
            {title}
          </h1>
          <p className="text-sm" style={{ color: tokens.textSecondary }}>
            {description}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {extraActions}
          {onAdd && (
            <Button variant="primary" onClick={onAdd}>
              <PlusOutlined /> {addButtonText}
            </Button>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

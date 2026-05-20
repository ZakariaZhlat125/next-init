'use client';

import { ReactNode } from 'react';
import { Table, TableProps as AntTableProps } from 'antd';
import { Button } from '@/components/ui/Button';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

export interface Column<T> {
  key: keyof T | string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => ReactNode;
  sortable?: boolean;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
}

export interface Action<T> {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick: (record: T) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  show?: (record: T) => boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  loading?: boolean;
  onRowClick?: (record: T) => void;
  idField?: keyof T;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  actions,
  loading = false,
  onRowClick,
  idField = 'id' as keyof T,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  const antColumns: AntTableProps<T>['columns'] = columns.map((column) => ({
    key: String(column.key),
    title: column.title,
    dataIndex: column.dataIndex ? String(column.dataIndex) : undefined,
    render: column.render || ((value: any) => {
      // Convert objects and complex types to strings to avoid React errors
      if (value === null || value === undefined) return '';
      if (typeof value === 'object') return JSON.stringify(value);
      return String(value);
    }),
    width: column.width,
    align: column.align || 'left',
  }));

  if (actions && actions.length > 0 && antColumns) {
    antColumns.push({
      key: 'actions',
      title: 'Actions',
      width: 150,
      align: 'center' as const,
      render: (_: any, record: T) => (
        <div className="flex items-center justify-center gap-2">
          {actions
            .filter((action) => !action.show || action.show(record))
            .map((action) => (
              <Button
                key={action.key}
                variant={action.variant || 'ghost'}
                size="sm"
                onClick={() => action.onClick(record)}
                title={action.label}
              >
                {action.icon || action.label}
              </Button>
            ))}
        </div>
      ),
    });
  }

  return (
    <Table<T>
      columns={antColumns}
      dataSource={data}
      rowKey={(record) => String(record[idField])}
      loading={loading}
      onRow={(record) => ({
        onClick: onRowClick ? () => onRowClick(record) : undefined,
        style: { cursor: onRowClick ? 'pointer' : 'default' },
      })}
      locale={{
        emptyText: (
          <div className="flex flex-col items-center justify-center py-12">
            <p>{emptyMessage}</p>
          </div>
        ),
      }}
      pagination={false}
    />
  );
}

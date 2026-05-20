'use client';

import { getRoleColor, ROLE_LABELS, UserRole } from '@/types/roles';

interface RoleBadgeProps {
  role: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export function RoleBadge({ role, size = 'md', className = '' }: RoleBadgeProps) {
  const color = getRoleColor(role);
  const label = ROLE_LABELS[role as UserRole] || role;

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${SIZE_CLASSES[size]} ${className}`}
      style={{
        color: color,
        backgroundColor: `${color}20`,
      }}
    >
      {label}
    </span>
  );
}

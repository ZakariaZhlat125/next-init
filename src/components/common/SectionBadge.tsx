'use client';

import { UserSection } from '@/types/roles';

interface SectionBadgeProps {
  section: UserSection;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SECTION_CONFIG = {
  [UserSection.ADMIN]: {
    label: 'Admin',
    color: '#ff3b7a',
    bgColor: 'rgba(255, 59, 122, 0.1)',
  },
  [UserSection.ORGANIZATION]: {
    label: 'Organization',
    color: '#0ea5e9',
    bgColor: 'rgba(14, 165, 233, 0.1)',
  },
  [UserSection.INDIVIDUAL]: {
    label: 'Employee',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
  },
};

const SIZE_CLASSES = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export function SectionBadge({ section, size = 'md', className = '' }: SectionBadgeProps) {
  const config = SECTION_CONFIG[section];

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${SIZE_CLASSES[size]} ${className}`}
      style={{
        color: config.color,
        backgroundColor: config.bgColor,
      }}
    >
      {config.label}
    </span>
  );
}

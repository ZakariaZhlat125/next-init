'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/organizations', label: 'Organizations' },
  { href: '/admin/settings', label: 'Settings' },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-sidebar-bg border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-sidebar-text">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname?.endsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-text'
                        : 'text-sidebar-text-secondary hover:bg-sidebar-hover hover:text-sidebar-text'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-surface border-b border-border flex items-center px-6">
          <h2 className="text-lg font-semibold text-text">Admin Dashboard</h2>
        </header>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

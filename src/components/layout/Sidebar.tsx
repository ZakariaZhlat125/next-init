'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTheme } from '@/lib/theme/use-theme';
import { useLocale, useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { getMenuForUser } from '@/lib/navigation/filterMenuByRole';
import { MenuItem, MenuCategory } from '@/lib/navigation/menuItems';
import { getUserSection, getRoleColor } from '@/types/roles';
import { extractIdFromSlug } from '@/lib/utils/slug';
import { 
  MenuFoldOutlined,
  CaretDownOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const { tokens } = useTheme();
  const t = useTranslations();
  const locale = useLocale();
  const params = useParams();
  const { user, logoutOrganization, isLoading } = useAuth();
  const establishmentSlug = params?.establishmentId as string;
  const establishmentId = establishmentSlug ? extractIdFromSlug(establishmentSlug) : null;
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    MAIN: true,
    ACCOUNTING: true,
    INVENTORY: true,
    HR: true,
    PROJECTS: true,
    SETTINGS: true,
  });

  // Get menu items for current user
  const menuItems = useMemo(() => {
    if (!user) return [];
    return getMenuForUser(user, locale, establishmentSlug);
  }, [user, locale, establishmentSlug]);

  // Group menu items by category
  const { groupedItems, orderedCategories } = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};
    const standalone: MenuItem[] = [];

    menuItems.forEach((item) => {
      if ('category' in item && 'items' in item) {
        groups[item.category] = item.items;
      } else {
        standalone.push(item as MenuItem);
      }
    });

    const categoryOrder = ['MAIN', 'ACCOUNTING', 'INVENTORY', 'HR', 'PROJECTS', 'SETTINGS'];
    const ordered = categoryOrder.filter(cat => groups[cat] && groups[cat].length > 0);

    return { groupedItems: groups, orderedCategories: ordered };
  }, [menuItems]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Check if path is active
  const isActivePath = (path: string) => {
    return pathname === path || pathname?.startsWith(path);
  };

  // Get user section color
  const userSectionColor = useMemo(() => {
    if (!user?.roles?.[0]) return '#6b7280';
    return getRoleColor(user.roles[0]);
  }, [user]);

  return (
    <aside
      className={`h-screen flex flex-col transition-all duration-300 ${
        collapsed && !isHovered ? 'w-16' : 'w-96'
      }`}
      style={{ background: 'var(--sidebar-bg)' }}
      onMouseEnter={() => collapsed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center justify-between gap-3 ${collapsed && !isHovered ? 'p-3 justify-center' : 'p-6'}`}>
        <div className={`flex items-center gap-3 ${collapsed && !isHovered ? 'cursor-pointer' : ''}`} onClick={collapsed && !isHovered ? onToggle : undefined}>
          <div
            className={`rounded-lg flex items-center justify-center font-bold text-xl ${collapsed && !isHovered ? 'w-10 h-10' : 'w-12 h-12'}`}
            style={{ backgroundColor: 'var(--sidebar-logo-bg)', color: '#7c3aed' }}
          >
            ⊞
          </div>
          {!(collapsed && !isHovered) && (
            <div>
              <h1 className="font-bold text-white text-base">ERP Platform</h1>
              <p className="text-xs" style={{ color: 'var(--sidebar-text-secondary)' }}>
                Enterprise Solution
              </p>
            </div>
          )}
        </div>
        {!(collapsed && !isHovered) && (
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
            style={{ color: 'var(--sidebar-text)' }}
          >
            <MenuFoldOutlined />
          </button>
        )}
      </div>

      <nav className={`flex-1 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 ${collapsed && !isHovered ? 'px-2 py-4' : 'px-4 py-4'}`}>
        {orderedCategories.map((category) => (
          <div key={category}>
            {category !== 'MAIN' && !(collapsed && !isHovered) && (
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all hover:bg-white/10"
                style={{ color: 'var(--sidebar-text-secondary)' }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider">
                  {category}
                </p>
                <CaretDownOutlined
                  className="text-xs transition-transform"
                  style={{
                    transform: expandedCategories[category] ? 'rotate(0deg)' : 'rotate(-90deg)',
                  }}
                />
              </button>
            )}
            {(category === 'MAIN' || expandedCategories[category]) && (
              <div className="space-y-2">
                {groupedItems[category].map((item) => {
                  const isActive = isActivePath(item.path);
                  return (
                    <a
                      key={item.key}
                      href={item.path}
                      className={`flex items-center gap-3 rounded-lg transition-all hover:bg-white/20 active:bg-white/30 ${collapsed && !isHovered ? 'justify-center px-2 py-3' : 'px-4 py-3'}`}
                      style={{
                        color: 'var(--sidebar-text)',
                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      }}
                    >
                      <span className={`shrink-0 ${collapsed && !isHovered ? 'text-xl' : 'text-lg'}`}>{item.icon}</span>
                      {!(collapsed && !isHovered) && (
                        <span className="font-medium whitespace-nowrap text-sm">{t(item.labelKey)}</span>
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className={`border-t border-white/10 ${collapsed && !isHovered ? 'p-2' : 'p-4'}`}>
        <div
          className={`rounded-lg ${collapsed && !isHovered ? 'justify-center p-2' : 'p-4'}`}
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className={`flex items-center gap-3 ${collapsed && !isHovered ? 'justify-center' : ''}`}>
            <div className="relative">
              <div
                className={`rounded-full flex items-center justify-center shrink-0 font-bold ${collapsed && !isHovered ? 'w-8 h-8 text-sm' : 'w-10 h-10'}`}
                style={{ backgroundColor: user?.avatar ? 'transparent' : userSectionColor, color: 'white' }}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                ) : (
                  user?.name?.charAt(0).toUpperCase() || 'U'
                )}
              </div>
              <div
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                style={{ backgroundColor: '#22c55e', borderColor: 'var(--sidebar-bg)' }}
              />
            </div>
            {!(collapsed && !isHovered) && user && (
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-xs" style={{ color: 'var(--sidebar-text-secondary)' }}>
                  {user.email}
                </p>
                {user.roles && user.roles.length > 0 && (
                  <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                    {user.roles[0]}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {!(collapsed && !isHovered) && user && (
            <button
              onClick={logoutOrganization}
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-all"
              disabled={isLoading}
            >
              <LogoutOutlined />
              <span>Leave Organization</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

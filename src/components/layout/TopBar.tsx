'use client';

import { useTheme } from '@/lib/theme/use-theme';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { 
  SearchOutlined, 
  BellOutlined, 
  UserOutlined, 
  LogoutOutlined,
  BulbOutlined,
  SunOutlined,
  MoonOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { Dropdown, Input } from 'antd';

export function TopBar() {
  const { mode, toggleTheme, tokens } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <BulbOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  const languageMenuItems = [
    {
      key: 'en',
      label: 'English',
    },
    {
      key: 'ar',
      label: 'العربية',
    },
  ];

  const handleLanguageChange = (lang: string) => {
    const segments = pathname.split('/');
    segments[1] = lang;
    const newPath = segments.join('/');

    router.push(newPath);
    router.refresh();
  };

  const handleUserMenuClick = (key: string) => {
    if (key === 'logout') {
      logout();
    }
  };

  return (
    <header
      className="h-16 px-6 flex items-center justify-between border-b"
      style={{ backgroundColor: tokens.surface, borderColor: tokens.border }}
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="flex-1 max-w-md flex items-center px-4 py-2 rounded-lg" style={{ backgroundColor: 'var(--surface-muted)' }}>
          <SearchOutlined className="mr-2" style={{ color: tokens.textSecondary }} />
          <Input
            placeholder="Search anything..."
            variant="borderless"
            className="flex-1"
            style={{ color: tokens.text }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="relative transition-all hover:opacity-80"
          style={{ color: tokens.text }}
          aria-label="Notifications"
        >
          <BellOutlined className="text-lg" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ backgroundColor: tokens.danger }} />
        </button>

        <button
          onClick={toggleTheme}
          className="transition-all hover:opacity-80"
          style={{ color: tokens.text }}
          aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
        >
          {mode === 'light' ? <MoonOutlined className="text-lg" /> : <SunOutlined className="text-lg" />}
        </button>

        <Dropdown
          menu={{
            items: languageMenuItems,
            onClick: (e) => handleLanguageChange(e.key),
          }}
          placement="bottomRight"
        >
          <button
            className="transition-all hover:opacity-80"
            style={{ color: tokens.text }}
            aria-label="Change language"
          >
            <GlobalOutlined className="text-lg" />
          </button>
        </Dropdown>

        <Dropdown menu={{ items: userMenuItems, onClick: (e) => handleUserMenuClick(e.key) }} placement="bottomRight">
          <button
            className="flex items-center gap-3 transition-all hover:opacity-80"
            style={{ color: tokens.text }}
          >
            <div className="text-right">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs" style={{ color: tokens.textSecondary }}>
                Super Administrator
              </p>
            </div>
          </button>
        </Dropdown>
      </div>
    </header>
  );
}

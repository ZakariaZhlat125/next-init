import {
  DashboardOutlined,
  UserOutlined,
  SafetyOutlined,
  BankOutlined,
  BranchesOutlined,
  PaperClipOutlined,
  LineChartOutlined,
  TeamOutlined,
  AlertOutlined,
  FileTextOutlined,
  ShoppingOutlined,
  ShopOutlined,
  WalletOutlined,
  DatabaseOutlined,
  SwapOutlined,
  SyncOutlined,
  CalculatorOutlined,
  SettingOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  DollarOutlined,
  ProjectOutlined,
  CheckSquareOutlined,
  AuditOutlined,
} from '@ant-design/icons';

export interface MenuItem {
  key: string;
  icon: React.ReactNode;
  labelKey: string;
  path: string;
  permission?: string | null;
  category?: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

// ==================== ADMIN SECTION MENU ====================
export const adminMenuItems: MenuItem[] = [
  {
    key: 'admin-dashboard',
    icon: <DashboardOutlined />,
    labelKey: 'admin.sidebar.dashboard',
    path: '/admin/dashboard',
    permission: null, // Super Admin only
  },
  {
    key: 'admin-organizations',
    icon: <BankOutlined />,
    labelKey: 'admin.sidebar.organizations',
    path: '/admin/organizations',
    permission: 'organizations:read',
  },
  {
    key: 'admin-users',
    icon: <UserOutlined />,
    labelKey: 'admin.sidebar.users',
    path: '/admin/users',
    permission: 'users:read',
  },
  {
    key: 'admin-roles',
    icon: <SafetyOutlined />,
    labelKey: 'admin.sidebar.roles',
    path: '/admin/roles',
    permission: 'roles:read',
  },
  {
    key: 'admin-settings',
    icon: <SettingOutlined />,
    labelKey: 'admin.sidebar.settings',
    path: '/admin/settings',
    permission: 'settings:write',
  },
  {
    key: 'admin-audit',
    icon: <AuditOutlined />,
    labelKey: 'admin.sidebar.audit',
    path: '/admin/audit',
    permission: 'audit:read',
  },
];

// ==================== ORGANIZATION SECTION MENU ====================
export const organizationMenuItems: (MenuItem | MenuCategory)[] = [
  {
    key: 'org-dashboard',
    icon: <DashboardOutlined />,
    labelKey: 'public.sidebar.dashboard',
    path: '/:establishmentId/dashboard',
    permission: null,
  },

  // MAIN Category
  {
    category: 'MAIN',
    items: [
      {
        key: 'users',
        icon: <UserOutlined />,
        labelKey: 'public.sidebar.users',
        path: '/:establishmentId/users',
        permission: 'users:read',
      },
      {
        key: 'roles',
        icon: <SafetyOutlined />,
        labelKey: 'public.sidebar.roles',
        path: '/:establishmentId/roles',
        permission: 'roles:read',
      },
      {
        key: 'organizations',
        icon: <BankOutlined />,
        labelKey: 'public.sidebar.organizations',
        path: '/:establishmentId/organizations',
        permission: 'organizations:read',
      },
      {
        key: 'branches',
        icon: <BranchesOutlined />,
        labelKey: 'public.sidebar.branches',
        path: '/:establishmentId/branches',
        permission: 'branches:read',
      },
      {
        key: 'attachments',
        icon: <PaperClipOutlined />,
        labelKey: 'public.sidebar.attachments',
        path: '/:establishmentId/attachments',
        permission: null,
      },
      {
        key: 'activity',
        icon: <LineChartOutlined />,
        labelKey: 'public.sidebar.activity',
        path: '/:establishmentId/activity',
        permission: null,
      },
    ],
  },

  // ACCOUNTING Category
  {
    category: 'ACCOUNTING',
    items: [
      {
        key: 'parties',
        icon: <TeamOutlined />,
        labelKey: 'public.sidebar.parties',
        path: '/:establishmentId/parties',
        permission: 'parties:read',
      },
      {
        key: 'accounts',
        icon: <AlertOutlined />,
        labelKey: 'public.sidebar.accounts',
        path: '/:establishmentId/accounts',
        permission: 'accounts:read',
      },
      {
        key: 'invoices',
        icon: <FileTextOutlined />,
        labelKey: 'public.sidebar.invoices',
        path: '/:establishmentId/invoices',
        permission: 'invoices:read',
      },
      {
        key: 'payments',
        icon: <ShoppingOutlined />,
        labelKey: 'public.sidebar.payments',
        path: '/:establishmentId/payments',
        permission: 'payments:read',
      },
      {
        key: 'journal',
        icon: <FileTextOutlined />,
        labelKey: 'public.sidebar.journal',
        path: '/:establishmentId/journal',
        permission: 'journals:read',
      },
      {
        key: 'reports',
        icon: <LineChartOutlined />,
        labelKey: 'public.sidebar.reports',
        path: '/:establishmentId/reports',
        permission: 'reports:financial',
      },
    ],
  },

  // INVENTORY Category
  {
    category: 'INVENTORY',
    items: [
      {
        key: 'products',
        icon: <ShopOutlined />,
        labelKey: 'public.sidebar.products',
        path: '/:establishmentId/products',
        permission: 'products:read',
      },
      {
        key: 'warehouses',
        icon: <DatabaseOutlined />,
        labelKey: 'public.sidebar.warehouses',
        path: '/:establishmentId/warehouses',
        permission: 'warehouses:read',
      },
      {
        key: 'stock-balances',
        icon: <WalletOutlined />,
        labelKey: 'public.sidebar.stockBalances',
        path: '/:establishmentId/stock-balances',
        permission: 'stock:read',
      },
      {
        key: 'stock-movements',
        icon: <SwapOutlined />,
        labelKey: 'public.sidebar.stockMovements',
        path: '/:establishmentId/stock-movements',
        permission: 'stock:read',
      },
      {
        key: 'stock-transfer',
        icon: <SyncOutlined />,
        labelKey: 'public.sidebar.stockTransfer',
        path: '/:establishmentId/stock-transfer',
        permission: 'stock:adjust',
      },
      {
        key: 'stock-count',
        icon: <CalculatorOutlined />,
        labelKey: 'public.sidebar.stockCount',
        path: '/:establishmentId/stock-count',
        permission: 'stock:count',
      },
    ],
  },

  // HR Category
  {
    category: 'HR',
    items: [
      {
        key: 'employees',
        icon: <TeamOutlined />,
        labelKey: 'public.sidebar.employees',
        path: '/:establishmentId/hr/employees',
        permission: 'employees:read',
      },
      {
        key: 'attendance',
        icon: <ClockCircleOutlined />,
        labelKey: 'public.sidebar.attendance',
        path: '/:establishmentId/hr/attendance',
        permission: 'attendance:read',
      },
      {
        key: 'leaves',
        icon: <CalendarOutlined />,
        labelKey: 'public.sidebar.leaves',
        path: '/:establishmentId/hr/leaves',
        permission: 'leaves:read',
      },
      {
        key: 'payroll',
        icon: <DollarOutlined />,
        labelKey: 'public.sidebar.payroll',
        path: '/:establishmentId/hr/payroll',
        permission: 'payroll:read',
      },
    ],
  },

  // PROJECTS Category
  {
    category: 'PROJECTS',
    items: [
      {
        key: 'projects',
        icon: <ProjectOutlined />,
        labelKey: 'public.sidebar.projects',
        path: '/:establishmentId/projects',
        permission: 'projects:read',
      },
      {
        key: 'tasks',
        icon: <CheckSquareOutlined />,
        labelKey: 'public.sidebar.tasks',
        path: '/:establishmentId/tasks',
        permission: 'tasks:read',
      },
      {
        key: 'time-entries',
        icon: <ClockCircleOutlined />,
        labelKey: 'public.sidebar.timeEntries',
        path: '/:establishmentId/time-entries',
        permission: 'time_entries:read',
      },
    ],
  },

  // SETTINGS
  {
    key: 'settings',
    icon: <SettingOutlined />,
    labelKey: 'public.sidebar.settings',
    path: '/:establishmentId/settings',
    permission: 'settings:read',
  },
];

// ==================== INDIVIDUAL SECTION MENU ====================
export const individualMenuItems: MenuItem[] = [
  {
    key: 'my-dashboard',
    icon: <DashboardOutlined />,
    labelKey: 'individual.sidebar.dashboard',
    path: '/me/dashboard',
    permission: null,
  },
  {
    key: 'my-profile',
    icon: <UserOutlined />,
    labelKey: 'individual.sidebar.profile',
    path: '/me/profile',
    permission: null,
  },
  {
    key: 'my-attendance',
    icon: <ClockCircleOutlined />,
    labelKey: 'individual.sidebar.attendance',
    path: '/me/attendance',
    permission: null,
  },
  {
    key: 'my-leaves',
    icon: <CalendarOutlined />,
    labelKey: 'individual.sidebar.leaves',
    path: '/me/leaves',
    permission: null,
  },
  {
    key: 'my-payroll',
    icon: <DollarOutlined />,
    labelKey: 'individual.sidebar.payroll',
    path: '/me/payroll',
    permission: null,
  },
  {
    key: 'my-tasks',
    icon: <CheckSquareOutlined />,
    labelKey: 'individual.sidebar.tasks',
    path: '/me/tasks',
    permission: null,
  },
  {
    key: 'my-time-entries',
    icon: <ClockCircleOutlined />,
    labelKey: 'individual.sidebar.timeEntries',
    path: '/me/time-entries',
    permission: null,
  },
];

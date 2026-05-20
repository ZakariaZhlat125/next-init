// Permissions based on Backend Seeder
export const PERMISSIONS = {
  // Users
  USERS_READ: 'users:read',
  USERS_WRITE: 'users:write',
  USERS_DELETE: 'users:delete',

  // Roles
  ROLES_READ: 'roles:read',
  ROLES_WRITE: 'roles:write',
  ROLES_MANAGE_PERMISSIONS: 'roles:manage_permissions',

  // Organizations
  ORGANIZATIONS_READ: 'organizations:read',
  ORGANIZATIONS_WRITE: 'organizations:write',
  ORGANIZATIONS_DELETE: 'organizations:delete',

  // Branches
  BRANCHES_READ: 'branches:read',
  BRANCHES_WRITE: 'branches:write',
  BRANCHES_DELETE: 'branches:delete',

  // Parties
  PARTIES_READ: 'parties:read',
  PARTIES_WRITE: 'parties:write',
  PARTIES_DELETE: 'parties:delete',

  // Invoices
  INVOICES_READ: 'invoices:read',
  INVOICES_WRITE: 'invoices:write',
  INVOICES_APPROVE: 'invoices:approve',
  INVOICES_CANCEL: 'invoices:cancel',
  INVOICES_DELETE: 'invoices:delete',

  // Payments
  PAYMENTS_READ: 'payments:read',
  PAYMENTS_WRITE: 'payments:write',

  // Accounts
  ACCOUNTS_READ: 'accounts:read',
  ACCOUNTS_WRITE: 'accounts:write',
  ACCOUNTS_DELETE: 'accounts:delete',

  // Journals
  JOURNALS_READ: 'journals:read',
  JOURNALS_WRITE: 'journals:write',
  JOURNALS_POST: 'journals:post',

  // Reports
  REPORTS_FINANCIAL: 'reports:financial',
  REPORTS_INVENTORY: 'reports:inventory',
  REPORTS_HR: 'reports:hr',

  // Products
  PRODUCTS_READ: 'products:read',
  PRODUCTS_WRITE: 'products:write',
  PRODUCTS_DELETE: 'products:delete',

  // Warehouses
  WAREHOUSES_READ: 'warehouses:read',
  WAREHOUSES_WRITE: 'warehouses:write',

  // Stock
  STOCK_READ: 'stock:read',
  STOCK_ADJUST: 'stock:adjust',
  STOCK_COUNT: 'stock:count',
  STOCK_APPROVE_COUNT: 'stock:approve_count',

  // Employees
  EMPLOYEES_READ: 'employees:read',
  EMPLOYEES_WRITE: 'employees:write',
  EMPLOYEES_DELETE: 'employees:delete',

  // Attendance
  ATTENDANCE_READ: 'attendance:read',
  ATTENDANCE_WRITE: 'attendance:write',

  // Leaves
  LEAVES_READ: 'leaves:read',
  LEAVES_WRITE: 'leaves:write',
  LEAVES_APPROVE: 'leaves:approve',

  // Payroll
  PAYROLL_READ: 'payroll:read',
  PAYROLL_WRITE: 'payroll:write',
  PAYROLL_APPROVE: 'payroll:approve',

  // Projects
  PROJECTS_READ: 'projects:read',
  PROJECTS_WRITE: 'projects:write',
  PROJECTS_DELETE: 'projects:delete',

  // Tasks
  TASKS_READ: 'tasks:read',
  TASKS_WRITE: 'tasks:write',
  TASKS_DELETE: 'tasks:delete',

  // Time Entries
  TIME_ENTRIES_READ: 'time_entries:read',
  TIME_ENTRIES_WRITE: 'time_entries:write',

  // Settings
  SETTINGS_READ: 'settings:read',
  SETTINGS_WRITE: 'settings:write',

  // Audit
  AUDIT_READ: 'audit:read',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Permission groups by module
export const PERMISSION_GROUPS = {
  USERS: [PERMISSIONS.USERS_READ, PERMISSIONS.USERS_WRITE, PERMISSIONS.USERS_DELETE],
  ROLES: [PERMISSIONS.ROLES_READ, PERMISSIONS.ROLES_WRITE, PERMISSIONS.ROLES_MANAGE_PERMISSIONS],
  ORGANIZATIONS: [PERMISSIONS.ORGANIZATIONS_READ, PERMISSIONS.ORGANIZATIONS_WRITE, PERMISSIONS.ORGANIZATIONS_DELETE],
  BRANCHES: [PERMISSIONS.BRANCHES_READ, PERMISSIONS.BRANCHES_WRITE, PERMISSIONS.BRANCHES_DELETE],
  PARTIES: [PERMISSIONS.PARTIES_READ, PERMISSIONS.PARTIES_WRITE, PERMISSIONS.PARTIES_DELETE],
  INVOICES: [PERMISSIONS.INVOICES_READ, PERMISSIONS.INVOICES_WRITE, PERMISSIONS.INVOICES_APPROVE, PERMISSIONS.INVOICES_CANCEL, PERMISSIONS.INVOICES_DELETE],
  PAYMENTS: [PERMISSIONS.PAYMENTS_READ, PERMISSIONS.PAYMENTS_WRITE],
  ACCOUNTS: [PERMISSIONS.ACCOUNTS_READ, PERMISSIONS.ACCOUNTS_WRITE, PERMISSIONS.ACCOUNTS_DELETE],
  JOURNALS: [PERMISSIONS.JOURNALS_READ, PERMISSIONS.JOURNALS_WRITE, PERMISSIONS.JOURNALS_POST],
  REPORTS: [PERMISSIONS.REPORTS_FINANCIAL, PERMISSIONS.REPORTS_INVENTORY, PERMISSIONS.REPORTS_HR],
  PRODUCTS: [PERMISSIONS.PRODUCTS_READ, PERMISSIONS.PRODUCTS_WRITE, PERMISSIONS.PRODUCTS_DELETE],
  WAREHOUSES: [PERMISSIONS.WAREHOUSES_READ, PERMISSIONS.WAREHOUSES_WRITE],
  STOCK: [PERMISSIONS.STOCK_READ, PERMISSIONS.STOCK_ADJUST, PERMISSIONS.STOCK_COUNT, PERMISSIONS.STOCK_APPROVE_COUNT],
  EMPLOYEES: [PERMISSIONS.EMPLOYEES_READ, PERMISSIONS.EMPLOYEES_WRITE, PERMISSIONS.EMPLOYEES_DELETE],
  ATTENDANCE: [PERMISSIONS.ATTENDANCE_READ, PERMISSIONS.ATTENDANCE_WRITE],
  LEAVES: [PERMISSIONS.LEAVES_READ, PERMISSIONS.LEAVES_WRITE, PERMISSIONS.LEAVES_APPROVE],
  PAYROLL: [PERMISSIONS.PAYROLL_READ, PERMISSIONS.PAYROLL_WRITE, PERMISSIONS.PAYROLL_APPROVE],
  PROJECTS: [PERMISSIONS.PROJECTS_READ, PERMISSIONS.PROJECTS_WRITE, PERMISSIONS.PROJECTS_DELETE],
  TASKS: [PERMISSIONS.TASKS_READ, PERMISSIONS.TASKS_WRITE, PERMISSIONS.TASKS_DELETE],
  TIME_ENTRIES: [PERMISSIONS.TIME_ENTRIES_READ, PERMISSIONS.TIME_ENTRIES_WRITE],
  SETTINGS: [PERMISSIONS.SETTINGS_READ, PERMISSIONS.SETTINGS_WRITE],
  AUDIT: [PERMISSIONS.AUDIT_READ],
};

// Helper function to check if user has permission
export function hasPermission(userPermissions: string[], requiredPermission: string | string[]): boolean {
  if (!userPermissions || userPermissions.length === 0) {
    return false;
  }

  if (Array.isArray(requiredPermission)) {
    return requiredPermission.some(perm => userPermissions.includes(perm));
  }

  return userPermissions.includes(requiredPermission);
}

// Helper function to check if user has all permissions
export function hasAllPermissions(userPermissions: string[], requiredPermissions: string[]): boolean {
  if (!userPermissions || userPermissions.length === 0) {
    return false;
  }

  return requiredPermissions.every(perm => userPermissions.includes(perm));
}

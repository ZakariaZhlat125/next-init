// User Roles based on Backend Seeder
export enum UserRole {
  SUPER_ADMIN = 'Super Admin',
  ADMIN = 'Admin',
  OWNER_ORGANIZATION = 'OWNER_ORGANIZATION',
  MANAGER = 'Manager',
  USER = 'User',
}

// User Sections
export enum UserSection {
  ADMIN = 'ADMIN',
  ORGANIZATION = 'ORGANIZATION',
  INDIVIDUAL = 'INDIVIDUAL',
}

// Role to Section mapping
export const ROLE_SECTION_MAP: Record<UserRole, UserSection> = {
  [UserRole.SUPER_ADMIN]: UserSection.ADMIN,
  [UserRole.ADMIN]: UserSection.ADMIN,
  [UserRole.OWNER_ORGANIZATION]: UserSection.ORGANIZATION,
  [UserRole.MANAGER]: UserSection.ORGANIZATION,
  [UserRole.USER]: UserSection.INDIVIDUAL,
};

// Get user section based on role
export function getUserSection(role: string): UserSection {
  const userRole = role as UserRole;
  return ROLE_SECTION_MAP[userRole] || UserSection.INDIVIDUAL;
}

// Check if user is admin
export function isAdmin(role: string): boolean {
  return role === UserRole.SUPER_ADMIN || role === UserRole.ADMIN;
}

// Check if user is organization manager
export function isOrganizationManager(role: string): boolean {
  return role === UserRole.OWNER_ORGANIZATION || role === UserRole.MANAGER;
}

// Check if user is individual
export function isIndividual(role: string): boolean {
  return role === UserRole.USER;
}

// Get role display color
export function getRoleColor(role: string): string {
  const colorMap: Record<string, string> = {
    [UserRole.SUPER_ADMIN]: '#ff3b7a',
    [UserRole.ADMIN]: '#ef4444',
    [UserRole.OWNER_ORGANIZATION]: '#0ea5e9',
    [UserRole.MANAGER]: '#3b82f6',
    [UserRole.USER]: '#10b981',
  };
  return colorMap[role] || '#6b7280';
}

// Role display names
export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: 'Super Admin',
  [UserRole.ADMIN]: 'Admin',
  [UserRole.OWNER_ORGANIZATION]: 'Organization Owner',
  [UserRole.MANAGER]: 'Manager',
  [UserRole.USER]: 'Employee',
};

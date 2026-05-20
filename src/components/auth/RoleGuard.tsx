'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { hasPermission, hasAllPermissions } from '@/types/permissions';
import { UserRole } from '@/types/roles';

interface RoleGuardProps {
  children: ReactNode;
  roles?: string[];
  permissions?: string[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

export function RoleGuard({
  children,
  roles = [],
  permissions = [],
  requireAll = false,
  fallback,
}: RoleGuardProps) {
  const { data: session } = useSession();

  if (!session?.user) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You need to be logged in to view this page.</p>
        </div>
      </div>
    );
  }

  const userRoles = session.user.roles || [];
  const userPermissions = session.user.permissions || [];

  // Super Admin has access to everything
  if (userRoles.includes(UserRole.SUPER_ADMIN)) {
    return <>{children}</>;
  }

  const hasRequiredRoles = roles.length === 0 || (
    requireAll
      ? roles.every(role => userRoles.includes(role))
      : roles.some(role => userRoles.includes(role))
  );

  const hasRequiredPermissions = permissions.length === 0 || (
    requireAll
      ? hasAllPermissions(userPermissions, permissions)
      : hasPermission(userPermissions, permissions)
  );

  if (!hasRequiredRoles || !hasRequiredPermissions) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Forbidden</h2>
          <p className="text-gray-600">You don't have permission to access this resource.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

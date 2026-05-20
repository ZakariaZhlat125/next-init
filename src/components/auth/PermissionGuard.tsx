'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { hasPermission, hasAllPermissions } from '@/types/permissions';

interface PermissionGuardProps {
  children: ReactNode;
  permission: string | string[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

export function PermissionGuard({
  children,
  permission,
  requireAll = false,
  fallback,
}: PermissionGuardProps) {
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

  const userPermissions = session.user.permissions || [];

  // Check if user is Super Admin (has all permissions)
  if (session.user.roles?.includes('Super Admin')) {
    return <>{children}</>;
  }

  const hasRequiredPermission = Array.isArray(permission)
    ? requireAll
      ? hasAllPermissions(userPermissions, permission)
      : hasPermission(userPermissions, permission)
    : hasPermission(userPermissions, permission);

  if (!hasRequiredPermission) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Permission Denied</h2>
          <p className="text-gray-600">You don't have the required permission to access this resource.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { UserSection, getUserSection } from '@/types/roles';
import { useRouter } from 'next/navigation';

interface SectionGuardProps {
  children: ReactNode;
  allowedSections: UserSection[];
  fallback?: ReactNode;
  redirectTo?: string;
}

export function SectionGuard({
  children,
  allowedSections,
  fallback,
  redirectTo,
}: SectionGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    if (redirectTo) {
      router.push(redirectTo);
      return null;
    }
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You need to be logged in to view this page.</p>
        </div>
      </div>
    );
  }

  const userRole = session.user.roles?.[0];
  if (!userRole) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Role Assigned</h2>
          <p className="text-gray-600">Your account doesn't have a role assigned.</p>
        </div>
      </div>
    );
  }

  const userSection = getUserSection(userRole);

  if (!allowedSections.includes(userSection)) {
    if (redirectTo) {
      router.push(redirectTo);
      return null;
    }

    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Section Access Denied</h2>
          <p className="text-gray-600">This section is not available for your role.</p>
          <p className="text-sm text-gray-500 mt-2">Your section: {userSection}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

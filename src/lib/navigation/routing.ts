import { User } from '@/types/auth';
import { UserSection, getUserSection } from '@/types/roles';
import { generateSlug } from '@/lib/utils/slug';

// Get default route for user based on their role and section
export function getDefaultRoute(user: User, locale: string = 'en'): string {
  const userRole = user.roles?.[0];
  if (!userRole) {
    return `/${locale}/login`;
  }

  const section = getUserSection(userRole);

  switch (section) {
    case UserSection.ADMIN:
      return `/${locale}/admin/dashboard`;

    case UserSection.ORGANIZATION:
      // If user has only one establishment, go directly to it
      if (user.establishments?.length === 1) {
        const est = user.establishments[0];
        const slug = generateSlug(est.name, est.id);
        return `/${locale}/${slug}/dashboard`;
      }
      // Otherwise, go to establishment selection page
      return `/${locale}/my-establishment`;

    case UserSection.INDIVIDUAL:
      return `/${locale}/me/dashboard`;

    default:
      return `/${locale}/login`;
  }
}

// Check if user can access a specific route
export function canAccessRoute(user: User, route: string): boolean {
  const userRole = user.roles?.[0];
  if (!userRole) {
    return false;
  }

  // Super Admin can access everything
  if (userRole === 'Super Admin') {
    return true;
  }

  const section = getUserSection(userRole);

  // Admin section routes
  if (route.includes('/admin/')) {
    return section === UserSection.ADMIN;
  }

  // Individual section routes
  if (route.includes('/me/')) {
    return section === UserSection.INDIVIDUAL;
  }

  // Organization section routes (with establishment ID)
  // This is a basic check, detailed permission checking should be done by guards
  const establishmentIdPattern = /\/[a-zA-Z]{2}\/[^/]+\//;
  if (establishmentIdPattern.test(route)) {
    return section === UserSection.ORGANIZATION;
  }

  // Allow access to public routes
  return true;
}

// Get section from route path
export function getSectionFromRoute(route: string): UserSection | null {
  if (route.includes('/admin/')) {
    return UserSection.ADMIN;
  }

  if (route.includes('/me/')) {
    return UserSection.INDIVIDUAL;
  }

  // Organization routes typically have establishment ID pattern
  const establishmentIdPattern = /\/[a-zA-Z]{2}\/[^/]+\//;
  if (establishmentIdPattern.test(route)) {
    return UserSection.ORGANIZATION;
  }

  return null;
}

// Check if route requires authentication
export function requiresAuth(route: string): boolean {
  const publicRoutes = ['/login', '/register', '/forget-password', '/reset-password', '/landing'];
  return !publicRoutes.some((publicRoute) => route.includes(publicRoute));
}

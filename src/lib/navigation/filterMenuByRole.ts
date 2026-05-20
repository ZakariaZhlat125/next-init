import { User } from '@/types/auth';
import { UserSection, getUserSection } from '@/types/roles';
import { hasPermission } from '@/types/permissions';
import {
  MenuItem,
  MenuCategory,
  adminMenuItems,
  organizationMenuItems,
  individualMenuItems,
} from './menuItems';
import { generateSlug } from '@/lib/utils/slug';

// Filter single menu item by user permissions
export function filterMenuItem(item: MenuItem, user: User): boolean {
  // If no permission required, allow access
  if (item.permission === null || item.permission === undefined) {
    return true;
  }

  // Super Admin has access to everything
  if (user.roles?.includes('Super Admin')) {
    return true;
  }

  // Check if user has required permission
  return hasPermission(user.permissions || [], item.permission);
}

// Filter menu items by user permissions
export function filterMenuItems(items: MenuItem[], user: User): MenuItem[] {
  return items.filter((item) => filterMenuItem(item, user));
}

// Filter menu with categories
export function filterMenuWithCategories(
  items: (MenuItem | MenuCategory)[],
  user: User
): (MenuItem | MenuCategory)[] {
  return items
    .map((item) => {
      // If it's a category
      if ('category' in item && 'items' in item) {
        const filteredItems = filterMenuItems(item.items, user);
        // Only include category if it has items after filtering
        if (filteredItems.length > 0) {
          return {
            ...item,
            items: filteredItems,
          };
        }
        return null;
      }
      // If it's a regular menu item
      return filterMenuItem(item as MenuItem, user) ? item : null;
    })
    .filter((item): item is MenuItem | MenuCategory => item !== null);
}

// Get menu for specific section
export function getMenuForSection(
  section: UserSection,
  user: User,
  locale: string = 'en',
  establishmentSlug?: string
): (MenuItem | MenuCategory)[] {
  let menuItems: (MenuItem | MenuCategory)[] = [];

  switch (section) {
    case UserSection.ADMIN:
      menuItems = adminMenuItems.map((item) => ({
        ...item,
        path: `/${locale}${item.path}`,
      }));
      break;

    case UserSection.ORGANIZATION:
      menuItems = organizationMenuItems.map((item) => {
        if ('category' in item && 'items' in item) {
          return {
            ...item,
            items: item.items.map((subItem) => ({
              ...subItem,
              path: `/${locale}${subItem.path.replace(':establishmentId', establishmentSlug || '')}`,
            })),
          };
        }
        return {
          ...item,
          path: `/${locale}${(item as MenuItem).path.replace(':establishmentId', establishmentSlug || '')}`,
        };
      });
      break;

    case UserSection.INDIVIDUAL:
      menuItems = individualMenuItems.map((item) => ({
        ...item,
        path: `/${locale}${item.path}`,
      }));
      break;

    default:
      return [];
  }

  // Filter menu items by user permissions
  return filterMenuWithCategories(menuItems, user);
}

// Get menu for user based on their role
export function getMenuForUser(
  user: User,
  locale: string = 'en',
  establishmentSlug?: string
): (MenuItem | MenuCategory)[] {
  const userRole = user.roles?.[0];
  if (!userRole) {
    return [];
  }

  const section = getUserSection(userRole);
  return getMenuForSection(section, user, locale, establishmentSlug);
}

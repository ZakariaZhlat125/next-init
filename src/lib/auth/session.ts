import { getServerSession as getNextAuthServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Session } from 'next-auth';

export async function getServerSession(): Promise<Session | null> {
  return await getNextAuthServerSession(authOptions);
}

export async function requireAuth(): Promise<Session> {
  const session = await getServerSession();
  
  if (!session) {
    throw new Error('Unauthorized');
  }
  
  return session;
}

export function hasPermission(session: Session | null, permission: string): boolean {
  if (!session?.user) return false;
  return session.user.permissions.includes(permission);
}

export function hasRole(session: Session | null, role: string): boolean {
  if (!session?.user) return false;
  return session.user.roles.includes(role);
}

export function hasAnyRole(session: Session | null, roles: string[]): boolean {
  if (!session?.user) return false;
  return roles.some(role => session.user.roles.includes(role));
}

export function hasAllRoles(session: Session | null, roles: string[]): boolean {
  if (!session?.user) return false;
  return roles.every(role => session.user.roles.includes(role));
}

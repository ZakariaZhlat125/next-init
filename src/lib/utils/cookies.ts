import { cookies } from 'next/headers';
import Cookies from 'js-cookie';

/**
 * Server-side cookie utilities
 * Use these in Server Components and Server Actions
 */
export const serverCookies = {
  get: async (name: string) => {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
  },

  set: async (name: string, value: string, options?: { maxAge?: number; httpOnly?: boolean; secure?: boolean; sameSite?: 'strict' | 'lax' | 'none' }) => {
    const cookieStore = await cookies();
    cookieStore.set(name, value, {
      maxAge: options?.maxAge || 7 * 24 * 60 * 60, // 7 days default
      httpOnly: options?.httpOnly ?? true,
      secure: options?.secure ?? process.env.NODE_ENV === 'production',
      sameSite: options?.sameSite || 'strict',
      path: '/',
    });
  },

  delete: async (name: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  },

  getUser: async () => {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user')?.value;
    return userCookie ? JSON.parse(userCookie) : null;
  },

  getAccessToken: async () => {
    const cookieStore = await cookies();
    return cookieStore.get('accessToken')?.value;
  },

  getRefreshToken: async () => {
    const cookieStore = await cookies();
    return cookieStore.get('refreshToken')?.value;
  },
};

/**
 * Client-side cookie utilities
 * Use these in Client Components
 */
export const clientCookies = {
  get: (name: string) => {
    return Cookies.get(name);
  },

  set: (name: string, value: string, options?: { expires?: number; secure?: boolean; sameSite?: 'strict' | 'lax' | 'none' }) => {
    Cookies.set(name, value, {
      expires: options?.expires || 7,
      secure: options?.secure ?? true,
      sameSite: options?.sameSite || 'strict',
    });
  },

  remove: (name: string) => {
    Cookies.remove(name);
  },

  getUser: () => {
    const userCookie = Cookies.get('user');
    return userCookie ? JSON.parse(userCookie) : null;
  },

  getAccessToken: () => {
    return Cookies.get('accessToken');
  },

  getRefreshToken: () => {
    return Cookies.get('refreshToken');
  },
};

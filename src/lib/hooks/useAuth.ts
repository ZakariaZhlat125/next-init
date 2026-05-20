'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LoginCredentials, RegisterData, CompanyRegisterData } from '@/types/auth';
import { authApi } from '@/lib/api/auth';
import Cookies from 'js-cookie';


export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      // First, call Laravel API directly to get the token
      const response = await authApi.login({
        email: credentials.email,
        password: credentials.password,
      });

      // if (response.success && response.data) {
      //   const expiresInDays = (response.data.expiresIn || 900) / 86400;
        
      //   Cookies.set('user', JSON.stringify(response.data.user), { expires: 7, secure: true, sameSite: 'strict' });
      //   Cookies.set('accessToken', response.data.accessToken, { expires: 7, secure: true, sameSite: 'strict' });
      //   Cookies.set('refreshToken', response.data.refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
      //   Cookies.set('expiresIn', String(response.data.expiresIn || 900), { expires: 7, secure: true, sameSite: 'strict' });
      // }

      // Then, sign in with NextAuth using the response
      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return response;
    },
    []
  );

  const register = useCallback(async (data: CompanyRegisterData) => {
    const response = await authApi.registerCompany(data);

    if (response.success && response.data.accessToken) {
      const expiresInDays = (response.data.expiresIn || 900) / 86400;
      
      // Cookies.set('user', JSON.stringify(response.data.user), { expires: 7, secure: true, sameSite: 'strict' });
      // Cookies.set('accessToken', response.data.accessToken, { expires: 7, secure: true, sameSite: 'strict' });
      // Cookies.set('refreshToken', response.data.refreshToken, { expires: 7, secure: true, sameSite: 'strict' });
      // Cookies.set('expiresIn', String(response.data.expiresIn || 900), { expires: 7, secure: true, sameSite: 'strict' });

      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
    }

    return response;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout(); 
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Cookies.remove('user');
      // Cookies.remove('accessToken');
      // Cookies.remove('refreshToken');
      // Cookies.remove('expiresIn');
      await signOut({ redirect: false });
      // Extract locale from pathname and preserve it
      const locale = pathname?.split('/')[1] || 'en';
      router.push(`/${locale}/login`);
    }
  }, [router, pathname]);

  const logoutOrganization = useCallback(async () => {
    // Remove organization context but keep user session
    Cookies.remove('establishmentSlug');
    Cookies.remove('currentOrganization');
    // Extract locale from pathname and preserve it
    const locale = pathname?.split('/')[1] || 'en';
    router.push(`/${locale}/my-establishment`);
  }, [router, pathname]);

  return {
    user: session?.user,
    status,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    login,
    register,
    logout,
    logoutOrganization,
    session,
  };
}

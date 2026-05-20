'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getDefaultRoute } from '@/lib/navigation/routing';

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const { data: session, status } = useSession();
  const locale = params?.locale as string || 'en';

  // useEffect(() => {
  //   if (status === 'loading') return;

  //   if (session?.user) {
  //     // Redirect authenticated user to their default dashboard
  //     const defaultRoute = getDefaultRoute(session.user, locale);
  //     router.push(defaultRoute);
  //   } else {
  //     // Redirect unauthenticated user to landing page
  //     router.push(`/${locale}/landing`);
  //   }
  // }, [session, status, locale, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className='text-black'>test</p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

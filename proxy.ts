// proxy.ts
import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

const publicPages = [
  '/login',
  '/register',
  '/forget-password',
  '/reset-password',
  '/landing',
  '/api/auth',
];

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: '/login',
      error: '/login',
    },
  }
);

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Skip API routes and static files
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Check if it's a public page (with or without locale prefix)
  const isPublicPage = publicPages.some((page) => {
    // Match both /login and /en/login or /ar/login
    const regexWithLocale = new RegExp(`^/(en|ar)${page}(/.*)?$`);
    const regexWithoutLocale = new RegExp(`^${page}(/.*)?$`);
    return regexWithLocale.test(pathname) || regexWithoutLocale.test(pathname);
  });

  const isRootPath = pathname === '/' || pathname === '/en' || pathname === '/ar';

  if (isPublicPage || isRootPath) {
    return intlMiddleware(req);
  }

  return (authMiddleware as any)(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

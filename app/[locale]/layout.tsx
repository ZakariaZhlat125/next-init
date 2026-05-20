"use client";
import { AppShell } from '@/components/layout/AppShell';
import { useParams, usePathname } from 'next/navigation';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const {locale} = useParams();
  console.log("pathname",pathname);
  console.log("locale",locale);
  
  // Paths that should not show sidebar and top bar
  const noLayoutPaths = [`/${locale}`, '/my-establishment', '/login', '/register', '/forget-password', '/reset-password', '/landing'];
  const noLayoutPathsTopBar = [`/${locale}`, '/login', '/register', '/forget-password', '/reset-password', '/landing'];
  const shouldShowSide = !noLayoutPaths.some(path => pathname?.endsWith(path));
  const shouldShowTop = !noLayoutPathsTopBar.some(path => pathname?.endsWith(path));

  return (
    <AppShell showSidebar={shouldShowSide} showTopBar={shouldShowTop}>
      {children}
    </AppShell>
  );
}

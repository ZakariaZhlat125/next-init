'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/lib/theme/theme-provider';
import { SessionProvider } from '@/components/auth/SessionProvider';
import { NextIntlClientProvider } from 'next-intl';
import { useState } from 'react';

interface ProvidersProps {
  children: React.ReactNode;
  messages: any;
  locale: string;
}

export function Providers({ children, messages, locale }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

// src/lib/hooks/useLocaleDirection.ts
'use client';

import {useLocale} from 'next-intl';
import {useMemo} from 'react';

export function useLocaleDirection() {
  const locale = useLocale();
  return useMemo(() => (locale === 'ar' ? 'rtl' : 'ltr'), [locale]);
}

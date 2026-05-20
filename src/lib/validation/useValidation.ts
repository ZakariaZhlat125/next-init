'use client';

import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { createZodErrorMap } from './zodErrorMap';
import * as schemas from './schemas';
import { useMemo } from 'react';

export function useValidation() {
  const t = useTranslations();

  const errorMap = useMemo(() => {
    return createZodErrorMap((key: string, values?: Record<string, any>) => {
      try {
        return t(key, values);
      } catch {
        return key;
      }
    });
  }, [t]);

  useMemo(() => {
    z.setErrorMap(errorMap);
  }, [errorMap]);

  return {
    ...schemas,
    errorMap,
    z,
  };
}

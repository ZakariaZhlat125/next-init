// src/lib/i18n/getTranslations.ts
import {createTranslator} from 'next-intl';
import {getLocale} from 'next-intl/server';
import path from 'path';
import {promises as fs} from 'fs';

type Messages = Record<string, any>;

async function loadNamespace(locale: string, ns: string): Promise<Messages> {
  // First try src/locales
  try {
    return (await import(`../../locales/${locale}/${ns}.json`)).default;
  } catch {}

  // Then try features/{feature}/locales
  try {
    const featuresDir = path.join(process.cwd(), 'features');
    const features = await fs.readdir(featuresDir);
    
    for (const feature of features) {
      try {
        return (await import(`../../../features/${feature}/locales/${locale}/${ns}.json`)).default;
      } catch {}
    }
  } catch {}

  return {};
}

export async function getTranslations(namespaces: string[] = ['public']) {
  const locale = await getLocale();

  // public دائمًا موجود
  const ordered = namespaces.length ? namespaces : ['public'];
  const unique = Array.from(new Set(['public', ...ordered]));

  // messages بالشكل: { public: {...}, home: {...} }
  const messages: Record<string, any> = {};
  await Promise.all(
    unique.map(async (ns) => {
      messages[ns] = await loadNamespace(locale, ns);
    })
  );

  const tr = createTranslator({locale, messages});

  // t('title') -> يجرب home.title ثم public.title حسب ترتيبك
  return (key: string, values?: Record<string, any>) => {
    for (const ns of ordered) {
      try {
        return tr(`${ns}.${key}`, values);
      } catch {}
    }
    // fallback إلى public
    try {
      return tr(`public.${key}`, values);
    } catch {
      return key;
    }
  };
}

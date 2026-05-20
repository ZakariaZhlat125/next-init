import {getRequestConfig} from 'next-intl/server';
import path from 'path';
import {promises as fs} from 'fs';

type Messages = Record<string, any>;

const DEFAULT_LOCALE = 'en'; // غيّره إذا مشروعك عربي افتراضيًا

async function listNamespaces(locale?: string): Promise<string[]> {
  const safeLocale = locale || DEFAULT_LOCALE;

  const namespaces: string[] = ['public'];

  // Load from src/locales
  const mainLocaleDir = path.join(
    process.cwd(),
    'src',
    'locales',
    safeLocale
  );

  try {
    const files = await fs.readdir(mainLocaleDir);
    const mainNamespaces = files
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''));
    
    mainNamespaces.forEach(ns => {
      if (!namespaces.includes(ns)) namespaces.push(ns);
    });
  } catch {}

  // Load from features/{feature}/locales/{locale}
  const featuresDir = path.join(process.cwd(), 'features');
  try {
    const features = await fs.readdir(featuresDir);
    
    for (const feature of features) {
      const featureLocaleDir = path.join(
        featuresDir,
        feature,
        'locales',
        safeLocale
      );
      
      try {
        const files = await fs.readdir(featureLocaleDir);
        const featureNamespaces = files
          .filter((f) => f.endsWith('.json'))
          .map((f) => f.replace(/\.json$/, ''));
        
        featureNamespaces.forEach(ns => {
          if (!namespaces.includes(ns)) namespaces.push(ns);
        });
      } catch {}
    }
  } catch {}

  return namespaces;
}

async function loadNamespace(
  locale: string,
  ns: string
): Promise<Messages> {
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

export default getRequestConfig(async ({requestLocale}) => {
  // requestLocale قد يكون undefined أول مرة
  const locale = (await requestLocale) || DEFAULT_LOCALE;

  const namespaces = await listNamespaces(locale);

  const messages: Record<string, any> = {};
  await Promise.all(
    namespaces.map(async (ns) => {
      messages[ns] = await loadNamespace(locale, ns);
    })
  );

  return {
    locale,
    messages
  };
});

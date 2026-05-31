'use client';

import { useTranslations } from 'next-intl';

export function Landing() {
  const t = useTranslations('landing');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {t('welcome')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          {t('description')}
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            {t('getStarted')}
          </button>
          <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            {t('learnMore')}
          </button>
        </div>
      </div>
    </div>
  );
}

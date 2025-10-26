'use client'

import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';

export function SentryTestButton() {
  const [clicked, setClicked] = useState(false);

  const handleTestError = () => {
    console.log('🔥 Sentry test button clicked!');
    setClicked(true);

    // Сначала отправляем в Sentry
    Sentry.captureException(new Error('🚀 This is your first Sentry error! Everything is working correctly.'));

    console.log('✅ Error sent to Sentry!');

    // Затем бросаем ошибку для видимости
    setTimeout(() => {
      throw new Error('🚀 This is your first Sentry error! (This error is expected for testing)');
    }, 100);
  };

  return (
    <button
      onClick={handleTestError}
      className="fixed bottom-4 right-4 z-[9999] rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-xl hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2 transition-all hover:scale-105"
      aria-label="Test Sentry error tracking"
      style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}
    >
      {clicked ? '✅ Error sent to Sentry!' : '🔥 Test Sentry Error'}
    </button>
  );
}

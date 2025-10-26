'use client'

import * as Sentry from '@sentry/nextjs';

export function SentryTestButton() {
  const handleTestError = () => {
    try {
      throw new Error('🚀 This is your first Sentry error! Everything is working correctly.');
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  };

  return (
    <button
      onClick={handleTestError}
      className="fixed bottom-4 right-4 z-50 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
      aria-label="Test Sentry error tracking"
    >
      🔥 Break the world (Test Sentry)
    </button>
  );
}

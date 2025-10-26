'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

export function SentryInit() {
  useEffect(() => {
    // Инициализируем Sentry только один раз
    if (typeof window !== 'undefined') {
      Sentry.init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
        tracesSampleRate: 0.1,
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        sendDefaultPii: true,
        environment: process.env.NODE_ENV || 'development',
      })

      // Делаем Sentry доступным глобально для тестирования
      if (!window.Sentry) {
        window.Sentry = Sentry
      }

      console.log('✅ Sentry initialized on client')
    }
  }, [])

  return null
}

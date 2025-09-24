'use client'

import { useEffect } from 'react'
import { initWebVitals, reportWebVitals } from '@/lib/web-vitals'

export function WebVitalsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initWebVitals()
  }, [])

  return <>{children}</>
}

export { reportWebVitals }
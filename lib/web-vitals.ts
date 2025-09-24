import { onCLS, onINP, onLCP, onFCP, onTTFB, Metric } from 'web-vitals'

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals'

function getConnectionSpeed() {
  const nav = navigator as any
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection

  if (!connection) return 'unknown'

  return connection.effectiveType || 'unknown'
}

function getDeviceMemory(): number {
  const nav = navigator as any
  return nav.deviceMemory || -1
}

export interface WebVitalsMetric {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  entries: any[]
}

export function sendToAnalytics(metric: Metric) {
  const body = {
    dsn: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
    memory: getDeviceMemory(),
    timestamp: Date.now(),
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric.name, metric.value, metric.rating)

    // Store metrics in sessionStorage for debugging
    const stored = sessionStorage.getItem('webVitals') || '[]'
    const metrics = JSON.parse(stored)
    metrics.push({
      ...metric,
      timestamp: Date.now(),
      page: window.location.pathname
    })
    sessionStorage.setItem('webVitals', JSON.stringify(metrics))
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ANALYTICS_ID) {
    const blob = new Blob([JSON.stringify(body)], { type: 'application/json' })
    if (navigator.sendBeacon) {
      navigator.sendBeacon(vitalsUrl, blob)
    } else {
      fetch(vitalsUrl, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      })
    }
  }
}

export function reportWebVitals(metric: Metric) {
  switch (metric.name) {
    case 'FCP':
    case 'LCP':
    case 'CLS':
    case 'TTFB':
    case 'INP':
      sendToAnalytics(metric)
      break
    default:
      break
  }
}

// Initialize Web Vitals monitoring
export function initWebVitals() {
  try {
    onCLS(sendToAnalytics)
    onINP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onFCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
  } catch (err) {
    console.error('[Web Vitals] Failed to initialize:', err)
  }
}

// Performance budget thresholds
export const PERFORMANCE_BUDGET = {
  LCP: { good: 2500, poor: 4000 }, // milliseconds
  FCP: { good: 1800, poor: 3000 },
  CLS: { good: 0.1, poor: 0.25 },   // score
  INP: { good: 200, poor: 500 },    // milliseconds
  TTFB: { good: 800, poor: 1800 },  // milliseconds
  TBT: { good: 200, poor: 600 },    // milliseconds (Total Blocking Time)

  // Bundle size budgets (in KB, gzipped)
  JS_INITIAL: 180,
  CSS_INITIAL: 40,

  // Device-specific budgets
  mobile: {
    LCP: 2500,
    CLS: 0.05,
    INP: 200,
    TBT: 200
  },
  desktop: {
    LCP: 1800,
    CLS: 0.05,
    INP: 200,
    TBT: 200
  }
}

// Helper to check if metric meets budget
export function checkBudget(metric: Metric): boolean {
  const budget = PERFORMANCE_BUDGET[metric.name as keyof typeof PERFORMANCE_BUDGET]

  if (!budget || typeof budget !== 'object' || !('good' in budget)) {
    return true
  }

  return metric.value <= budget.good
}

// Get all stored metrics for reporting
export function getStoredMetrics(): WebVitalsMetric[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = sessionStorage.getItem('webVitals') || '[]'
    return JSON.parse(stored)
  } catch {
    return []
  }
}

// Clear stored metrics
export function clearStoredMetrics(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('webVitals')
  }
}
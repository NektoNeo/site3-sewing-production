"use client"

import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { usePerformanceMode } from '@/lib/use-performance-mode'

interface PerformanceContextType {
  reducedMotion: boolean
  performanceMode: 'high' | 'balanced' | 'low'
}

const PerformanceContext = createContext<PerformanceContextType>({
  reducedMotion: false,
  performanceMode: 'balanced'
})

export function usePerformance() {
  return useContext(PerformanceContext)
}

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion()
  const performanceMode = usePerformanceMode()

  useEffect(() => {
    // Set performance mode on body for CSS
    document.body.setAttribute('data-perf-mode', performanceMode)

    // Add reduced motion class if needed
    if (reducedMotion) {
      document.body.classList.add('reduced-motion')
    } else {
      document.body.classList.remove('reduced-motion')
    }

    return () => {
      document.body.removeAttribute('data-perf-mode')
      document.body.classList.remove('reduced-motion')
    }
  }, [performanceMode, reducedMotion])

  // Disable heavy effects on low performance mode
  useEffect(() => {
    if (performanceMode === 'low') {
      // Disable backdrop filters
      const elements = document.querySelectorAll('.backdrop-blur, .backdrop-blur-md, .backdrop-blur-lg')
      elements.forEach(el => {
        el.classList.add('backdrop-blur-disabled')
      })
    }
  }, [performanceMode])

  return (
    <PerformanceContext.Provider value={{ reducedMotion, performanceMode }}>
      {children}
    </PerformanceContext.Provider>
  )
}
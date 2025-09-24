'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

// Lazy load the Vanta component with a loading state
const VantaDotsOptimized = dynamic(
  () => import('./vanta-dots-optimized').then(mod => mod.VantaDotsOptimized),
  {
    ssr: false,
    loading: () => <VantaFallback />
  }
)

// Static fallback while loading
function VantaFallback() {
  return (
    <div className="absolute inset-0 hidden lg:block overflow-hidden" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.25
        }}
        aria-hidden="true"
      />
    </div>
  )
}

export function LazyVanta() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Check if we should load based on performance
    const checkLoad = () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (!isDesktop || prefersReducedMotion) {
        return // Don't load on mobile or reduced motion
      }

      // Check if the user has scrolled near the component
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        },
        { rootMargin: '200px' } // Start loading 200px before it comes into view
      )

      // Observe a placeholder element
      const placeholder = document.querySelector('[data-vanta-trigger]')
      if (placeholder) {
        observer.observe(placeholder)
      }

      return () => observer.disconnect()
    }

    // Delay check to prioritize critical resources
    const timer = setTimeout(checkLoad, 100)
    return () => clearTimeout(timer)
  }, [])

  if (!shouldLoad) {
    return <VantaFallback />
  }

  return <VantaDotsOptimized />
}
'use client'

import { useEffect, useRef, useState } from 'react'

interface VantaDotsProps {
  className?: string
  color?: number
  backgroundColor?: number
  size?: number
  spacing?: number
  showLines?: boolean
  mouseControls?: boolean
}

export function OptimizedVantaDots({
  className = '',
  color = 0xD64218,
  backgroundColor = 0x0F1316,
  size = 3.5,
  spacing = 26.0,
  showLines = false,
  mouseControls = true
}: VantaDotsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const vantaRef = useRef<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check device capabilities
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Exit early if not suitable
    if (!mediaQuery.matches || prefersReducedMotion.matches) return

    let vantaInstance: any = null
    let scriptsLoaded = false
    let mounted = true

    // Load dependencies
    const loadDependencies = async () => {
      if (!mounted || scriptsLoaded) return

      try {
        // Dynamic import of Three.js
        if (!window.THREE) {
          const THREE = await import('three')
          window.THREE = THREE
        }

        // Load Vanta DOTS
        if (!window.VANTA) {
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.dots.min.js'
          script.async = true

          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve()
            script.onerror = () => reject(new Error('Failed to load Vanta'))
            document.head.appendChild(script)
          })
        }

        scriptsLoaded = true
        return true
      } catch (error) {
        console.warn('Failed to load Vanta dependencies:', error)
        return false
      }
    }

    // Initialize Vanta effect
    const initVanta = async () => {
      if (!mounted || !containerRef.current || vantaInstance) return

      const loaded = await loadDependencies()
      if (!loaded || !window.VANTA || !window.THREE) return

      try {
        vantaInstance = window.VANTA.DOTS({
          el: containerRef.current,
          THREE: window.THREE,
          mouseControls,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          size,
          spacing,
          showLines,
          color,
          backgroundColor,
          backgroundAlpha: 0
        })

        vantaRef.current = vantaInstance
      } catch (error) {
        console.warn('Failed to initialize Vanta effect:', error)
      }
    }

    // Destroy Vanta effect
    const destroyVanta = () => {
      if (vantaInstance) {
        try {
          vantaInstance.destroy()
          vantaInstance = null
          vantaRef.current = null
        } catch (error) {
          console.warn('Failed to destroy Vanta effect:', error)
        }
      }
    }

    // Setup IntersectionObserver
    let observer: IntersectionObserver | null = null

    if (containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const visible = entry.isIntersecting

            setIsVisible(visible)

            if (visible && mediaQuery.matches && !prefersReducedMotion.matches) {
              initVanta()
            } else if (!visible) {
              destroyVanta()
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '50px'
        }
      )

      observer.observe(containerRef.current)
    }

    // Handle media query changes
    const handleMediaChange = () => {
      if (!mediaQuery.matches || prefersReducedMotion.matches) {
        destroyVanta()
      } else if (isVisible) {
        initVanta()
      }
    }

    // Legacy browser support
    const addMediaListener = (mq: MediaQueryList, handler: () => void) => {
      if (mq.addEventListener) {
        mq.addEventListener('change', handler)
      } else if (mq.addListener) {
        mq.addListener(handler)
      }
    }

    const removeMediaListener = (mq: MediaQueryList, handler: () => void) => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', handler)
      } else if (mq.removeListener) {
        mq.removeListener(handler)
      }
    }

    addMediaListener(mediaQuery, handleMediaChange)
    addMediaListener(prefersReducedMotion, handleMediaChange)

    // Cleanup
    return () => {
      mounted = false
      observer?.disconnect()
      destroyVanta()
      removeMediaListener(mediaQuery, handleMediaChange)
      removeMediaListener(prefersReducedMotion, handleMediaChange)
    }
  }, [color, backgroundColor, size, spacing, showLines, mouseControls])

  return (
    <div
      ref={containerRef}
      className={`vanta-container ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none'
      }}
    />
  )
}

declare global {
  interface Window {
    VANTA: any
    THREE: any
  }
}
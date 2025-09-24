'use client'

import { useEffect, useRef, useState } from 'react'

export function VantaDotsOptimized() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [useVanta, setUseVanta] = useState(false)
  const [useFallback, setUseFallback] = useState(false)
  const vantaRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Performance check
    const checkPerformance = async () => {
      // Check if desktop
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (!isDesktop || prefersReducedMotion) {
        setUseFallback(true)
        return
      }

      // Check performance
      if ('performance' in window && 'memory' in performance) {
        const memory = (performance as any).memory
        const usedMemory = memory.usedJSHeapSize / memory.jsHeapSizeLimit

        // If memory usage is high, use fallback
        if (usedMemory > 0.7) {
          setUseFallback(true)
          return
        }
      }

      // Check frame rate
      let frameCount = 0
      let lastTime = performance.now()
      const checkFPS = () => {
        frameCount++
        const currentTime = performance.now()

        if (currentTime >= lastTime + 1000) {
          const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))

          // If FPS is low, use fallback
          if (fps < 30) {
            setUseFallback(true)
          } else {
            setUseVanta(true)
          }
          return
        }

        if (frameCount < 60) {
          requestAnimationFrame(checkFPS)
        }
      }

      requestAnimationFrame(checkFPS)
    }

    checkPerformance()
  }, [])

  // Load Vanta if performance is good
  useEffect(() => {
    if (!useVanta || typeof window === 'undefined') return

    let mounted = true
    let vantaEffect: any = null

    const loadVanta = async () => {
      if (!containerRef.current || !mounted) return

      try {
        // Dynamic imports for better code splitting
        const [THREE, VantaModule] = await Promise.all([
          import('three'),
          new Promise<any>((resolve) => {
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.dots.min.js'
            script.onload = () => resolve((window as any).VANTA)
            document.head.appendChild(script)
          })
        ])

        if (!mounted || !containerRef.current) return

        // Make THREE available globally
        (window as any).THREE = THREE

        // Wait for VANTA to be ready
        await new Promise(resolve => setTimeout(resolve, 100))

        if (!(window as any).VANTA) return

        vantaEffect = (window as any).VANTA.DOTS({
          el: containerRef.current,
          THREE: THREE,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 0.5,
          scaleMobile: 0.5,
          color: 0xD64218,
          backgroundColor: 0x0F1316,
          size: 2.0,
          spacing: 35.0,
          showLines: false,
          backgroundAlpha: 1.0,
          points: 3.0, // Even fewer points
          maxDistance: 15.0
        })

        vantaRef.current = vantaEffect
      } catch (error) {
        console.error('Failed to load Vanta, using fallback:', error)
        setUseFallback(true)
        setUseVanta(false)
      }
    }

    // Only init when visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !vantaEffect) {
          loadVanta()
        } else if (!entries[0].isIntersecting && vantaEffect) {
          vantaEffect.destroy()
          vantaEffect = null
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      mounted = false
      observer.disconnect()
      if (vantaEffect) {
        vantaEffect.destroy()
      }
    }
  }, [useVanta])

  // CSS-only fallback animation
  if (useFallback) {
    return (
      <div className="absolute inset-0 hidden lg:block overflow-hidden" style={{ zIndex: 0 }}>
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }

          .dot {
            position: absolute;
            width: 4px;
            height: 4px;
            background: #D64218;
            border-radius: 50%;
            animation: float 8s ease-in-out infinite, pulse 4s ease-in-out infinite;
          }
        `}</style>
        {/* Generate static dots */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="dot"
            style={{
              left: `${(i * 33) % 100}%`,
              top: `${(i * 47) % 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${8 + (i % 3) * 2}s`
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 hidden lg:block"
      style={{ zIndex: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  )
}
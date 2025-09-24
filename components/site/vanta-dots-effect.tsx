'use client'

import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

declare global {
  interface Window {
    VANTA: any
  }
}

export function VantaDotsEffect() {
  const containerRef = useRef<HTMLDivElement>(null)
  const vantaRef = useRef<any>(null)
  const rafRef = useRef<number | null>(null)
  const lastFrameTime = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if desktop and not reduced motion
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Check GPU performance
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    const isLowEndGPU = !gl || !gl.getExtension('OES_texture_float')

    if (!isDesktop || prefersReducedMotion || isLowEndGPU) {
      console.log('Vanta skipped - mobile, reduced motion, or low-end GPU')
      return
    }

    let mounted = true
    let vantaEffect: any = null

    const initVanta = async () => {
      if (!containerRef.current || !mounted) return

      try {
        // Make THREE available globally for Vanta
        (window as any).THREE = THREE

        // Load Vanta DOTS dynamically
        if (!window.VANTA) {
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.dots.min.js'

          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve()
            script.onerror = () => reject()
            document.head.appendChild(script)
          })
        }

        // Wait a bit for script to fully initialize
        await new Promise(resolve => setTimeout(resolve, 100))

        if (!window.VANTA || !mounted || !containerRef.current) return

        console.log('Creating optimized Vanta effect...')

        vantaEffect = window.VANTA.DOTS({
          el: containerRef.current,
          THREE: THREE,
          mouseControls: false,  // Disable mouse for better performance
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 0.5,  // Reduce scale for better performance
          scaleMobile: 0.5,
          color: 0xD64218,
          backgroundColor: 0x0F1316,
          size: 2.0,  // Smaller size as requested
          spacing: 35.0,  // Larger spacing as requested
          showLines: false,
          backgroundAlpha: 1.0,
          // Performance optimizations
          points: 4.0,  // Reduce number of points
          maxDistance: 20.0,  // Limit interaction distance
          particleColor: 0xD64218,
          lineColor: 0xD64218
        })

        vantaRef.current = vantaEffect

        // Throttle animation frame rate
        const targetFPS = 30 // Limit to 30 FPS for better performance
        const frameInterval = 1000 / targetFPS

        const animate = (currentTime: number) => {
          if (!mounted || !vantaEffect) return

          const deltaTime = currentTime - lastFrameTime.current

          if (deltaTime > frameInterval) {
            lastFrameTime.current = currentTime - (deltaTime % frameInterval)
            // Animation happens automatically in Vanta
          }

          rafRef.current = requestAnimationFrame(animate)
        }

        // Start throttled animation
        rafRef.current = requestAnimationFrame(animate)

        console.log('Vanta effect created with performance optimizations')
      } catch (error) {
        console.error('Failed to initialize Vanta:', error)
      }
    }

    // Use IntersectionObserver to init only when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !vantaEffect) {
            initVanta()
          } else if (!entry.isIntersecting && vantaEffect) {
            try {
              if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
                rafRef.current = null
              }
              vantaEffect.destroy()
              vantaEffect = null
              vantaRef.current = null
            } catch (e) {
              console.error('Error destroying Vanta:', e)
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    // Cleanup
    return () => {
      mounted = false
      observer.disconnect()

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }

      if (vantaEffect) {
        try {
          vantaEffect.destroy()
          vantaEffect = null
          vantaRef.current = null
        } catch (e) {
          console.error('Error destroying Vanta on cleanup:', e)
        }
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 hidden lg:block"
      style={{
        zIndex: 0,
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    />
  )
}
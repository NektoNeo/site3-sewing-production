'use client'

import { useEffect, useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface GlassNavbarProps {
  children: React.ReactNode
  className?: string
}

export function GlassNavbar({ children, className }: GlassNavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [surfaceTheme, setSurfaceTheme] = useState<'dark' | 'light'>('dark')
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll progress handler
    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight
      const innerHeight = window.innerHeight
      const progress = (scrollY / (scrollHeight - innerHeight)) * 100
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // IntersectionObserver for theme detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const section = entry.target as HTMLElement
            const theme = section.dataset.surface || 'dark'
            setSurfaceTheme(theme as 'dark' | 'light')

            // Set on html element for global CSS usage
            document.documentElement.dataset.surfaceTheme = theme
          }
        })
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: [0, 0.5, 1],
      }
    )

    // Observe all sections with data-surface attribute
    const sections = document.querySelectorAll('section[data-surface]')
    sections.forEach(section => observer.observe(section))

    // Check initial state
    const currentSection = document.elementFromPoint(
      window.innerWidth / 2,
      window.innerHeight / 2
    )?.closest('section[data-surface]') as HTMLElement

    if (currentSection) {
      const theme = currentSection.dataset.surface || 'dark'
      setSurfaceTheme(theme as 'dark' | 'light')
      document.documentElement.dataset.surfaceTheme = theme
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Progress line */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-600)] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Glass navbar */}
      <div
        ref={navRef}
        data-surface-theme={surfaceTheme}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300 ease-out',
          className
        )}
        style={{
          '--nav-bg': surfaceTheme === 'dark'
            ? 'var(--color-surface-glass)'
            : 'rgba(255, 255, 255, 0.85)',
          '--nav-text': surfaceTheme === 'dark'
            ? 'var(--color-text-primary)'
            : 'var(--color-light-ink)',
          '--nav-text-secondary': surfaceTheme === 'dark'
            ? 'var(--color-text-secondary)'
            : '#3F474D',
          '--nav-stroke': surfaceTheme === 'dark'
            ? 'var(--color-stroke)'
            : 'rgba(0, 0, 0, 0.08)',
        } as React.CSSProperties}
      >
        <div className="w-full backdrop-blur-md bg-[var(--nav-bg)] border-b border-[var(--nav-stroke)]">
          <div className="container mx-auto px-4">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
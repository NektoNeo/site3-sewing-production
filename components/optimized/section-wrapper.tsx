'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  estimatedHeight?: number // Estimated height for content-visibility
  id?: string
}

export function SectionWrapper({
  children,
  className,
  estimatedHeight = 800,
  id
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (!hasBeenVisible) {
              setHasBeenVisible(true)
            }
          } else {
            setIsVisible(false)
          }
        })
      },
      {
        // Start observing when section is 100px away from viewport
        rootMargin: '100px',
        threshold: 0.01
      }
    )

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [hasBeenVisible])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        'section-optimized',
        className,
        !hasBeenVisible && 'section-loading'
      )}
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: `auto ${estimatedHeight}px`,
        contain: 'layout style paint'
      }}
      data-visible={isVisible}
    >
      {/* Only render content when it has been visible at least once */}
      {hasBeenVisible ? children : (
        <div style={{ minHeight: `${estimatedHeight}px` }} />
      )}
    </section>
  )
}

// Export a static version for critical sections that should always render
export function CriticalSection({
  children,
  className,
  id
}: Omit<SectionWrapperProps, 'estimatedHeight'>) {
  return (
    <section
      id={id}
      className={cn('section-critical', className)}
    >
      {children}
    </section>
  )
}
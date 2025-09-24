'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade-rise' | 'fade-in' | 'slide-left' | 'slide-right'
  delay?: number
  threshold?: number
}

export function AnimatedSection({
  children,
  className,
  animation = 'fade-rise',
  delay = 0,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return (
    <div
      ref={ref}
      className={cn(
        className,
        isVisible && `animate-${animation}`,
        delay > 0 && `stagger-${delay}`
      )}
      style={{
        animationDelay: isVisible ? `${delay * 0.06}s` : undefined,
      }}
    >
      {children}
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedHeroImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  lqip?: string // Low Quality Image Placeholder (base64)
}

// Generate a simple blur placeholder
const generateBlurDataURL = (width: number = 10, height: number = 10) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // Create gradient similar to brand colors
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#1a1d20')
  gradient.addColorStop(1, '#D64218')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  return canvas.toDataURL()
}

export function OptimizedHeroImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  lqip
}: OptimizedHeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [blurDataURL, setBlurDataURL] = useState(lqip || '')

  useEffect(() => {
    if (!lqip && typeof window !== 'undefined') {
      setBlurDataURL(generateBlurDataURL(10, Math.round(10 * height / width)))
    }
  }, [lqip, width, height])

  // Convert PNG to WebP if needed
  const optimizedSrc = src.replace(/\.png$/i, '.webp').replace(/\.jpg$/i, '.webp')

  // Check if WebP version exists, fallback to original
  const [imageSrc, setImageSrc] = useState(optimizedSrc)

  useEffect(() => {
    // Check if WebP is supported
    const checkWebPSupport = async () => {
      const webP = document.createElement('img')
      webP.onload = webP.onerror = () => {
        if (webP.height === 2) {
          setImageSrc(optimizedSrc)
        } else {
          setImageSrc(src) // Fallback to original
        }
      }
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
    }

    checkWebPSupport()
  }, [src, optimizedSrc])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Blur placeholder */}
      {!isLoaded && blurDataURL && (
        <div
          className="absolute inset-0 scale-110 blur-xl animate-pulse"
          style={{
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}

      {/* Main image */}
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={85}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          'transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, (max-width: 1920px) 1100px, 1200px"
      />
    </div>
  )
}

// Static version for server-side rendering
export function StaticOptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false
}: Omit<OptimizedHeroImageProps, 'lqip'>) {
  // Convert to WebP
  const optimizedSrc = src.replace(/\.png$/i, '.webp').replace(/\.jpg$/i, '.webp')

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={85}
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
    />
  )
}
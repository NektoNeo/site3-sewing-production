'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    VANTA: any
    THREE: any
  }
}

interface VantaBackgroundProps {
  children?: React.ReactNode
}

export default function VantaBackground({ children }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile on mount and on resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!vantaEffect && vantaRef.current && !isMobile) {
      const loadVanta = async () => {
        try {
          // Dynamically import Three.js and Vanta
          const THREE = await import('three')
          window.THREE = THREE

          // Import Vanta DOTS effect
          await import('vanta/dist/vanta.dots.min')

          if (window.VANTA && vantaRef.current) {
            const effect = window.VANTA.DOTS({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0xff6b35,  // Orange accent color
              color2: 0xff8623,  // Secondary orange
              backgroundColor: 0x18181e,  // Dark background
              size: 3.10,
              spacing: 46.00,
              showLines: false
            })
            setVantaEffect(effect)
          }
        } catch (error) {
          console.error('Error loading Vanta effect:', error)
        }
      }

      loadVanta()
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy()
      }
    }
  }, [vantaEffect, isMobile])

  if (isMobile) {
    // On mobile, return gradient background
    return (
      <div className="absolute inset-0 bg-[#18181e] z-[0]" aria-hidden="true">
        {children}
      </div>
    )
  }

  // On desktop, return Vanta background
  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 z-[0]"
      aria-hidden="true"
      style={{ minHeight: '100vh' }}
    >
      {children}
    </div>
  )
}
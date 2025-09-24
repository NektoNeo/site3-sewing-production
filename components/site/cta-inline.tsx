'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

declare global {
  interface Window {
    VANTA: any
    THREE: any
  }
}

const services = [
  'Пошив одежды',
  'Производство сумок',
  'Мерч и брендинг',
  'Разработка дизайна',
  'Консультация'
]

export function CtaInline() {
  const [service, setService] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectOpen, setSelectOpen] = useState(false)

  const animRef = useRef<HTMLDivElement | null>(null)
  const vanta = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const desktop = window.matchMedia('(min-width: 1024px)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    console.log('Device check - desktop:', desktop, 'reduced motion:', reduced)

    // Временно убираем проверки для тестирования
    // if (!desktop || reduced) return

    // Load Three.js and Vanta from CDN
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }

        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    const initVanta = async () => {
      try {
        console.log('Loading Three.js...')
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js')

        // Wait a bit for Three.js to be available
        await new Promise(resolve => setTimeout(resolve, 100))
        console.log('Three.js loaded, available:', !!window.THREE)

        console.log('Loading Vanta.js...')
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js')
        console.log('Vanta loaded, available:', !!window.VANTA)

        if (!animRef.current) {
          console.log('Animation ref not available')
          return
        }

        if (!window.VANTA) {
          console.log('VANTA not available on window')
          return
        }

        console.log('Initializing Vanta animation...')
        vanta.current = window.VANTA.DOTS({
          el: animRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          size: 4.0,
          spacing: 28.0,
          showLines: false,
          color: 0xf97316,
          backgroundColor: 0x121418
        })
        console.log('Vanta animation initialized successfully')
      } catch (error) {
        console.warn('Failed to initialize Vanta animation:', error)
      }
    }

    initVanta()

    return () => {
      if (vanta.current?.destroy) {
        vanta.current.destroy()
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) return

    setIsSubmitting(true)
    // TODO: API integration
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)

    // Reset form
    setService('')
    setPhone('')
    setComment('')
  }

  return (
    <section id="cta-quick" className="relative w-full -my-16 py-24 overflow-hidden">
      <div className="relative overflow-hidden rounded-3xl min-h-[600px] mx-4 lg:mx-8">
        {/* Vanta background layer */}
        <div ref={animRef} aria-hidden="true" className="absolute inset-0 -z-10" />

        {/* Fallback backgrounds for mobile/reduced-motion - only show when Vanta is not active */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] lg:hidden" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-500 lg:hidden"
          style={{ filter: 'blur(120px)', opacity: 0.22 }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 relative z-10 py-8">
        {/* Heading */}
        <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-8">
          Оставить заявку
        </h2>

        {/* Glass form container */}
        <form
          onSubmit={handleSubmit}
          className="glass max-w-5xl mx-auto p-6 rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(165, 171, 175, 0.24)'
          }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Custom Select */}
            <div className="relative w-full md:flex-1">
              <button
                type="button"
                onClick={() => setSelectOpen(!selectOpen)}
                className="w-full px-5 py-3.5 rounded-full text-left text-white/90 placeholder-white/50"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(165, 171, 175, 0.24)'
                }}
              >
                <span className={service ? 'text-white' : 'text-white/50'}>
                  {service || 'Что нужно?'}
                </span>
                <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 transition-transform ${selectOpen ? 'rotate-180' : ''}`} />
              </button>

              {selectOpen && (
                <div
                  className="absolute top-full mt-2 w-full rounded-2xl overflow-hidden z-20"
                  style={{
                    background: 'rgba(30, 41, 59, 0.95)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(165, 171, 175, 0.24)'
                  }}
                >
                  {services.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setService(item)
                        setSelectOpen(false)
                      }}
                      className="w-full px-5 py-3 text-left text-white/90 hover:bg-white/10 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Input */}
            <input
              type="tel"
              placeholder="Телефон *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full md:flex-1 px-5 py-3.5 rounded-full text-white placeholder-white/50"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(165, 171, 175, 0.24)'
              }}
            />

            {/* Comment Input (optional) */}
            <input
              type="text"
              placeholder="Комментарий"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full md:flex-1 px-5 py-3.5 rounded-full text-white placeholder-white/50"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(165, 171, 175, 0.24)'
              }}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !phone.trim()}
              className="w-full md:w-auto px-8 py-3.5 rounded-full font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                boxShadow: '0 4px 24px rgba(249, 115, 22, 0.3)'
              }}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
          </div>
        </form>
        </div>
      </div>
    </section>
  )
}
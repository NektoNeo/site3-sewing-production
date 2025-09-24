'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const { scrollY } = useScroll()

  // Parallax transforms (disabled if prefers-reduced-motion)
  const circleY = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : -6])
  const giantTypeY = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : 6])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Sentinel for header contrast */}
      <div className="contrast-dark absolute inset-0 -z-10" aria-hidden="true" />

      {/* Layer 1: Deep dark gradient background */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(120deg, #121416 0%, #1C2228 60%, #22262B 100%)'
        }}
        aria-hidden="true"
      />

      {/* Layer 2: Orange bokeh disk */}
      <motion.div
        className="absolute right-[8%] top-[18%] z-[2] rounded-full bg-[#FF6B35] opacity-30 blur-[120px]"
        style={{
          width: 'clamp(520px, 42vw, 820px)',
          height: 'clamp(520px, 42vw, 820px)',
          y: circleY
        }}
        aria-hidden="true"
      />

      {/* Layer 3: Giant background typography */}
      <motion.div
        className="absolute inset-0 z-[3] flex items-center justify-center overflow-hidden"
        style={{ y: giantTypeY }}
        aria-hidden="true"
      >
        <span
          className="pointer-events-none select-none font-black text-white/5"
          style={{
            fontFamily: 'var(--font-space, var(--font-display))',
            fontSize: '28vw',
            letterSpacing: '-0.04em'
          }}
        >
          ATELIER
        </span>
      </motion.div>

      {/* Layer 4: Main Content */}
      <div className="relative z-[10] flex min-h-screen items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            {/* Headline with updated sizing */}
            <motion.h1
              className="font-display leading-[0.9] text-white mb-8"
              style={{
                fontSize: 'clamp(44px, 8vw, 92px)',
                letterSpacing: '-0.03em'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              Швейное производство
              <br />
              <span className="text-[#FF6B35]">полного цикла</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              От разработки лекал до готового изделия. 10 000+ изделий в месяц для брендов и частных заказов
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button
                asChild
                variant="primary"
                size="lg"
                className="px-10 py-4 text-base font-medium shadow-lg shadow-[#FF6B35]/20"
              >
                <Link href="#contacts">
                  Рассчитать заказ
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="lg"
                className="px-10 py-4 text-base font-medium text-white/90 border border-white/10 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-white/20 hover:text-white"
              >
                <Link href="#services">
                  Наши услуги
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-2 bg-white/40 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
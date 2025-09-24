'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { StitchCircle, StitchLine } from '@/components/decor/Stitch'

export default function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const { scrollY } = useScroll()

  // Parallax transforms (disabled if prefers-reduced-motion)
  const circleY = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : -6])
  const giantTypeY = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : 6])
  const mascotY = useTransform(scrollY, [0, 300], [0, prefersReducedMotion ? 0 : -40])

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

      {/* Layer 1: Smoother gradient background */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(120deg, #121416 0%, #1B1F23 55%, #202528 100%)'
        }}
        aria-hidden="true"
      />

      {/* Layer 2: Softer orange glow disk */}
      <motion.div
        className="absolute left-[35%] top-[22%] z-[2] rounded-full bg-[#FF6B35] opacity-[0.19] blur-[110px]"
        style={{
          width: 'clamp(520px, 42vw, 820px)',
          height: 'clamp(520px, 42vw, 820px)',
          y: circleY
        }}
        aria-hidden="true"
      />

      {/* Layer 3: More subtle giant background typography */}
      <motion.div
        className="absolute inset-0 z-[3] flex items-center justify-center overflow-hidden"
        style={{ y: giantTypeY }}
        aria-hidden="true"
      >
        <span
          className="pointer-events-none select-none font-black text-white/[0.045]"
          style={{
            fontFamily: 'var(--font-space, var(--font-display))',
            fontSize: '28vw',
            letterSpacing: '-0.04em',
            transform: 'translateX(-5%)'
          }}
        >
          ATELIER
        </span>
      </motion.div>

      {/* Layer 4: Mascot decorative element with smoke effect */}
      <div className="pointer-events-none absolute bottom-0 right-[7vw] z-[5]" aria-hidden="true">
        {/* Smoke/mist effect behind mascot */}
        <div
          className="absolute inset-0 -translate-x-1/4 scale-150"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 107, 53, 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Mascot with parallax */}
        <motion.div
          style={{ y: mascotY }}
          className="relative"
        >
          <Image
            src="/brand/mascot.png"
            alt=""
            width={1100}
            height={1100}
            priority
            className="img-mask-soft drop-shadow-[0_20px_80px_rgba(0,0,0,.45)]
                       max-h-[95vh] w-auto
                       md:scale-100 md:translate-y-6
                       lg:scale-105 lg:translate-y-0"
          />
        </motion.div>
      </div>

      {/* Layer 5: Main Content */}
      <div className="relative z-[10] flex min-h-screen items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            {/* Headline with tighter typography */}
            <motion.h1
              className="font-display leading-[0.85] text-white mb-8"
              style={{
                fontSize: 'clamp(44px, 8vw, 92px)',
                letterSpacing: '-0.035em'
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

            {/* CTA Buttons with consistent spacing */}
            <motion.div
              className="relative flex flex-wrap gap-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Decorative stitch circle behind CTA */}
              <StitchCircle
                className="absolute -left-16 -top-10 z-0"
                size={140}
                opacity={0.25}
              />

              <Button
                asChild
                variant="primary"
                size="lg"
                className="relative z-10 h-[52px] px-10 text-base font-medium"
              >
                <Link href="#contacts">
                  Рассчитать заказ
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="lg"
                className="relative z-10 h-[52px] px-10 text-base font-medium"
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
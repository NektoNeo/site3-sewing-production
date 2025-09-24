'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { RippleButton } from '@/components/ui/ripple-button'
import { StitchCircle, StitchLine } from '@/components/decor/Stitch'
import { OptimizedHeroImage } from '@/components/optimized/optimized-hero-image'

export default function Hero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true)
  const { scrollY } = useScroll()

  // Parallax transforms (disabled if prefers-reduced-motion)
  const gradientY = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : -10])
  const giantTypeY = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : 8])
  const mascotY = useTransform(scrollY, [0, 300], [0, prefersReducedMotion ? 0 : -20])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <section data-surface="dark" className="relative min-h-screen overflow-hidden">
      {/* Sentinel for header contrast */}
      <div className="contrast-dark absolute inset-0 -z-10" aria-hidden="true" />

      {/* Layer 1: Base dark background */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(135deg, #0a0b0c 0%, #141618 50%, #1a1d20 100%)'
        }}
        aria-hidden="true"
      />

      {/* Layer 2: Radial gradient from center-right */}
      <motion.div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'radial-gradient(circle at center right, rgba(214, 66, 24, 0.22) 0%, transparent 65%)',
          y: gradientY
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
          className="pointer-events-none select-none font-black text-white/[0.08]"
          style={{
            fontFamily: 'var(--font-space, var(--font-display))',
            fontSize: '42vw',
            letterSpacing: '0.1em',
            transform: 'translateX(-12%)'
          }}
        >
          AIR
        </span>
      </motion.div>

      {/* Layer 4: Character/Mascot fixed on the right - за слоем молнии */}
      <div className="pointer-events-none absolute -bottom-[20px] right-0 z-[4] lg:right-[2%] xl:right-[5%]" aria-hidden="true">
        {/* Decorative stitch line around character */}
        <StitchLine
          className="absolute right-[850px] top-[10%] z-10 hidden xl:block"
          height={400}
          width={2}
          opacity={0.35}
        />

        {/* Character with fixed positioning */}
        <motion.div
          style={{ y: mascotY }}
          className="relative"
        >
          <OptimizedHeroImage
            src="/brand/mascot.png"
            alt=""
            width={1050}
            height={1575}
            priority
            className="drop-shadow-[0_20px_60px_rgba(0,0,0,.35)]
                       max-h-[95vh] w-auto object-contain
                       md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1050px] 2xl:max-w-[1150px]"
          />
        </motion.div>
      </div>

      {/* Layer 5: Main Content */}
      <div className="relative z-[10] flex min-h-screen items-center pt-[var(--space-3xl)] pb-[var(--space-3xl)] md:py-0">
        <div className="container mx-auto px-[var(--space-lg)] lg:px-12">
          <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            {/* Headline with responsive sizing */}
            <motion.h1
              className="font-display leading-[0.9] text-white mb-6 md:mb-[var(--space-xl)]"
              style={{
                fontSize: 'clamp(36px, 7vw, 80px)',
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

            {/* Subtitle with better contrast */}
            <motion.p
              className="text-base md:text-lg lg:text-xl text-gray-200 mb-10 md:mb-[var(--space-2xl)] max-w-xl lg:max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              От разработки лекал до готового изделия. 10 000+ изделий в месяц для брендов и частных заказов
            </motion.p>

            {/* CTA Buttons with sewing stitch decorations */}
            <motion.div
              className="relative flex flex-wrap gap-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Multiple decorative stitches around CTAs */}
              <StitchCircle
                className="absolute -left-14 -top-8 z-0"
                size={120}
                opacity={0.3}
              />
              <StitchLine
                className="absolute -right-8 top-1/2 -translate-y-1/2 z-0"
                width={60}
                height={2}
                opacity={0.25}
              />
              <StitchLine
                className="absolute left-[180px] -bottom-6 z-0"
                width={80}
                height={2}
                opacity={0.2}
              />

              <Link href="#contacts" className="relative z-10">
                <RippleButton
                  variant="primary"
                  size="lg"
                  className="h-[54px] px-12 text-base font-semibold shadow-lg
                            hover:shadow-xl"
                >
                  Рассчитать заказ
                </RippleButton>
              </Link>

              <Link href="#services" className="relative z-10">
                <RippleButton
                  variant="secondary"
                  size="lg"
                  className="h-[54px] px-12 text-base font-medium
                            border-2 border-white/20 hover:border-white/30"
                >
                  Наши услуги
                </RippleButton>
              </Link>
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
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Search, Lightbulb, Factory, TrendingUp } from 'lucide-react'

const steps = [
  {
    t: 'Анализ',
    d: 'изучаем ваш бренд, ЦА и задачи.',
    Icon: Search,
    className: 'step--1',
    iconClass: 'icon--1'
  },
  {
    t: 'Концепция',
    d: 'предлагаем дизайн и варианты изделий.',
    Icon: Lightbulb,
    className: 'step--2',
    iconClass: 'icon--2'
  },
  {
    t: 'Производство',
    d: 'шьем и наносим фирменную символику.',
    Icon: Factory,
    className: 'step--3',
    iconClass: 'icon--3'
  },
  {
    t: 'Продвижение',
    d: 'помогаем интегрировать мерч в маркетинговую стратегию.',
    Icon: TrendingUp,
    className: 'step--4',
    iconClass: 'icon--4'
  }
]

export default function Steps() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isReduced, setIsReduced] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReduced(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsReduced(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // GSAP ScrollTrigger animation
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const isDesktop = window.innerWidth >= 1024
    if (!isDesktop || isReduced) return // fallback: no pinning on mobile or reduced motion

    let cleanup: (() => void) | undefined

    // Задержка для правильной инициализации после загрузки страницы
    const initTimeout = setTimeout(async () => {
      const gsap = (await import('gsap')).default
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Обновляем ScrollTrigger после загрузки
      ScrollTrigger.refresh()

      // Find step elements
      const stepElements = el.querySelectorAll('.step-item')
      if (stepElements.length !== 4) return

      // Initial states
      gsap.set(stepElements, { opacity: 0.35, scale: 0.98 })

      // Create timeline with proper pinning
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el,
          start: 'top top', // Начинаем пиннинг когда верх секции касается верха экрана
          end: () => `+=${window.innerHeight * 3}`, // Пиннинг на 3 высоты экрана
          scrub: 1,
          pin: true,
          pinSpacing: true,
          pinReparent: true, // Добавлено для правильного позиционирования
          anticipatePin: 1,
          markers: false, // Маркеры отладки отключены
          onUpdate: (self) => {
            if (self.progress > 0 && self.progress < 1) {
              console.log('Progress:', Math.round(self.progress * 100) + '%')
            }
          }
        }
      })

      // Animate each step
      stepElements.forEach((step, i) => {
        const label = `step${i + 1}`

        tl.addLabel(label)
          // Fade out all steps
          .to(stepElements, {
            opacity: 0.25,
            scale: 0.98,
            duration: 0.25
          }, label)
          // Highlight current step
          .to(step, {
            opacity: 1,
            scale: 1,
            duration: 0.5
          }, label)
          // Animate icon
          .fromTo(step.querySelector('.step-icon'), {
            rotate: 0,
            scale: 1
          }, {
            rotate: 360,
            scale: 1.2,
            duration: 0.8,
            ease: 'power2.out'
          }, label)
          // Animate the giant number
          .fromTo(step.querySelector('.step-number'), {
            opacity: 0.07
          }, {
            opacity: 0.15,
            duration: 0.5
          }, label)
      })

      // Leave final state visible for a moment
      tl.to({}, { duration: 0.2 })

      cleanup = () => {
        ScrollTrigger.getAll().forEach(t => t.kill())
      }
    }, 100) // Задержка 100мс для правильной инициализации

    return () => {
      clearTimeout(initTimeout)
      if (cleanup) cleanup()
    }
  }, [isReduced])

  return (
    <section ref={sectionRef} id='steps' className='section min-h-screen flex flex-col justify-center'>
      <div className='container mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='h2 text-fg mb-4'>Как мы работаем?</h2>
          <p className='text-fg-muted text-base md:text-lg max-w-2xl mx-auto'>
            Четыре простых шага к вашему идеальному мерчу. Прозрачный процесс от идеи до реализации.
          </p>
        </div>
        <div className='h2line mb-16'/>
        <ul className='grid grid-cols-1 md:grid-cols-4 gap-[var(--space-xl)] relative'>
          {steps.map((s, i) => {
            const N = i + 1
            return (
              <li key={i} className={`step-item relative p-4 ${s.className}`}>
                <span
                  aria-hidden
                  className='step-number absolute -top-6 -left-2 text-[clamp(120px,16vw,220px)] font-black tracking-[-.04em] text-[var(--color-text-secondary)] opacity-[.07] select-none leading-none pointer-events-none'
                >
                  {N}
                </span>
                <div className='relative z-10 flex flex-col items-start gap-3'>
                  <s.Icon aria-hidden className={`step-icon size-8 text-brand mb-1 ${s.iconClass}`}/>
                  <div className='flex flex-col gap-2'>
                    <h3 className='text-2xl font-semibold text-fg leading-[1.2]'>{s.t}</h3>
                    <p className='text-fg-muted max-w-[28ch] leading-[1.5]'>{s.d}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
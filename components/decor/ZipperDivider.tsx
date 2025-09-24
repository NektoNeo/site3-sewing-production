'use client'

import React, {useRef, useEffect, useState} from 'react'
import {motion, useScroll, useSpring, useTransform, useInView, useMotionValue} from 'framer-motion'
import {useMediaQuery} from '@/lib/use-media-query'
import ZipperDefs from './ZipperDefs'

/**
 * ZipperDivider — анимированная молния-переход между секциями.
 * - Начальное состояние: слегка расстёгнута (10-15%)
 * - При скролле: бегунок движется вправо, зубья замыкаются
 * - Оптимизирована для 60fps с will-change и GPU-слоями
 * - Graceful fallback для prefers-reduced-motion
 */
export default function ZipperDivider({
  initialOpen = 0.15,
  height = 64,
  accent = 'var(--zip-head)',
  showStitches = true
}: {
  initialOpen?: number;
  height?: number;
  accent?: string;
  showStitches?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isIOSafari, setIsIOSafari] = useState(false)

  // Детекция iOS Safari < 16 для отключения анимаций
  useEffect(() => {
    const ua = navigator.userAgent
    const isIOS = /iPad|iPhone|iPod/.test(ua)
    const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua)
    const version = ua.match(/Version\/(\d+)/)?.[1]
    setIsIOSafari(isIOS && isSafari && (!version || parseInt(version) < 16))
  }, [])

  // IntersectionObserver для активации анимации в viewport
  const inView = useInView(ref, {
    amount: 0.3,
    margin: '-10% 0px -10% 0px',
    once: false
  })

  // Scroll-based animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'center 10%']
  })

  // Spring physics для плавности
  const eased = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    mass: 0.3
  })

  // Проверка условий для анимации
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const shouldAnimate = !prefersReduced && !isIOSafari && inView

  // Создаем motion values для позиций
  const animatedZip = useTransform(eased, [0, 1], [initialOpen, 1])
  const animatedSliderX = useTransform(animatedZip, v => v * 1000)

  // Статичные значения для fallback
  const staticSliderX = useMotionValue(1000)
  const staticMaskWidth = useMotionValue(1000)

  // Выбираем значения в зависимости от условий
  const sliderX = shouldAnimate ? animatedSliderX : staticSliderX
  const maskWidth = shouldAnimate ? animatedSliderX : staticMaskWidth

  return (
    <div
      ref={ref}
      className='zipper-wrap relative'
      style={{
        height,
        willChange: shouldAnimate ? 'transform' : 'auto',
        isolation: 'isolate'
      }}
    >
      <ZipperDefs />

      <div className='relative w-full h-full'>
        <motion.svg
          className='w-full h-full zipper-shadow'
          viewBox='0 0 1000 80'
          preserveAspectRatio='none'
          role='presentation'
          focusable='false'
          aria-hidden
          style={{ shapeRendering: 'geometricPrecision' }}
        >
          {/* Лента молнии (верхняя и нижняя полосы) */}
          <path
            d='M0,30 L1000,30 L1000,0 L0,0 Z'
            fill='var(--zip-tape)'
            opacity='0.9'
          />
          <path
            d='M0,50 L1000,50 L1000,80 L0,80 Z'
            fill='var(--zip-tape)'
            opacity='0.9'
          />

          {/* Декоративные строчки */}
          {showStitches && (
            <>
              <path
                d='M0,28 L1000,28'
                stroke='var(--mist-300)'
                strokeOpacity='0.2'
                strokeWidth='1'
                strokeDasharray='4 8'
              />
              <path
                d='M0,52 L1000,52'
                stroke='var(--mist-300)'
                strokeOpacity='0.2'
                strokeWidth='1'
                strokeDasharray='4 8'
              />
            </>
          )}

          {/* Маска для зубцов молнии */}
          <defs>
            <mask id='zipper-teeth-mask'>
              <motion.rect
                x='0'
                y='30'
                height='20'
                fill='white'
                style={{
                  width: maskWidth
                }}
              />
            </mask>
          </defs>

          {/* Зубцы молнии - показываем только застёгнутую часть */}
          <g mask='url(#zipper-teeth-mask)'>
            <rect
              x='0'
              y='30'
              width='1000'
              height='20'
              fill='url(#zip-teeth-pattern)'
            />
          </g>

          {/* Бегунок молнии с интерактивностью */}
          <motion.g
            style={{
              x: sliderX,
              willChange: shouldAnimate ? 'transform' : 'auto'
            }}
            filter='url(#zip-slider-shadow)'
            {...(!prefersReduced && {
              role: 'button',
              tabIndex: 0,
              className: 'cursor-pointer focus:outline-none',
              'aria-label': 'Перейти к разделу "О нас"',
              onClick: () => {
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
              },
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
                }
              }
            })}
          >
            {/* Основа бегунка */}
            <rect
              x='-15'
              y='20'
              width='30'
              height='40'
              rx='6'
              fill='url(#zip-slider-gradient)'
            />
            {/* Центральная часть бегунка */}
            <rect
              x='-12'
              y='24'
              width='24'
              height='32'
              rx='4'
              fill={accent}
            />
            {/* Декоративный элемент */}
            <rect
              x='-2'
              y='32'
              width='4'
              height='16'
              rx='2'
              fill='var(--zip-metal)'
              opacity='0.7'
            />
            {/* Язычок бегунка */}
            <circle cx='0' cy='64' r='4' fill='var(--zip-metal)' />
          </motion.g>
        </motion.svg>

        {/* Скрытая ссылка для скринридеров */}
        {prefersReduced && (
          <a href='#about' className='sr-only'>
            Перейти к разделу "О нас"
          </a>
        )}
      </div>
    </div>
  )
}
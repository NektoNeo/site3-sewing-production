'use client'

import React, {useRef} from 'react'
import {motion, useScroll, useSpring, useTransform, useInView} from 'framer-motion'
import ZipperDefs from './ZipperDefs'

/**
 * ZipperDivider — лёгкий SVG‑divider между секциями.
 * - progress = 0: слегка расстёгнута (левый участок без зубцов)
 * - progress -> 1: бегунок идёт вправо, зубцы «соединяют» разделы
 * Prefers-reduced-motion: прогресс зафиксирован = 1 (полностью застёгнута)
 */
export default function ZipperDivider({initialOpen=0.25, height=120, accent='var(--zip-head)', showStitches=true}:{initialOpen?:number;height?:number;accent?:string;showStitches?:boolean}){
  const ref = useRef<HTMLDivElement|null>(null)
  const inView = useInView(ref, {amount:0.2, margin:'-15% 0px -15% 0px'})
  const {scrollYProgress} = useScroll({target: ref, offset: ['start end','end start']})
  const eased = useSpring(scrollYProgress, {stiffness: 120, damping: 20, mass: .2})

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // от slightly open (initialOpen) до полностью закрыто
  const zip = useTransform(eased, [0,1], [initialOpen, 1])
  const finalZip = prefersReduced ? 1 : zip
  const headX = useTransform(finalZip, v => v*1000) // в системе координат viewBox
  const maskW = headX

  return (
    <div ref={ref} className='zipper-wrap zipper-sticky' style={{height}}>
      <ZipperDefs/>
      <div className='relative'>
        <div aria-hidden className='absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(120%_120%_at_50%_50%,rgba(0,0,0,.38),rgba(0,0,0,0)_70%)]'/>
        <motion.svg className='w-full h-full zipper-shadow' viewBox={`0 0 1000 ${height}`} preserveAspectRatio='none' role='presentation' focusable='false' aria-hidden>
        {/* Ткани (верх/низ) — тонкая имитация кантов */}
        <path d='M0,70 C200,58 800,58 1000,70 L1000,0 L0,0 Z' fill='var(--zip-tape)' opacity='.95'/>
        <path d='M0,70 C200,82 800,82 1000,70 L1000,140 L0,140 Z' fill='var(--zip-tape)' opacity='.95'/>

        {/* Строчки по краям ленты */}
        {showStitches && (
          <>
            <path d='M0,58 L1000,58' stroke='var(--mist-300)' strokeOpacity='.25' strokeWidth='2' strokeDasharray='3 6'/>
            <path d='M0,82 L1000,82' stroke='var(--mist-300)' strokeOpacity='.22' strokeWidth='2' strokeDasharray='3 6'/>
          </>
        )}

        {/* Зубцы — показываем только «застёгнутую» часть через маску */}
        <defs>
          <motion.mask id='zip-mask'>
            <motion.rect x='0' y='60' height='20' style={{width: prefersReduced?1000:(inView?maskW:1000)}} fill='#fff' />
          </motion.mask>
        </defs>
        <rect x='0' y='60' width='1000' height='20' fill='url(#zip-teeth)' mask='url(#zip-mask)'/>

        {/* Бегунок молнии */}
        <motion.g
          style={{x: prefersReduced?1000:(inView?headX:1000)}}
          filter='url(#zip-drop)'
          {...(!prefersReduced && {
            role: 'button',
            tabIndex: 0,
            className: 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--zip-head)]/60 rounded-md p-1',
            'aria-label': 'Перейти к разделу О нас',
            onClick: ()=>document.querySelector('#about')?.scrollIntoView({behavior:'smooth'}),
            onKeyDown: (e:any)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();document.querySelector('#about')?.scrollIntoView({behavior:'smooth'})}}
          })}
        >
          <path d='M-12,40 h24 a8,8 0 0 1 8,8 v44 a8,8 0 0 1 -8,8 h-24 a8,8 0 0 1 -8,-8 v-44 a8,8 0 0 1 8,-8 z' fill='var(--zip-metal)'/>
          <path d='M-10,44 h20 a6,6 0 0 1 6,6 v36 a6,6 0 0 1 -6,6 h-20 a6,6 0 0 1 -6,-6 v-36 a6,6 0 0 1 6,-6 z' fill={accent}/>
          <circle cx='0' cy='106' r='6' fill='var(--zip-metal)'/>
        </motion.g>
      </motion.svg>
      {prefersReduced && <a href='#about' className='sr-only'>К разделу О нас</a>}
      </div>
    </div>
  )
}
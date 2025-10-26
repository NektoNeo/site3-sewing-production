'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
export function ParallaxHero({children}:{children:React.ReactNode}){
  const ref=useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start','end start']})
  const y = useTransform(scrollYProgress,[0,1],['0%','-20%'])
  const opacity = useTransform(scrollYProgress,[0,1],[1,0.6])
  return <div ref={ref} className="relative overflow-hidden"><motion.div style={{y,opacity}}>{children}</motion.div></div>
}

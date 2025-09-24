"use client"

import { motion } from "framer-motion"
import { fadeRise, stagger } from "@/lib/animations"
import { StitchLine, StitchCircle } from '@/components/decor/Stitch'

export default function Portfolio() {
  // Placeholder portfolio items
  const placeholderItems = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Пример работы ${i + 1}`
  }))

  return (
    <section id="portfolio" className="relative section scroll-mt-16 bg-gradient-to-b from-[#1A1C1E] to-[#202528]">
      <div className="container-default relative">
        {/* Decorative stitches for portfolio */}
        <StitchCircle
          className="absolute -top-8 right-1/4 z-0"
          size={200}
          opacity={0.15}
        />
        <StitchLine
          className="absolute left-12 bottom-1/4 -rotate-12 z-0"
          width={160}
          opacity={0.2}
        />
        <div className="relative text-center">
          <motion.span
            className="tag"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRise}
          >
            Работы
          </motion.span>
          <motion.h2
            className="h2 text-3xl md:text-4xl text-white mt-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRise}
          >
            Портфолио
          </motion.h2>
          <div className="h2line max-w-md mx-auto mb-12" />
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {placeholderItems.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeRise}
              whileHover={{
                y: -6,
                scale: 1.03,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="glass-soft rounded-2xl p-10 border border-[rgba(165,171,175,.22)] shadow-[0_10px_40px_rgba(0,0,0,.35)] relative aspect-[4/3] overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-[#D64218]/20 hover:border-[#D64218]/30"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="text-zinc-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-white font-medium text-lg">{item.title}</p>
                <p className="text-zinc-400 text-sm mt-2">Будет добавлен позже</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
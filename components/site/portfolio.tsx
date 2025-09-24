"use client"

import { motion } from "framer-motion"
import { fadeRise, stagger } from "@/lib/animations"

export default function Portfolio() {
  // Placeholder portfolio items
  const placeholderItems = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Пример работы ${i + 1}`
  }))

  return (
    <section id="portfolio" className="section-spacing scroll-mt-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black" />
      <div className="container-default relative">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeRise}
        >
          Портфолио
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                y: -4,
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="glass-soft rounded-2xl p-8 border border-white/10 backdrop-blur-md relative aspect-[4/3] overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10"
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
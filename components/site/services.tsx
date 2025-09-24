"use client"

import { COMPANY_COPY } from '@/lib/data/copy'
import { motion } from "framer-motion"
import { fadeRise, stagger } from "@/lib/animations"
import { serviceCardHover, iconBounce } from "@/lib/micro-motion"
import { Package, Scissors, Ruler, Palette, Image, PenTool, Printer, Sparkles } from 'lucide-react'
import { StitchLine } from '@/components/decor/Stitch'

export default function Services() {
  const services = COMPANY_COPY.servicesList

  // Icon mapping for services - mono style
  const serviceIcons = [
    Package,     // Пошив изделий под ключ
    Scissors,    // Пошив на давальческой основе
    Ruler,       // Разработка лекал
    Palette,     // Дизайн-проекты мерча
    Image,       // DTF печать
    PenTool,     // Вышивка
    Printer,     // Шелкография
    Sparkles     // Сублимация
  ]

  return (
    <section id="services" data-surface="light" className="relative section surface-light px-[var(--space-md)] scroll-mt-16 pt-[var(--space-3xl)] pb-[var(--space-3xl)]">
      <div className="container mx-auto max-w-7xl">
        <div className="relative text-center">
          {/* Decorative stitch line behind heading */}
          <StitchLine
            className="absolute -top-2 left-1/2 -translate-x-1/2 z-0"
            width={280}
            opacity={0.25}
          />
          <motion.span
            className="tag"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRise}
          >
            Услуги
          </motion.span>
          <motion.h2
            className="relative z-10 h2 mt-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRise}
          >
            Наши услуги
          </motion.h2>
          <div className="h2line-outline-straight max-w-md mx-auto mb-[var(--space-2xl)]" />
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[var(--space-lg)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {services.map((service, index) => {
            const Icon = serviceIcons[index]
            return (
              <motion.div
                key={index}
                variants={fadeRise}
                className="group relative"
              >
                <motion.div
                  className="relative bg-white border border-black/6 rounded-lg h-full overflow-hidden focus-within:ring-2 focus-within:ring-[#D64218]/30 focus-within:ring-offset-2"
                  initial="initial"
                  whileHover="hover"
                  variants={serviceCardHover}>
                  {/* Stitching detail at top */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D64218]/20 to-transparent" />
                  <div
                    className="absolute inset-x-0 top-0 h-[3px] opacity-60"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 3px,
                        rgba(214, 66, 24, 0.4) 3px,
                        rgba(214, 66, 24, 0.4) 4px,
                        transparent 4px,
                        transparent 8px
                      )`
                    }}
                  />

                  <div className="p-[var(--space-lg)]">
                    {/* Icon in circle */}
                    <motion.div
                      className="w-9 h-9 rounded-full border border-[#D64218]/30 bg-[#D64218]/5 flex items-center justify-center mb-4 group-hover:bg-[#D64218]/10 transition-colors"
                      variants={iconBounce}
                    >
                      <Icon className="w-5 h-5 stroke-[#D64218]" strokeWidth={1.5} aria-hidden="true" />
                    </motion.div>

                    {/* Title and description */}
                    <h3 className="text-base font-semibold mb-2 text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
"use client"

import { COMPANY_COPY } from '@/lib/data/copy'
import { motion } from "framer-motion"
import { fadeRise, stagger } from "@/lib/animations"
import { Package, Scissors, Factory, Zap, Users, TrendingUp } from 'lucide-react'
import { StitchLine } from '@/components/decor/Stitch'

export default function Services() {
  const services = COMPANY_COPY.servicesList

  // Icon mapping for services
  const serviceIcons = [
    <Package className="w-5 h-5" aria-hidden="true" />,
    <Scissors className="w-5 h-5" aria-hidden="true" />,
    <Factory className="w-5 h-5" aria-hidden="true" />,
    <Zap className="w-5 h-5" aria-hidden="true" />,
    <Users className="w-5 h-5" aria-hidden="true" />,
    <TrendingUp className="w-5 h-5" aria-hidden="true" />
  ]

  return (
    <section id="services" className="relative section px-4 scroll-mt-16">
      <div className="container mx-auto">
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
          <div className="h2line-outline-straight max-w-md mx-auto mb-12" />
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeRise}
              className="group relative"
            >
              <div className="relative rounded-2xl bg-[#222425] border border-[rgba(165,171,175,0.18)] shadow-[0_6px_24px_rgba(0,0,0,0.25)] p-6 hover:-translate-y-1 hover:shadow-lg transition-all will-change-transform h-full overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-[#D64218]/80 before:rounded-t-2xl before:content-['']">
                <h3 className="text-lg font-semibold mb-3 text-fg flex items-center gap-2">
                  {serviceIcons[index % serviceIcons.length]}
                  {service.title}
                </h3>
                <p className="text-sm text-[color:var(--fg-muted)] whitespace-pre-line">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
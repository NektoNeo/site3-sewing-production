"use client"

import { COMPANY_COPY } from '@/lib/data/copy'
import { motion } from "framer-motion"
import { fadeRise, stagger } from "@/lib/animations"

export default function Services() {
  const services = COMPANY_COPY.servicesList

  return (
    <section id="services" className="py-20 px-4 scroll-mt-16">
      <div className="container mx-auto">
        <motion.h2
          className="heading mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeRise}
        >
          Наши услуги
        </motion.h2>
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
              className="group"
            >
              <div className="panel relative bg-[color:var(--bg-elev-1)] rounded-2xl p-6 shadow-elev hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-brand/80 before:rounded-t-2xl">
                <h3 className="text-lg font-semibold mb-3 text-fg">{service.title}</h3>
                <p className="text-sm text-fg-muted whitespace-pre-line">
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
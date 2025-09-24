"use client"

import { COMPANY_COPY } from '@/lib/data/copy'
import { motion } from "framer-motion"
import { fadeRise } from "@/lib/animations"

export default function About() {
  const aboutText = COMPANY_COPY.about

  return (
    <section data-surface="dark" id="about" className="section px-[var(--space-md)] scroll-mt-16 pt-6">
      <div className="container mx-auto">
        <div className="max-w-[70ch] mx-auto">
          <motion.span
            className="tag"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRise}
          >
            О компании
          </motion.span>
          <motion.h2
            className="h2 mt-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRise}
          >
            О нас
          </motion.h2>
          <div className="h2line" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRise}
          >
            <p className="text-[18px] leading-8 text-fg/90 whitespace-pre-line">
              {aboutText}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
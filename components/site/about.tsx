"use client"

import { COMPANY_COPY } from '@/lib/data/copy'
import { motion } from "framer-motion"
import { fadeRise } from "@/lib/animations"

export default function About() {
  const aboutText = COMPANY_COPY.about

  return (
    <section id="about" className="py-20 px-4 scroll-mt-16">
      <div className="container mx-auto">
        <div className="max-w-[70ch] mx-auto">
          <motion.h2
            className="heading mb-6 pb-6 border-b border-line"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRise}
          >
            О нас
          </motion.h2>
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
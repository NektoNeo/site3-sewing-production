"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { fadeRise } from "@/lib/animations"

export function CtaMain() {
  const scrollToContacts = () => {
    const contactsSection = document.getElementById('contacts')
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-16 bg-black">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeRise}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Свяжитесь с нами
          </h2>
          <p className="text-mist-300 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
            Готовы начать производство? Мы поможем воплотить ваши идеи в качественную продукцию
          </p>
          <Button
            onClick={scrollToContacts}
            className="rounded-full bg-gradient-to-r from-[#D64218] to-[#FF6B47] text-white hover:from-[#FF6B47] hover:to-[#D64218] hover:shadow-lg hover:shadow-[#D64218]/30 transition-all duration-300 px-10 py-6 text-lg font-medium"
          >
            Получить консультацию
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
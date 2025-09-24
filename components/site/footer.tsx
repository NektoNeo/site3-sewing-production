"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { fadeRise } from "@/lib/animations"

export function Footer() {
  const navigationGroups = [
    {
      title: "Услуги",
      links: [
        { href: "#services", label: "Дизайн лекал" },
        { href: "#services", label: "Градация лекал" },
        { href: "#services", label: "Мерч продукция" },
        { href: "#services", label: "Фулфилмент" },
      ]
    },
    {
      title: "Компания",
      links: [
        { href: "#about", label: "О нас" },
        { href: "#portfolio", label: "Портфолио" },
        { href: "#pricing", label: "Цены" },
        { href: "#faq", label: "FAQ" },
      ]
    },
    {
      title: "Контакты",
      links: [
        { href: "#contacts", label: "Связаться" },
        { href: "tel:+79999999999", label: "+7 (999) 999-99-99" },
        { href: "mailto:info@example.com", label: "info@example.com" },
      ]
    }
  ]

  return (
    <footer className="relative bg-black pt-20 pb-12">
      <div className="container-default">
        {/* CTA Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeRise}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Готовы начать?
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами для обсуждения вашего проекта
          </p>
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 px-8 py-6 text-lg font-medium"
          >
            <Link href="#contacts">
              Связаться с нами
            </Link>
          </Button>
        </motion.div>

        {/* Navigation Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pt-12 border-t border-zinc-800">
          {navigationGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 hairline-top">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Все права защищены
          </p>
        </div>
      </div>
    </footer>
  )
}
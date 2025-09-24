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
    <footer className="relative bg-[#0F1012] pt-24 pb-8 border-t border-white/10">
      <div className="container-default">

        {/* Navigation Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="md:col-span-1"
          >
            <h3 className="text-white font-bold text-2xl mb-4">LOGO</h3>
            <p className="text-mist-300 mb-4">
              Профессиональное швейное производство полного цикла.
              От идеи до готового изделия.
            </p>
          </motion.div>

          {/* Navigation Links */}
          {navigationGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index + 1) * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-mist-300 hover:text-white transition-colors duration-200"
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
        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-mist-400 text-sm">
            © {new Date().getFullYear()} LOGO. Все права защищены
          </p>
        </div>
      </div>
    </footer>
  )
}
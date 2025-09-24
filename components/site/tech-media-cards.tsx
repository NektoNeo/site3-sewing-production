'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface TechCard {
  id: string
  title: string
  benefit: string
  image: string
  placeholder: string
}

const techCards: TechCard[] = [
  {
    id: 'dtf',
    title: 'DTF печать',
    benefit: 'Фотографическое качество и детализация на любых тканях',
    image: '/images/tech/dtf.webp',
    placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFB//EACUQAAIBAwMEAgMAAAAAAAAAAAECAwAEEQUSITFBUWEGExQiI//EABUBAQEAAAAAAAAAAAAAAAAAAAMD/8QAGREAAwEBAQAAAAAAAAAAAAAAAAECAxES/9oADAMBAAIRAxEAPwDMdL0W4vNKkltNhljkfcm7+qA88ema0f45pP4ltbSSRqsjR73cckqO3TpSvwHTxBGsrIySPO29yGDGTqpB9YrdrbRxQj+KvQeO1efpupTaaOhptlY//9k='
  },
  {
    id: 'embroidery',
    title: 'Вышивка',
    benefit: 'Премиальный вид и долговечность для корпоративной одежды',
    image: '/images/tech/embroidery.webp',
    placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAUGB//EACQQAAEDAwQCAwAAAAAAAAAAAAECAxEABCEFEjFBE1FhcYH/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAERQf/aAAwDAQACEQMRAD8AkdP0e5et0ONhpTYSVKUVwEgdz2Kpm2Q8pKLllwpWcAEEGfY6pNot+5b2zrbSlJStxRKUkxu+PdNk3TpWHnX3AUGQklW0fOawqVP/2Q=='
  },
  {
    id: 'sublimation',
    title: 'Сублимация',
    benefit: 'Яркие цвета на полиэстере для спортивной одежды',
    image: '/images/tech/sublimation.webp',
    placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAYHBf/EACUQAAEDAwMEAwEAAAAAAAAAAAECAxEABCEFEjFBUWFxBhMUIv/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAFxEBAQEBAAAAAAAAAAAAAAAAAQARQf/aAAwDAQACEQMRAD8AnOh6K/f27TjO1LiASUlcFIJnPqmC2tXUXDqUIWVoVCoGUjsCrBoelMJYbcNuhZIlW9AJPnPumt3TLdQMtJg+KztqJgaP/9k='
  }
]

export function TechMediaCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="w-full py-16 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Технологии нанесения
          </h2>
          <p className="text-muted-foreground">
            Современное оборудование для любых задач брендирования
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {techCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "group relative overflow-hidden rounded-[var(--radius-lg)] transition-all duration-500",
                  "hover:shadow-xl hover:scale-[1.02]",
                  "border-0 bg-gradient-to-br from-background to-muted/20"
                )}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <motion.div
                    className="relative h-full w-full"
                    animate={{
                      scale: hoveredCard === card.id ? 1.1 : 1,
                    }}
                    transition={{
                      duration: 10,
                      ease: "linear",
                    }}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={card.placeholder}
                      loading="lazy"
                      quality={85}
                    />
                  </motion.div>

                  <motion.div
                    className="absolute inset-x-0 bottom-0 z-20 p-6"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{
                      y: hoveredCard === card.id ? 0 : 100,
                      opacity: hoveredCard === card.id ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/90">
                      {card.benefit}
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    background: hoveredCard === card.id
                      ? 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 50%)'
                      : 'transparent'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
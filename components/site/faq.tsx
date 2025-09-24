"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { fadeRise, stagger } from "@/lib/animations"

export default function FAQ() {
  // Placeholder FAQ items - will be updated later
  const faqItems = [
    {
      question: "Вопросы будут добавлены позже",
      answer: "Здесь будет раздел с часто задаваемыми вопросами. Контент будет добавлен после согласования."
    }
  ]

  return (
    <section id="faq" className="section-spacing scroll-mt-16 bg-white">
      <div className="container-default">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeRise}
        >
          Часто задаваемые вопросы
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <motion.div key={index} variants={fadeRise}>
                <AccordionItem value={`item-${index}`} className="border-neutral-200 dark:border-zinc-800">
                  <AccordionTrigger className="text-left hover:no-underline hover:text-neutral-900 dark:hover:text-zinc-300">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-600 dark:text-zinc-400">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
        <motion.div
          className="mt-8 p-6 bg-neutral-50 dark:bg-zinc-900 rounded-2xl border border-neutral-200 dark:border-zinc-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeRise}>
          <p className="text-center text-neutral-600 dark:text-zinc-400">
            Раздел FAQ находится в разработке. Вопросы и ответы будут добавлены в ближайшее время.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
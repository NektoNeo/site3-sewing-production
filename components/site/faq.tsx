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
    <section id="faq" className="section bg-[color:var(--bg-base)]">
      <div className="container-default">
        <div className="text-center">
          <motion.span
            className="tag"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRise}
          >
            FAQ
          </motion.span>
          <motion.h2
            className="h2 text-fg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRise}
          >
            Часто задаваемые вопросы
          </motion.h2>
          <div className="h2line" />
        </div>
        {faqItems.length > 1 || (faqItems.length === 1 && faqItems[0].question !== "Вопросы будут добавлены позже") ? (
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <motion.div key={index} variants={fadeRise}>
                  <AccordionItem value={`item-${index}`} className="accordion-item">
                    <AccordionTrigger className="accordion-trigger">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="accordion-content">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        ) : (
          <motion.div
            className="max-w-3xl mx-auto glass rounded-2xl p-6 text-fg/90 border border-[rgba(165,171,175,.22)] shadow-[0_10px_40px_rgba(0,0,0,.35)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRise}>
            <p className="text-center">
              Раздел FAQ находится в разработке. Вопросы и ответы будут добавлены в ближайшее время.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
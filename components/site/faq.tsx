"use client"

import { motion } from "framer-motion"
import { fadeRise, stagger } from "@/lib/animations"
import Script from "next/script"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ() {
  const faqItems: FAQItem[] = [
    {
      question: "Какие минимальные партии вы производите?",
      answer: "Минимальная партия начинается от 100 единиц продукции. Для постоянных клиентов возможны индивидуальные условия и гибкий подход к объемам заказа."
    },
    {
      question: "Какие сроки производства?",
      answer: "Стандартный срок производства составляет 14-21 день с момента утверждения макета и внесения предоплаты. Срочные заказы обсуждаются индивидуально."
    },
    {
      question: "Работаете ли вы с давальческим сырьем?",
      answer: "Да, мы работаем как с собственными материалами, так и с давальческим сырьем заказчика. Наши технологи проверят совместимость материалов с нашим оборудованием."
    },
    {
      question: "Предоставляете ли вы образцы перед запуском производства?",
      answer: "Обязательно. Перед запуском основной партии мы изготавливаем образец для утверждения. Это позволяет внести корректировки до начала массового производства."
    },
    {
      question: "Какие виды нанесения логотипов доступны?",
      answer: "Мы предлагаем вышивку, шелкографию, термопечать, DTF-печать, сублимацию и другие современные методы нанесения. Выбор зависит от материала и дизайна."
    }
  ]

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <>
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        strategy="afterInteractive"
      />

      <section id="faq" data-surface="light" className="section scroll-mt-16" style={{ backgroundColor: 'var(--color-bg-light, #F5F6F8)' }}>
        <div className="container-default">
          <div className="text-center">
            <motion.span
              className="inline-block px-[var(--space-md)] py-[var(--space-xs)] text-sm font-medium tracking-wider uppercase"
              style={{ color: 'var(--color-text-secondary, #3F474D)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeRise}
            >
              FAQ
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl font-semibold mt-3"
              style={{ color: 'var(--color-text-ink, #14181B)' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeRise}
            >
              Часто задаваемые вопросы
            </motion.h2>
            <motion.div
              className="w-20 h-[2px] bg-[--color-accent] mx-auto mt-[var(--space-xl)] mb-[var(--space-2xl)]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeRise}
            />
          </div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeRise}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="rounded-[var(--radius-md)] px-[var(--space-xl)] py-[var(--space-lg)] border-0 transition-all duration-200 hover:shadow-md"
                    style={{
                      backgroundColor: 'var(--color-muted, #EDEFF2)',
                      border: '1px solid rgba(20, 24, 27, 0.08)'
                    }}
                  >
                    <AccordionTrigger
                      className="text-left hover:no-underline"
                      style={{ color: 'var(--color-text-ink, #14181B)' }}
                    >
                      <span className="font-medium pr-4">
                        {item.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary, #3F474D)' }}>
                        {item.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            className="text-center mt-[var(--space-xl)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRise}
          >
            <p style={{ color: 'var(--color-text-secondary, #3F474D)' }}>
              Не нашли ответ на свой вопрос?{" "}
              <a
                href="#contacts"
                className="font-medium hover:underline transition-colors"
                style={{ color: 'var(--color-accent, #D64218)' }}
              >
                Свяжитесь с нами
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
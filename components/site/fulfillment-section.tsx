"use client"

import { COMPANY_COPY } from '@/lib/data/copy';
import { Warehouse, Package, ScanBarcode, Database, Truck, CheckCircle2, ShieldCheck, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeRise } from '@/lib/animations';
import { StitchCircle, StitchLine } from '@/components/decor/Stitch';

export function FulfillmentSection() {
  // Получаем полный текст
  const fullText = COMPANY_COPY.servicesDetails.fulfillment.content;

  // Извлекаем секции из текста
  const introText = fullText.split('Что входит в фулфилмент:')[0].trim();
  const intro1 = introText.split('\n')[0];
  const intro2 = introText.split('\n').slice(1).join('\n').trim();

  const markingSection = fullText.split('Маркировка товаров по системе')[1].split('Мы гарантируем')[0].trim();
  const finalText = 'Мы гарантируем корректность и юридическую чистоту маркировки. Это важно как для\nторговли через маркетплейсы, так и при работе с крупными ритейлерами или\nпоставках в сети.';

  const fulfillmentItems = [
    { icon: Warehouse, text: 'Прием и хранение товаров на оборудованном складе' },
    { icon: Package, text: 'Сборка заказов поштучно или партиями' },
    { icon: Package, text: 'Упаковка согласно требованиям маркетплейсов или бренда' },
    { icon: ShieldCheck, text: 'Проверка на брак' },
    { icon: ScanBarcode, text: 'Маркировка и печать этикеток, включая "Честный ЗНАК"' },
    { icon: Truck, text: 'Отправка клиенту — через службы доставки или на маркетплейсы (Ozon, Wildberries и др.)' },
    { icon: Link2, text: 'Интеграция с вашими системами учета и CRM' }
  ];

  const markingItems = [
    { icon: ScanBarcode, text: 'Генерацию, печать и нанесение кодов Data Matrix' },
    { icon: Truck, text: 'Передача честного знака заказчику' },
    { icon: Database, text: 'Сканирование и фиксацию передачи кодов в систему Честный ЗНАК' },
    { icon: ShieldCheck, text: 'Подготовку продукции к проверкам и полную прозрачность документации' }
  ];

  return (
    <section id="fulfillment" className="relative section px-[var(--space-md)] md:scroll-mt-24 surface-dark">
      <div className="container mx-auto">
        {/* Decorative stitch elements */}
        <StitchCircle
          className="absolute left-1/2 top-10 -translate-x-1/2 z-0"
          size={220}
          opacity={0.1}
        />
        <StitchLine
          className="absolute right-20 bottom-40 rotate-45 z-0"
          width={180}
          opacity={0.15}
        />
        <motion.span
          className="tag text-fg-muted"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
        >
          Фулфилмент
        </motion.span>
        <motion.h2
          className="h2 mt-4 text-fg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
        >
          {COMPANY_COPY.servicesDetails.fulfillment.title}
        </motion.h2>
        <div className="h-px bg-[color:var(--color-accent)] w-32 mt-4 mb-[var(--space-xl)]" />

        {/* Вступление */}
        <motion.div
          className="mb-[var(--space-2xl)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
        >
          <p className="text-[18px] leading-8 mb-4 text-fg/90">
            {intro1}
          </p>
          <p className="text-base leading-7 text-fg-muted whitespace-pre-line">
            {intro2}
          </p>
        </motion.div>

        {/* Две колонки со светлыми карточками на темном фоне */}
        <div className="grid lg:grid-cols-2 gap-[var(--space-lg)] mb-[var(--space-2xl)]">
          {/* Что входит в фулфилмент */}
          <motion.div
            data-surface="light" className="surface-light glass--light rounded-2xl p-[var(--space-xl)] shadow-elev h-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeRise}
          >
            <h3 className="text-xl font-semibold mb-6 text-fg">Что входит в фулфилмент</h3>
            <ul className="space-y-4">
              {fulfillmentItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <item.icon className="w-5 h-5 text-[#D64218] shrink-0 mt-0.5" />
                  <span className="text-sm text-fg-muted leading-relaxed" style={{ lineHeight: '1.6' }}>
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Маркировка товаров */}
          <motion.div
            data-surface="light" className="surface-light glass--light rounded-2xl p-[var(--space-xl)] shadow-elev h-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeRise}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-fg">Маркировка по «Честный ЗНАК»</h3>
            <p className="text-sm mb-4 text-fg-muted">Мы предлагаем:</p>
            <ul className="space-y-4">
              {markingItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                >
                  <item.icon className="w-5 h-5 text-[#D64218] shrink-0 mt-0.5" />
                  <span className="text-sm text-fg-muted leading-relaxed" style={{ lineHeight: '1.6' }}>
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Финальный абзац и CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
          className="text-center"
        >
          <p className="text-base text-fg-muted whitespace-pre-line max-w-[70ch] mx-auto mb-[var(--space-xl)]">
            {finalText}
          </p>

          {/* CTA Button */}
          <motion.a
            href="#contacts"
            className="inline-flex items-center gap-2 px-[var(--space-lg)] py-[var(--space-sm)] bg-[#D64218] text-white rounded-lg font-medium hover:bg-[#D64218]/90 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Получить консультацию
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
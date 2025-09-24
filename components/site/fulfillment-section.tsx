"use client"

import { COMPANY_COPY } from '@/lib/data/copy';
import { CheckCircle2, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeRise } from '@/lib/animations';

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
    'Прием и хранение товаров на оборудованном складе',
    'Сборка заказов поштучно или партиями',
    'Упаковка согласно требованиям маркетплейсов или бренда',
    'Проверка на брак',
    'Маркировка и печать этикеток, включая "Честный ЗНАК"',
    'Отправка клиенту — через службы доставки или на маркетплейсы (Ozon, Wildberries и др.)',
    'Интеграция с вашими системами учета и CRM'
  ];

  const markingItems = [
    'Генерацию, печать и нанесение кодов Data Matrix',
    'Передача честного знака заказчику',
    'Сканирование и фиксацию передачи кодов в систему Честный ЗНАК',
    'Подготовку продукции к проверкам и полную прозрачность документации'
  ];

  return (
    <section id="fulfillment" className="py-20 px-4 md:scroll-mt-24">
      <div className="container mx-auto">
        <motion.h2
          className="heading mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
        >
          {COMPANY_COPY.servicesDetails.fulfillment.title}
        </motion.h2>

        {/* Вступление */}
        <motion.div
          className="mb-12"
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

        {/* Две панели в две колонки */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Что входит в фулфилмент */}
          <motion.div
            className="panel bg-[color:var(--bg-elev-1)] rounded-2xl p-6 shadow-elev"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeRise}
          >
            <h3 className="text-xl font-semibold mb-6 text-fg">Что входит в фулфилмент:</h3>
            <ul className="space-y-3">
              {fulfillmentItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <span className="text-sm text-fg-muted">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Маркировка товаров */}
          <motion.div
            className="panel bg-[color:var(--bg-elev-1)] rounded-2xl p-6 shadow-elev"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeRise}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-fg">Маркировка товаров по системе "Честный ЗНАК"</h3>
            <p className="text-sm mb-4 text-fg-muted">Мы предлагаем:</p>
            <ul className="space-y-3">
              {markingItems.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                >
                  <Package className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <span className="text-sm text-fg-muted">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Финальный абзац */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
        >
          <p className="text-base text-fg-muted whitespace-pre-line max-w-[70ch] mx-auto">
            {finalText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
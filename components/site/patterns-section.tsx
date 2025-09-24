"use client"

import { COMPANY_COPY } from '@/lib/data/copy';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeRise } from '@/lib/animations';
import { StitchCircle } from '@/components/decor/Stitch';

export function PatternsSection() {
  // Разбиваем текст на части для структурированного отображения
  const fullText = COMPANY_COPY.servicesDetails.patterns.content;

  // Извлекаем секции из текста
  const introText = fullText.split('Что вы получаете:')[0].trim();
  const listSection = fullText.split('Что вы получаете:')[1].split('Работаем с любыми видами')[0].trim();
  const finalText = 'Работаем с любыми видами одежды — от повседневной и корпоративной до сложной\nдизайнерской.';

  const checklistItems = [
    'Профессиональное проектирование лекал по вашим эскизам, фото или образцам',
    'Градацию размеров и подготовку файлов для раскладки',
    'Индивидуальный пошив образцов и пилотных партий',
    'Возможность доработки и корректировки моделей после примерки'
  ];

  return (
    <section id="patterns" className="relative section px-4 md:scroll-mt-24">
      <div className="container mx-auto">
        {/* Decorative stitch circle */}
        <StitchCircle
          className="absolute right-8 top-20 z-0"
          size={160}
          opacity={0.2}
        />
        <motion.span
          className="tag"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
        >
          Лекала
        </motion.span>
        <motion.h2
          className="h2 mt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
        >
          {COMPANY_COPY.servicesDetails.patterns.title}
        </motion.h2>
        <div className="h2line-outline-wavy mb-8" />

        {/* Вступительный текст */}
        <motion.div
          className="max-w-[70ch] mx-auto mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
        >
          <p className="text-[18px] leading-8 text-fg/90 whitespace-pre-line">
            {introText}
          </p>
        </motion.div>

        {/* Что вы получаете - чеклист на панели */}
        <motion.div
          className="panel bg-[color:var(--bg-elev-1)] rounded-2xl p-8 shadow-elev mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
        >
          <h3 className="text-2xl font-semibold mb-6 text-fg">Что вы получаете:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {checklistItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-1" />
                <span className="text-fg-muted">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Финальный абзац */}
        <motion.div
          className="max-w-[70ch] mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
        >
          <p className="text-base text-fg-muted whitespace-pre-line">
            {finalText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
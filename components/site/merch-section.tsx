"use client"

import { COMPANY_COPY } from '@/lib/data/copy';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeRise, stagger } from '@/lib/animations';
import { StitchLine } from '@/components/decor/Stitch';
import Steps from '@/components/site/steps';

export function MerchSection() {
  // Разбиваем текст на части для структурированного отображения
  const fullText = COMPANY_COPY.servicesDetails.merch.content;

  // Извлекаем различные секции из текста
  const introText = fullText.split('Почему стоит доверить')[0].trim();
  const intro1 = introText.split('\n')[0];
  const intro2 = introText.split('\n').slice(1).join('\n').trim();

  const whyUsItems = [
    {
      title: 'Полный цикл услуг – от концепции до реализации:',
      text: 'анализируем целевую аудиторию, разрабатываем дизайн, подбираем материалы и технологии нанесения, обеспечиваем качественный пошив и логистику.'
    },
    {
      title: 'Индивидуальный подход',
      text: '– создаем уникальные решения, отражающие философию и ценности вашей компании.'
    },
    {
      title: 'Стратегический бренд-менеджмент',
      text: '– помогаем выстроить эффективную систему продвижения через мерч, включая позиционирование, упаковку и маркетинговую поддержку.'
    }
  ];

  const solutions = [
    {
      title: 'Корпоративная одежда и униформа',
      desc: 'стильная, удобная и презентабельная форма для сотрудников.'
    },
    {
      title: 'Промо Продукция и бизнес-подарки',
      desc: 'практичные и статусные вещи с фирменной символикой для клиентов и партнеров.'
    },
    {
      title: 'Лимитированные коллекции',
      desc: 'эксклюзивный мерч для особых мероприятий, повышающий вовлеченность аудитории.'
    },
    {
      title: 'Ивент-мероприятия',
      desc: 'запоминающаяся атрибутика для конференций, форумов и тимбилдингов.'
    }
  ];

  const technologies = [
    { label: 'Вышивка', desc: 'для элитной и долговечной отделки' },
    { label: 'Шелкография и DTF-печать', desc: 'яркие и стойкие принты' },
    { label: 'Сублимация', desc: 'бесшовные полноцветные изображения' }
  ];


  return (
    <section id="merch" className="relative section px-4 md:scroll-mt-24">
      <div className="container mx-auto">
        {/* Decorative stitch line */}
        <StitchLine
          className="absolute left-10 top-32 -rotate-12 z-0"
          width={200}
          opacity={0.2}
        />
        <motion.span
          className="tag"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
        >
          Мерч
        </motion.span>
        <motion.h2
          className="h2 mt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
        >
          {COMPANY_COPY.servicesDetails.merch.title}
        </motion.h2>
        <div className="h2line mb-8" />

        {/* Два вступительных абзаца */}
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
        >
          <p className="text-[18px] leading-8 mb-4 max-w-[70ch] text-fg/90">
            {intro1}
          </p>
          <p className="text-base leading-7 max-w-[70ch] text-fg-muted">
            {intro2}
          </p>
        </motion.div>

        {/* Почему стоит доверить - панель с двумя столбцами и чек-иконами */}
        <motion.div
          className="panel bg-[color:var(--bg-elev-1)] rounded-2xl p-8 shadow-elev mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
        >
          <h3 className="text-2xl font-semibold mb-6 text-fg">
            Почему стоит доверить разработку мерча нам?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {whyUsItems.map((item, index) => (
              <motion.div
                key={index}
                className={`flex gap-3 ${index === 2 ? 'md:col-span-2' : ''}`}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle2 className="w-5 h-5 text-[#D64218] shrink-0 mt-1" />
                <div>
                  <span className="font-medium text-fg">{item.title}</span>
                  <span className="text-fg-muted"> {item.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Наши решения - 4 плитки .panel с крупным h4 */}
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <h3 className="text-2xl font-semibold mb-6 text-fg">
            Наши решения для бизнеса:
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                variants={fadeRise}
                className="panel bg-[color:var(--bg-elev-1)] rounded-2xl p-8 shadow-elev hover:shadow-lg transition-shadow duration-300"
              >
                <h4 className="text-xl font-semibold mb-3 text-fg">{solution.title}</h4>
                <p className="text-fg-muted leading-relaxed">{solution.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Технологии нанесения - строчка chips */}
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRise}
        >
          <h3 className="text-2xl font-semibold mb-6 text-fg">
            Технологии нанесения:
          </h3>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                className="chip inline-flex items-center px-4 py-2 rounded-full bg-transparent text-[#D64218] border border-[#D64218] font-medium"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span>{tech.label}</span>
                <span className="ml-1 opacity-80">– {tech.desc}</span>
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Как мы работаем */}
        <Steps />
      </div>
    </section>
  );
}
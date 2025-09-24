import { Search, Lightbulb, Factory, TrendingUp } from 'lucide-react';

const steps = [
  { t: 'Анализ', d: 'изучаем ваш бренд, ЦА и задачи.', Icon: Search },
  { t: 'Концепция', d: 'предлагаем дизайн и варианты изделий.', Icon: Lightbulb },
  { t: 'Производство', d: 'шьем и наносим фирменную символику.', Icon: Factory },
  { t: 'Продвижение', d: 'помогаем интегрировать мерч в маркетинговую стратегию.', Icon: TrendingUp }
];

export default function Steps() {
  return (
    <section id='steps' className='section'>
      <div className='container mx-auto'>
        <h2 className='h2 text-fg'>Как мы работаем?</h2>
        <div className='h2line'/>
        <ul className='grid grid-cols-1 md:grid-cols-4 gap-8 relative'>
          {steps.map((s, i) => {
            const N = i + 1;
            return (
              <li key={i} className='relative p-4'>
                <span
                  aria-hidden
                  className='absolute -top-6 -left-2 text-[clamp(120px,16vw,220px)] font-black tracking-[-.04em] text-[#A5ABAF] opacity-[.06] select-none leading-none'
                >
                  {N}
                </span>
                <div className='relative z-10 flex flex-col items-start gap-3'>
                  <s.Icon aria-hidden className='size-8 text-brand'/>
                  <h3 className='text-2xl font-semibold text-fg'>{s.t}</h3>
                  <p className='text-fg-muted max-w-[28ch]'>{s.d}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
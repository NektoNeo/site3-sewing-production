'use client'

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Factory, Palette, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdvantageCard {
  icon: React.ElementType
  title: string
  description: string
}

const advantages: AdvantageCard[] = [
  {
    icon: Factory,
    title: 'Полный цикл производства',
    description: 'От разработки идеи до готового изделия и логистики. Контролируем каждый этап для гарантии качества'
  },
  {
    icon: Palette,
    title: 'Индивидуальный дизайн',
    description: 'Создаем уникальные решения под ваш бренд. Воплощаем любые идеи в реальность'
  },
  {
    icon: TrendingUp,
    title: 'Бренд-менеджмент',
    description: 'Помогаем развивать и масштабировать ваш бренд. Стратегическое планирование и поддержка'
  }
]

export default function AdvantagesCards() {
  return (
    <section className="w-full py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <Card
                key={index}
                className={cn(
                  "relative overflow-hidden transition-all duration-300",
                  "bg-[var(--color-surface-2)]/80 border-[color:var(--stroke)]",
                  "hover:shadow-lg hover:scale-[1.02]",
                  "group cursor-pointer"
                )}
              >
                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 60% 40%, rgba(214, 66, 24, 0.15), transparent 70%)'
                  }}
                />

                <CardHeader className="relative z-10 space-y-4 p-8">
                  <div className="flex items-start">
                    <div
                      className="p-3 rounded-lg transition-colors duration-300"
                      style={{
                        backgroundColor: 'rgba(214, 66, 24, 0.1)',
                      }}
                    >
                      <Icon
                        className="h-8 w-8 text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <CardTitle className="text-xl font-semibold text-[var(--color-text-primary)]">
                      {advantage.title}
                    </CardTitle>
                    <CardDescription className="text-[var(--color-text-secondary)] leading-relaxed">
                      {advantage.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
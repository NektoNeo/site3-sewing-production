'use client'

import { Button } from '@/components/ui/button'

export function CtaFinal() {
  const scrollToContacts = () => {
    const contactsSection = document.getElementById('contacts')
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section data-surface="dark" className="py-8 bg-black">
      <div className="container max-w-4xl mx-auto px-[var(--space-md)] text-center">
        <div className="space-y-6">
          <h2 className="h2 text-3xl md:text-4xl text-white">
            Свяжитесь с нами
          </h2>

          <div className="h2line max-w-sm mx-auto" />

          <p className="text-base text-mist-300 max-w-xl mx-auto">
            Готовы обсудить ваш проект? Оставьте заявку, и мы свяжемся с вами в течение часа
          </p>

          <div className="pt-2">
            <Button
              onClick={scrollToContacts}
              size="lg"
              className="glass-button text-base px-[var(--space-lg)] py-[var(--space-md)] rounded-full bg-brand hover:bg-brand-700 transition-all duration-200 text-white font-semibold shadow-[0_4px_24px_rgba(214,66,24,0.3)] hover:shadow-[0_8px_32px_rgba(214,66,24,0.4)] hover:scale-105"
            >
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
'use client'

import { useState, useRef } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { LazyVanta } from './lazy-vanta'

const services = [
  'Пошив одежды',
  'Производство сумок',
  'Мерч и брендинг',
  'Разработка лекал',
  'Консультация'
]

export function CtaInline() {
  const [service, setService] = useState('')
  const [phone, setPhone] = useState('')
  const [comment, setComment] = useState('')
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectOpen, setSelectOpen] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [formTouched, setFormTouched] = useState(false)

  const phoneInputRef = useRef<HTMLInputElement>(null)

  // Phone mask formatting
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/)

    if (!match) return value

    const parts = [
      match[1] ? '+7' : '',
      match[2] ? ` (${match[2]}` : '',
      match[2]?.length === 3 ? ')' : '',
      match[3] ? ` ${match[3]}` : '',
      match[4] ? `-${match[4]}` : '',
      match[5] ? `-${match[5]}` : ''
    ]

    return parts.join('')
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    // If user is deleting and hits the start of the mask, clear everything
    if (value === '+') {
      setPhone('')
      setPhoneError('')
      return
    }

    // If the value doesn't start with +7, add it
    if (value && !value.startsWith('+7')) {
      // If it starts with 8, replace with +7
      if (value.startsWith('8')) {
        value = '+7' + value.slice(1)
      } else if (value.startsWith('7')) {
        value = '+' + value
      } else {
        value = '+7' + value.replace(/\D/g, '')
      }
    }

    const formatted = formatPhoneNumber(value)
    setPhone(formatted)

    // Validate phone
    const digitsOnly = formatted.replace(/\D/g, '')
    if (digitsOnly.length > 0 && digitsOnly.length !== 11) {
      setPhoneError('Введите полный номер телефона')
    } else {
      setPhoneError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormTouched(true)

    // Validate
    if (!phone.trim() || phoneError || !consent) return

    setIsSubmitting(true)

    try {
      // TODO: API integration
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Reset form on success
      setService('')
      setPhone('')
      setComment('')
      setConsent(false)
      setFormTouched(false)
      setPhoneError('')

      // Show success notification (you can add a toast here)
      console.log('Form submitted successfully')
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = phone.trim() && !phoneError && consent

  return (
    <section data-surface="dark" className="relative -my-16 pt-[var(--space-3xl)] pb-[var(--space-3xl)] overflow-hidden">
      <div className="relative mx-4 lg:mx-8">
        {/* Container with dark background and glass effect */}
        <div
          className="relative overflow-hidden rounded-3xl min-h-[600px]"
          style={{
            background: 'linear-gradient(135deg, var(--color-ink-900) 0%, var(--color-panel-700) 100%)'
          }}
        >
          {/* Vanta background (desktop only) - lazy loaded */}
          <div data-vanta-trigger className="absolute inset-0" />
          <LazyVanta />

          {/* Mobile fallback gradient */}
          <div className="absolute inset-0 -z-10 lg:hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800" />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
                filter: 'blur(100px)',
                opacity: 0.25
              }}
              aria-hidden="true"
            />
          </div>

          {/* Content container */}
          <div className="container mx-auto px-[var(--space-md)] relative pt-[var(--space-3xl)] pb-[var(--space-3xl)]" style={{ zIndex: 1 }}>
            {/* Heading */}
            <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10">
              Оставить заявку
            </h2>

            {/* Glass form container */}
            <form
              onSubmit={handleSubmit}
              className="max-w-5xl mx-auto"
            >
              <div
                className="p-7 md:p-9 rounded-2xl"
                style={{
                  background: 'var(--glass-dark)',
                  backdropFilter: 'blur(var(--glass-blur))',
                  WebkitBackdropFilter: 'blur(var(--glass-blur))',
                  border: '1px solid var(--glass-dark-stroke)',
                  boxShadow: 'var(--shadow-elev-2)'
                }}
              >
                <div className="flex flex-col lg:flex-row gap-[var(--space-lg)] items-start lg:items-center">
                  {/* Service Select */}
                  <div className="relative w-full lg:flex-1">
                    <button
                      type="button"
                      onClick={() => setSelectOpen(!selectOpen)}
                      className="w-full px-5 py-[var(--space-md)] rounded-xl text-left text-white/90 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-50"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: selectOpen ? '1px solid var(--color-accent-700)' : '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <span className={service ? 'text-white' : 'text-white/50'}>
                        {service || 'Что нужно?'}
                      </span>
                      <ChevronDown
                        className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 transition-transform ${selectOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {selectOpen && (
                      <div
                        className="absolute top-full mt-2 w-full rounded-xl overflow-hidden z-20 shadow-2xl"
                        style={{
                          background: 'var(--color-panel-600)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {services.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setService(item)
                              setSelectOpen(false)
                            }}
                            className="w-full px-5 py-[var(--space-sm)].5 text-left text-white/90 hover:bg-white/10 transition-colors hover:text-white"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Phone Input with Mask */}
                  <div className="w-full lg:flex-1">
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                      className="w-full px-5 py-[var(--space-md)] rounded-xl text-white placeholder-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-50"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: (formTouched && phoneError)
                          ? '1px solid #ef4444'
                          : phone
                            ? '1px solid var(--color-accent-700)'
                            : '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    />
                    {formTouched && phoneError && (
                      <p className="text-red-400 text-sm mt-1 px-2">{phoneError}</p>
                    )}
                  </div>

                  {/* Comment Input */}
                  <input
                    type="text"
                    placeholder="Комментарий"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full lg:flex-1 px-5 py-[var(--space-md)] rounded-xl text-white placeholder-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-50"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className="w-full lg:w-auto px-[var(--space-xl)] py-[var(--space-md)] rounded-xl font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 disabled:hover:scale-100"
                    style={{
                      background: isFormValid
                        ? 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-700) 100%)'
                        : 'rgba(255, 255, 255, 0.1)',
                      boxShadow: isFormValid ? 'var(--shadow-glow-accent)' : 'none'
                    }}
                  >
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                  </button>
                </div>

                {/* Privacy Consent Checkbox */}
                <div className="mt-5 flex items-start gap-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className="w-5 h-5 rounded border-2 transition-all"
                        style={{
                          borderColor: consent ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.3)',
                          background: consent ? 'var(--color-accent)' : 'transparent'
                        }}
                      >
                        {consent && (
                          <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                      Согласен на обработку персональных данных в соответствии с{' '}
                      <a
                        href="/privacy"
                        className="underline hover:text-white/90"
                        onClick={(e) => e.stopPropagation()}
                      >
                        политикой конфиденциальности
                      </a>
                    </span>
                  </label>
                </div>

                {formTouched && !consent && (
                  <p className="text-red-400 text-sm mt-2">Необходимо согласие на обработку персональных данных</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
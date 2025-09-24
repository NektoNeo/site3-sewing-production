"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeRise, stagger } from "@/lib/animations"
import { StitchLine, StitchCircle } from '@/components/decor/Stitch'
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface PortfolioItem {
  id: number
  title: string
  category?: string
  description?: string
  imageUrl?: string
  tags?: string[]
}

export default function Portfolio() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const portfolioItems: PortfolioItem[] = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Пример работы ${i + 1}`,
    category: i % 2 === 0 ? "Мерч" : "Производство",
    description: "Описание проекта будет добавлено позже. Это место для подробного рассказа о проекте, использованных материалах и технологиях.",
    tags: ["Хлопок", "Вышивка", "Премиум"]
  }))

  const selectedItem = portfolioItems.find(item => item.id === selectedId)
  const currentIndex = portfolioItems.findIndex(item => item.id === selectedId)

  const goToNext = useCallback(() => {
    if (currentIndex < portfolioItems.length - 1) {
      setSelectedId(portfolioItems[currentIndex + 1].id)
    }
  }, [currentIndex, portfolioItems])

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedId(portfolioItems[currentIndex - 1].id)
    }
  }, [currentIndex, portfolioItems])

  const closeModal = useCallback(() => {
    setSelectedId(null)
    if (previousFocusRef.current) {
      previousFocusRef.current.focus()
      previousFocusRef.current = null
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return

      switch (e.key) {
        case 'Escape':
          closeModal()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'ArrowRight':
          goToNext()
          break
      }
    }

    if (selectedId) {
      previousFocusRef.current = document.activeElement as HTMLElement
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'

      setTimeout(() => {
        const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        firstFocusable?.focus()
      }, 100)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedId, closeModal, goToNext, goToPrevious])

  useEffect(() => {
    if (!selectedId || !modalRef.current) return

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      if (!focusableElements || focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleFocusTrap)
    return () => document.removeEventListener('keydown', handleFocusTrap)
  }, [selectedId])

  return (
    <>
      <section id="portfolio" data-surface="light" className="relative section scroll-mt-16 surface-light">
        <div className="container-default relative">
          <StitchCircle
            className="absolute -top-8 right-1/4 z-0"
            size={200}
            opacity={0.08}
          />
          <StitchLine
            className="absolute left-12 bottom-1/4 -rotate-12 z-0"
            width={160}
            opacity={0.1}
          />
          <div className="relative text-center">
            <motion.span
              className="inline-block px-[var(--space-md)] py-[var(--space-xs)] text-sm font-medium text-[--text-muted] tracking-wider uppercase"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeRise}
            >
              Работы
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl font-semibold text-[--text-primary] mt-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeRise}
            >
              Портфолио
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-lg)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            {portfolioItems.map((item) => (
              <motion.button
                key={item.id}
                variants={fadeRise}
                onClick={() => setSelectedId(item.id)}
                className="group relative bg-white rounded-[--radius-lg] border border-[--border-default] shadow-[--shadow-light] aspect-[4/3] overflow-hidden transition-all duration-300 hover:shadow-[--shadow-light-lg] hover:border-[--color-accent]/20 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-white hover:to-[#FFF9F7] focus:outline-none focus:ring-2 focus:ring-[--color-accent] focus:ring-offset-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[--color-accent]/0 to-[--color-accent]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-[var(--space-xl)]">
                  <div className="text-[--text-muted] mb-4 transition-colors group-hover:text-[--color-accent]">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-[--text-primary] font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-[--text-muted] text-sm">{item.category}</p>
                  <p className="text-[--text-muted] text-xs mt-2 opacity-60">Будет добавлен позже</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-[--radius-xl] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-[--border-default] px-[var(--space-lg)] py-[var(--space-md)] flex items-center justify-between z-10">
                <h3 className="text-xl font-semibold text-[--text-primary]">{selectedItem.title}</h3>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[--color-accent]"
                  aria-label="Закрыть"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-400">
                      <svg
                        className="w-24 h-24 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm mt-4">Изображение будет добавлено</p>
                    </div>
                  </div>
                </div>

                <div className="p-[var(--space-lg)]">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[--color-accent]/10 text-[--color-accent] rounded-full text-sm font-medium">
                      {selectedItem.category}
                    </span>
                  </div>

                  <p className="text-[--text-secondary] leading-relaxed mb-6">
                    {selectedItem.description}
                  </p>

                  {selectedItem.tags && (
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-[--text-muted] rounded-lg text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-[--border-default] px-[var(--space-lg)] py-[var(--space-md)] flex justify-between items-center">
                <button
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 px-[var(--space-md)] py-[var(--space-xs)] rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[--color-accent]"
                  aria-label="Предыдущий"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Предыдущий</span>
                </button>

                <span className="text-sm text-[--text-muted]">
                  {currentIndex + 1} / {portfolioItems.length}
                </span>

                <button
                  onClick={goToNext}
                  disabled={currentIndex === portfolioItems.length - 1}
                  className="flex items-center gap-2 px-[var(--space-md)] py-[var(--space-xs)] rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[--color-accent]"
                  aria-label="Следующий"
                >
                  <span>Следующий</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GlassNavbar } from "@/components/ui/glass-navbar";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "О нас", href: "/#about" },
  { name: "Услуги", href: "/#services" },
  { name: "Лекала", href: "/#patterns" },
  { name: "Мерч", href: "/#merch" },
  { name: "Фулфилмент", href: "/#fulfillment" },
  { name: "Стоимость", href: "/#pricing" },
  { name: "Каталог", href: "/#catalog" },
  { name: "Портфолио", href: "/#portfolio" },
  { name: "FAQ", href: "/#faq" },
  { name: "Контакты", href: "/#contacts" },
];

export function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        // Update active section
        const sections = navigation.map(item => item.href.replace('/#', ''));
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <GlassNavbar>
      <div className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 font-semibold text-lg"
        >
          <span className="text-[var(--nav-text)] transition-colors duration-300">
            LOGO
          </span>
        </Link>

        {/* Centered Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
          <ul className="flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = activeSection === item.href.replace('/#', '');
              return (
                <li key={item.name}>
                  <Link
                    href={item.href as any}
                    className={cn(
                      "px-3 py-[var(--space-xs)] text-sm font-medium transition-all duration-200 rounded-md",
                      "text-[var(--nav-text)] hover:text-[var(--color-accent)]",
                      "hover:bg-[var(--nav-stroke)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
                      isActive && "text-[var(--color-accent)] bg-[var(--nav-stroke)]"
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA Button - Desktop */}
        <Button
          asChild
          className="hidden md:inline-flex rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-600)] text-white transition-all duration-200"
          size="sm"
        >
          <Link href="#cta-quick">Заказать</Link>
        </Button>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-md text-[var(--nav-text)] hover:bg-[var(--nav-stroke)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Открыть главное меню</span>
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white/95 dark:bg-[#0F1012]/95 backdrop-blur-lg shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Меню
                  </span>
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Закрыть меню"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6">
                  <ul className="space-y-2">
                    {navigation.map((item, index) => {
                      const isActive = activeSection === item.href.replace('/#', '');
                      return (
                        <motion.li
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={item.href as any}
                            className={cn(
                              "block px-4 py-3 rounded-lg text-base font-medium transition-all",
                              "text-gray-700 dark:text-gray-300",
                              "hover:bg-gray-100 dark:hover:bg-white/10",
                              "hover:text-[var(--color-accent)]",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
                              isActive && "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* CTA Button - Mobile */}
                <div className="p-6 border-t border-gray-200 dark:border-white/10">
                  <Button
                    asChild
                    className="w-full rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-600)] text-white transition-all duration-200"
                    size="lg"
                  >
                    <Link href="#cta-quick" onClick={() => setIsMobileMenuOpen(false)}>
                      Заказать
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </GlassNavbar>
  );
}
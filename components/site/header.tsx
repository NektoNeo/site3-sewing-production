"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GlassNavbar } from "@/components/ui/glass-navbar";
import { useEffect, useState } from "react";

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

        {/* CTA Button */}
        <Button
          asChild
          className="rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-600)] text-white transition-all duration-200"
          size="sm"
        >
          <Link href="#cta-quick">Заказать</Link>
        </Button>
      </div>
    </GlassNavbar>
  );
}
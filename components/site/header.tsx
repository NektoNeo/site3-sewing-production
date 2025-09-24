"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useHeaderContrast } from "@/lib/use-header-contrast";

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

  // Initialize header contrast switching
  useHeaderContrast();

  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="hdr transition-colors duration-300">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-semibold text-lg"
          >
            <span className="text-[color:var(--header-fg)] transition-colors duration-300">
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
                        "navlink text-sm font-medium transition-all duration-200",
                        "text-[color:var(--header-fg)]",
                        isActive && "nav-active"
                      )}
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
            className="rounded-full bg-brand hover:bg-brand-700 text-white"
            size="sm"
          >
            <Link href="#cta-quick">Заказать</Link>
          </Button>
        </div>

        {/* Progress line */}
        <div className='hdr-progress' />
      </div>
    </header>
  );
}
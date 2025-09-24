import { useEffect } from 'react';

export function useHeaderContrast() {
  useEffect(() => {
    const darkSections = document.querySelectorAll('.contrast-dark');

    const observer = new IntersectionObserver(
      (entries) => {
        const isDark = entries.some(entry => entry.isIntersecting);
        document.documentElement.setAttribute(
          'data-header',
          isDark ? 'dark' : 'light'
        );
      },
      {
        rootMargin: '-50px 0px 0px 0px',
        threshold: 0.2
      }
    );

    darkSections.forEach(section => observer.observe(section));

    // Scroll progress
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(100, Math.max(0, (scrolled / scrollHeight) * 100));
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);
}
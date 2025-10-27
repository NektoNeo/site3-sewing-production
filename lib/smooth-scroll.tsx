"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    let ScrollTrigger: any;

    const init = async () => {
      // Динамический импорт GSAP ScrollTrigger
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger: ST } = await import("gsap/ScrollTrigger");
      ScrollTrigger = ST;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      // КРИТИЧНО: Синхронизация Lenis с GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // Обновляем ScrollTrigger при изменении размера
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      // Cleanup
      return () => {
        lenis.destroy();
        ScrollTrigger?.getAll().forEach((t: any) => t.kill());
        gsap.ticker.remove(() => {});
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((cleanupFn) => {
      cleanup = cleanupFn;
    });

    return () => {
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
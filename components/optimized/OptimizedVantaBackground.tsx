'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { usePerformanceMode } from '@/lib/use-performance-mode';

interface VantaConfig {
  el: HTMLElement;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  minHeight: number;
  minWidth: number;
  scale: number;
  scaleMobile: number;
  backgroundColor: number;
  points: number;
  maxDistance: number;
  spacing: number;
  showLines: boolean;
  color1: number;
  color2: number;
}

export function OptimizedVantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const prefersReducedMotion = useReducedMotion();
  const performanceMode = usePerformanceMode();

  useEffect(() => {
    // P05: Skip animation on mobile or low-performance devices
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    const isLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4;
    const shouldLoadAnimation = !prefersReducedMotion && !isMobile && !isLowMemory && performanceMode !== 'low';

    if (!shouldLoadAnimation || !vantaRef.current) {
      return;
    }

    let effect: any = null;

    const loadVanta = async () => {
      try {
        const [Vanta, THREE] = await Promise.all([
          import('vanta/dist/vanta.net.min'),
          import('three'),
        ]);

        if (!vantaRef.current) return;

        const config: Partial<VantaConfig> = {
          el: vantaRef.current,
          mouseControls: performanceMode === 'high',
          touchControls: false,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: performanceMode === 'high' ? 1.00 : 0.50,
          scaleMobile: 0.30,
          backgroundColor: 0x0a0a0a,
          points: performanceMode === 'high' ? 15.00 : 8.00,
          maxDistance: performanceMode === 'high' ? 20.00 : 15.00,
          spacing: performanceMode === 'high' ? 15.00 : 20.00,
          showLines: performanceMode !== 'low',
          color1: 0x8a2be2,
          color2: 0xff1493,
        };

        effect = (Vanta.default as any)({
          ...config,
          THREE,
        });

        setVantaEffect(effect);
      } catch (error) {
        console.error('Failed to load Vanta effect:', error);
      }
    };

    // Defer loading until after initial render
    const timer = setTimeout(loadVanta, 100);

    // P05: Pause animation when page is not visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && effect) {
        effect.pause?.();
      } else if (document.visibilityState === 'visible' && effect) {
        effect.resume?.();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (effect) {
        effect.destroy();
      }
    };
  }, [prefersReducedMotion, performanceMode]);

  // P05: Static fallback for mobile/low-performance
  if (prefersReducedMotion || typeof window === 'undefined') {
    return (
      <div
        className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
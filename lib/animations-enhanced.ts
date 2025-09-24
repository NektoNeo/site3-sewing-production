import { Variants } from "framer-motion";

// Performant animations using only transform and opacity
export const createAnimation = (reducedMotion: boolean = false): {
  fadeRise: Variants;
  stagger: Variants;
  fadeIn: Variants;
  slideInFromLeft: Variants;
  slideInFromRight: Variants;
  scaleIn: Variants;
} => {
  if (reducedMotion) {
    // Reduced motion: instant transitions with opacity only
    return {
      fadeRise: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } }
      },
      stagger: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } }
      },
      fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } }
      },
      slideInFromLeft: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } }
      },
      slideInFromRight: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } }
      },
      scaleIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0 } }
      }
    }
  }

  // Full animations using transform and opacity
  return {
    fadeRise: {
      hidden: {
        opacity: 0,
        transform: "translateY(20px)",
      },
      visible: {
        opacity: 1,
        transform: "translateY(0px)",
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
    },
    stagger: {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.3,
        },
      },
    },
    fadeIn: {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      },
    },
    slideInFromLeft: {
      hidden: {
        transform: "translateX(-100px)",
        opacity: 0,
      },
      visible: {
        transform: "translateX(0px)",
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    },
    slideInFromRight: {
      hidden: {
        transform: "translateX(100px)",
        opacity: 0,
      },
      visible: {
        transform: "translateX(0px)",
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    },
    scaleIn: {
      hidden: {
        transform: "scale(0.8)",
        opacity: 0,
      },
      visible: {
        transform: "scale(1)",
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    }
  }
}

// Performance-based animation configurations
export const getAnimationConfig = (mode: 'high' | 'balanced' | 'low') => {
  switch (mode) {
    case 'high':
      return {
        duration: 0.6,
        staggerDelay: 0.1,
        enableParallax: true,
        enableBlur: true,
        enableGlow: true,
        enable3D: true,
      }
    case 'balanced':
      return {
        duration: 0.4,
        staggerDelay: 0.15,
        enableParallax: false,
        enableBlur: true,
        enableGlow: false,
        enable3D: false,
      }
    case 'low':
      return {
        duration: 0.2,
        staggerDelay: 0.2,
        enableParallax: false,
        enableBlur: false,
        enableGlow: false,
        enable3D: false,
      }
  }
}
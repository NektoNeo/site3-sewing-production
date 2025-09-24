import { MotionProps, Variants } from "framer-motion"

// Subtle hover animations for cards
export const cardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
  },
  hover: {
    y: -2,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

// Service cards with brand color shadow
export const serviceCardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
  },
  hover: {
    y: -2,
    boxShadow: "0 10px 25px -5px rgba(214, 66, 24, 0.15), 0 8px 10px -6px rgba(214, 66, 24, 0.1)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

// Button ripple configuration
export const rippleConfig = {
  duration: 600,
  size: 100,
  color: "rgba(255, 255, 255, 0.5)"
}

// Subtle scale for clickable elements
export const clickableScale: MotionProps = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.1 }
}

// Icon bounce on hover
export const iconBounce: Variants = {
  initial: { y: 0 },
  hover: {
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

// Table row hover
export const tableRowHover: Variants = {
  initial: {
    backgroundColor: "transparent"
  },
  hover: {
    backgroundColor: "rgba(214, 66, 24, 0.03)",
    transition: { duration: 0.15 }
  }
}

// Badge pulse animation
export const badgePulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut"
    }
  }
}

// Smooth appear animation
export const smoothAppear: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

// Focus ring animation
export const focusRing = {
  focus: {
    outlineWidth: "2px",
    outlineColor: "rgba(214, 66, 24, 0.5)",
    outlineOffset: "2px",
    outlineStyle: "solid",
    transition: { duration: 0.15 }
  }
}

// Canvas frame rate limiter
export const limitCanvasFrameRate = (
  callback: (timestamp: number) => void,
  targetFps: number = 30
) => {
  const frameInterval = 1000 / targetFps
  let lastFrameTime = 0
  let rafId: number | null = null

  const frame = (timestamp: number) => {
    if (timestamp - lastFrameTime >= frameInterval) {
      callback(timestamp)
      lastFrameTime = timestamp
    }
    rafId = requestAnimationFrame(frame)
  }

  const start = () => {
    if (!rafId) {
      rafId = requestAnimationFrame(frame)
    }
  }

  const stop = () => {
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }

  return { start, stop }
}

// Visibility-based animation control
export const createVisibilityController = (
  onVisible: () => void,
  onHidden: () => void
) => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      onHidden()
    } else {
      onVisible()
    }
  }

  const handleBlur = () => onHidden()
  const handleFocus = () => onVisible()

  const start = () => {
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("blur", handleBlur)
    window.addEventListener("focus", handleFocus)
  }

  const stop = () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange)
    window.removeEventListener("blur", handleBlur)
    window.removeEventListener("focus", handleFocus)
  }

  return { start, stop }
}
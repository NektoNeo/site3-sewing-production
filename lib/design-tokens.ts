/**
 * Design System Tokens
 * Centralized token definitions for theming and styling
 */

export const tokens = {
  colors: {
    // Dark theme (default)
    dark: {
      bg: {
        base: '#0E1113',
        surface: {
          1: '#161A1D',
          2: '#1C2226',
          glass: 'rgba(28, 34, 38, 0.6)',
        },
      },
      stroke: 'rgba(255, 255, 255, 0.08)',
      muted: '#2A3035',
      text: {
        primary: '#F3F4F6',
        secondary: '#B9C0C7',
      },
      accent: {
        DEFAULT: '#D64218',
        600: '#C03B15',
        glow: 'radial-gradient(40% 60% at 60% 40%, rgba(214, 66, 24, 0.24), transparent 70%)',
      },
    },
    // Light theme
    light: {
      bg: {
        paper: '#F5F6F8',
        surface: '#FFFFFF',
      },
      text: {
        ink: '#14181B',
        secondary: '#3F474D',
      },
      muted: '#EDEFF2',
      stroke: 'rgba(0, 0, 0, 0.06)',
    },
  },
  radius: {
    sm: '10px',
    md: '16px',
    lg: '24px',
  },
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '80px',
    '5xl': '96px',
  },
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.14)',
    md: '0 8px 24px rgba(0, 0, 0, 0.24)',
    lg: '0 16px 48px rgba(0, 0, 0, 0.32)',
  },
  typography: {
    fonts: {
      display: "'Inter var', Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      body: "'Inter var', Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    },
    sizes: {
      h1: '64px',
      h2: '44px',
      h3: '28px',
      lead: '20px',
      body: '16px',
      small: '14px',
    },
    lineHeight: {
      tight: '1.1',
      normal: '1.5',
      relaxed: '1.6',
      loose: '1.8',
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.08em',
    },
  },
  animation: {
    duration: {
      fast: '120ms',
      normal: '200ms',
      slow: '350ms',
    },
    easing: {
      ease: 'ease',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
} as const

// Helper function to apply tokens as CSS variables
export function applyTokens(theme: 'dark' | 'light' = 'dark') {
  const root = document.documentElement
  const colorTokens = theme === 'dark' ? tokens.colors.dark : tokens.colors.light

  // Apply color tokens
  if (theme === 'dark') {
    root.style.setProperty('--color-bg-dark', colorTokens.bg.base)
    root.style.setProperty('--color-surface-1', colorTokens.bg.surface[1])
    root.style.setProperty('--color-surface-2', colorTokens.bg.surface[2])
    root.style.setProperty('--color-surface-glass', colorTokens.bg.surface.glass)
    root.style.setProperty('--color-accent', colorTokens.accent.DEFAULT)
    root.style.setProperty('--color-accent-600', colorTokens.accent[600])
    root.style.setProperty('--color-accent-glow', colorTokens.accent.glow)
  } else {
    root.style.setProperty('--color-bg-light', colorTokens.bg.paper)
    root.style.setProperty('--color-surface-light', colorTokens.bg.surface)
    root.style.setProperty('--color-text-ink', colorTokens.text.ink)
  }

  root.style.setProperty('--color-stroke', colorTokens.stroke)
  root.style.setProperty('--color-muted', colorTokens.muted)
  root.style.setProperty('--color-text-primary', colorTokens.text.primary || colorTokens.text.ink)
  root.style.setProperty('--color-text-secondary', colorTokens.text.secondary)

  // Apply other tokens
  Object.entries(tokens.radius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value)
  })

  Object.entries(tokens.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--space-${key}`, value)
  })

  Object.entries(tokens.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value)
  })
}

// Export for use with Tailwind/shadcn
export const tailwindTokens = {
  extend: {
    colors: {
      background: 'var(--color-bg-dark)',
      foreground: 'var(--color-text-primary)',
      muted: {
        DEFAULT: 'var(--color-muted)',
        foreground: 'var(--color-text-secondary)',
      },
      accent: {
        DEFAULT: 'var(--color-accent)',
        foreground: 'var(--color-text-primary)',
      },
      card: {
        DEFAULT: 'var(--color-surface-1)',
        foreground: 'var(--color-text-primary)',
      },
      popover: {
        DEFAULT: 'var(--color-surface-2)',
        foreground: 'var(--color-text-primary)',
      },
      primary: {
        DEFAULT: 'var(--color-accent)',
        foreground: '#FFFFFF',
      },
      secondary: {
        DEFAULT: 'var(--color-surface-2)',
        foreground: 'var(--color-text-primary)',
      },
      destructive: {
        DEFAULT: '#DC2626',
        foreground: '#FFFFFF',
      },
      border: 'var(--color-stroke)',
      input: 'var(--color-stroke)',
      ring: 'var(--color-accent)',
    },
    borderRadius: {
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
    },
    spacing: {
      xs: 'var(--space-xs)',
      sm: 'var(--space-sm)',
      md: 'var(--space-md)',
      lg: 'var(--space-lg)',
      xl: 'var(--space-xl)',
      '2xl': 'var(--space-2xl)',
      '3xl': 'var(--space-3xl)',
      '4xl': 'var(--space-4xl)',
      '5xl': 'var(--space-5xl)',
    },
    boxShadow: {
      sm: 'var(--shadow-sm)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
    },
    fontFamily: {
      display: tokens.typography.fonts.display.split(','),
      body: tokens.typography.fonts.body.split(','),
    },
  },
}
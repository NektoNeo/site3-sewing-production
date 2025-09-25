# Design Tokens & Styling System Documentation

## Overview

This project implements a modern, accessible design token system based on industry best practices for 2024-2025. The system uses a three-layer architecture with semantic tokens, CSS custom properties with `@property` for type safety, and comprehensive accessibility features.

## Architecture

### 1. Three-Layer Token System

```
Layer 1: Primitive Tokens (Raw Values)
  ↓
Layer 2: Semantic Tokens (Contextual Meaning)
  ↓
Layer 3: Component Tokens (Specific Usage)
```

#### Layer 1: Primitive Tokens
Raw design values that form the foundation:
- `--c7-color-orange-500: #D64218`
- `--c7-color-gray-950: #0E1113`
- `--c7-space-4: 16px`

#### Layer 2: Semantic Tokens
Tokens with contextual meaning:
- `--c7-color-accent: var(--c7-color-orange-500)`
- `--c7-color-text-primary: var(--c7-color-gray-100)`
- `--c7-spacing-inline-md: var(--c7-space-4)`

#### Layer 3: Component Tokens
Component-specific tokens:
- `--c7-step-card-bg: var(--c7-color-surface-2)`
- `--c7-step-card-hover-border: var(--c7-color-accent)`

## CSS Custom Properties with @property

Modern browsers support `@property` for type-safe CSS variables:

```css
@property --c7-color-accent {
  syntax: '<color>';
  inherits: true;
  initial-value: #D64218;
}

@property --c7-progress {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}
```

### Benefits:
- Type safety and validation
- Smooth animations between values
- Better browser optimization
- Fallback values

## Design Token Categories

### Colors
```css
/* Primary Brand */
--c7-color-accent
--c7-color-accent-hover
--c7-color-accent-active

/* Surface Levels */
--c7-color-surface-1
--c7-color-surface-2
--c7-color-surface-3

/* Text Hierarchy */
--c7-color-text-primary
--c7-color-text-secondary
```

### Spacing (8px Grid System)
```css
/* Base scale */
--c7-space-0: 0
--c7-space-1: 4px
--c7-space-2: 8px
--c7-space-4: 16px
--c7-space-8: 32px
--c7-space-16: 64px

/* Semantic spacing */
--c7-spacing-inline-sm: 12px
--c7-spacing-stack-md: 32px
--c7-spacing-section: 96px
```

### Animation Tokens
```css
/* Timing Functions */
--c7-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--c7-ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55)

/* Durations */
--c7-duration-fast: 200ms
--c7-duration-normal: 300ms
--c7-duration-slow: 500ms

/* Composite Transitions */
--c7-transition-default: all 300ms cubic-bezier(0.4, 0, 0.2, 1)
```

## Accessibility Features

### 1. Focus Management
```css
/* Custom focus rings */
--c7-focus-ring-width: 2px
--c7-focus-ring-color: var(--c7-color-accent)
--c7-focus-ring-offset: 2px

/* Visible focus states */
*:focus-visible {
  outline: 2px solid var(--c7-focus-ring-color);
  outline-offset: 2px;
}
```

### 2. Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable all animations */
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3. High Contrast Support
```css
@media (prefers-contrast: high) {
  /* Enhanced borders and text */
  * {
    border-width: max(var(--border-width), 2px);
  }
}
```

### 4. Touch Target Sizing
All interactive elements maintain minimum 44x44px touch targets:
```css
button, a, [role="button"] {
  min-height: 44px;
  min-width: 44px;
}
```

## Component Implementation

### HowWeWork Section Features

The enhanced `HowWeWork` component demonstrates best practices:

#### Semantic HTML
- `<section>` with proper `aria-labelledby`
- `<ol>` for ordered steps
- `<article>` for each step content
- Proper heading hierarchy

#### ARIA Attributes
- `aria-labelledby` for section labeling
- `aria-expanded` for expandable content
- `aria-controls` for button-content relationships
- `aria-hidden` for decorative elements
- `role="list"` where semantic HTML needs reinforcement

#### Keyboard Navigation
- Full keyboard support (Tab, Enter, Space)
- Focus management for interactive elements
- Skip links for screen readers
- Focus trap for modal-like interactions

#### Progressive Enhancement
- Works without JavaScript (basic view)
- Enhanced with animations when JS available
- Respects user preferences (reduced motion)
- Fallbacks for older browsers

## Usage Examples

### Using Semantic Tokens in Components

```jsx
// In your React component
const StepCard = () => (
  <div
    className="card-c7"
    style={{
      backgroundColor: 'var(--c7-step-card-bg)',
      borderColor: 'var(--c7-step-card-border)'
    }}
  >
    <h3 className="text-c7-primary">Step Title</h3>
    <p className="text-c7-secondary">Description</p>
  </div>
)
```

### Applying Accessibility Utilities

```jsx
// Skip link for keyboard navigation
<a href="#main" className="skip-link">
  Skip to main content
</a>

// Screen reader only content
<span className="sr-only">
  Additional context for screen readers
</span>

// Focus trap container
<div className="focus-trap" role="dialog">
  {/* Modal content */}
</div>
```

### Responsive Design with Container Queries

```css
.container-query {
  container-type: inline-size;
}

@container (min-width: 640px) {
  .cq\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## Browser Support

### Modern Features Used:
- CSS `@property`: Chrome 85+, Firefox 128+, Safari 16.4+
- Container Queries: Chrome 105+, Firefox 110+, Safari 16+
- `:focus-visible`: All modern browsers
- CSS Custom Properties: All modern browsers

### Fallback Strategy:
- Progressive enhancement approach
- Graceful degradation for older browsers
- Core functionality works everywhere
- Enhanced features for modern browsers

## Integration with Tailwind CSS

The system works alongside Tailwind CSS:
- Custom tokens extend Tailwind's design system
- Use Tailwind utilities for rapid development
- Custom properties for precise control
- Component-specific tokens for consistency

## Integration with shadcn/ui

Compatible with shadcn/ui components:
- Tokens map to shadcn CSS variables
- Custom theme extensions supported
- Accessibility features complement shadcn
- Seamless component integration

## Performance Considerations

### Optimizations:
1. **Reduced Complexity**: Simplified shadows and effects
2. **Hardware Acceleration**: Transform and opacity animations
3. **Lazy Loading**: Components load on demand
4. **CSS Containment**: Layout and paint containment
5. **Variable Scoping**: Efficient custom property inheritance

## Testing Accessibility

### Tools & Techniques:
1. **Keyboard Navigation**: Tab through all interactive elements
2. **Screen Reader**: Test with NVDA/JAWS (Windows) or VoiceOver (Mac)
3. **Color Contrast**: WCAG AAA compliance (7:1 ratio)
4. **Browser DevTools**: Accessibility inspector
5. **Automated Testing**: axe-core, Pa11y

### Checklist:
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators clearly visible
- [ ] Screen reader announces content correctly
- [ ] Color contrast meets WCAG standards
- [ ] Touch targets are 44x44px minimum
- [ ] Animations respect prefers-reduced-motion
- [ ] Works in high contrast mode
- [ ] Form labels properly associated
- [ ] Error messages clearly communicated
- [ ] Loading states announced to screen readers

## Future Enhancements

### Planned Features:
1. **CSS Anchor Positioning**: For tooltips and popovers
2. **View Transitions API**: Smooth page transitions
3. **CSS Nesting**: Native nesting support
4. **Cascade Layers**: Better specificity management
5. **Color Mix Functions**: Dynamic color generation

## Resources

### Documentation:
- [MDN CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [W3C Design Tokens Format](https://design-tokens.github.io/community-group/format/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Tools:
- [Token CSS](https://tokencss.com/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Panda CSS](https://panda-css.com/)
- [Backlight.dev](https://backlight.dev/)

## Contributing

When adding new tokens or components:
1. Follow the three-layer architecture
2. Use semantic naming conventions
3. Include accessibility considerations
4. Test across browsers and devices
5. Document usage and examples
6. Ensure WCAG compliance

---

*This design system prioritizes accessibility, performance, and developer experience while maintaining visual consistency across the application.*
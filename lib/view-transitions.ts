/**
 * View Transitions API Utility
 *
 * Provides helper functions for smooth native browser transitions
 * with fallback for unsupported browsers
 */

type ViewTransitionCallback = () => void | Promise<void>;

/**
 * Check if View Transitions API is supported
 */
export function isViewTransitionSupported(): boolean {
  return typeof document !== 'undefined' && 'startViewTransition' in document;
}

/**
 * Start a view transition with fallback
 *
 * @param callback - Function to execute during transition
 * @param skipTransition - Force skip transition (for testing/a11y)
 */
export async function startViewTransition(
  callback: ViewTransitionCallback,
  skipTransition = false
): Promise<void> {
  // Skip if:
  // 1. API not supported
  // 2. User prefers reduced motion
  // 3. Explicitly skipped
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isViewTransitionSupported() || prefersReducedMotion || skipTransition) {
    await callback();
    return;
  }

  // Start view transition
  const transition = (document as any).startViewTransition(async () => {
    await callback();
  });

  // Wait for transition to complete
  try {
    await transition.finished;
  } catch (error) {
    // Transition was skipped or interrupted
    console.warn('View transition interrupted:', error);
  }
}

/**
 * Navigate with view transition
 *
 * @param href - URL to navigate to
 * @param router - Next.js router instance
 */
export async function navigateWithTransition(
  href: string,
  router: any // NextRouter type
): Promise<void> {
  await startViewTransition(async () => {
    await router.push(href);
  });
}

/**
 * Update DOM with view transition
 *
 * Useful for theme changes, modal open/close, etc.
 *
 * @param updateFn - Function that updates the DOM
 */
export async function updateWithTransition(
  updateFn: ViewTransitionCallback
): Promise<void> {
  await startViewTransition(updateFn);
}

/**
 * Add view transition name to element
 *
 * @param element - HTML element
 * @param name - Transition name
 */
export function setViewTransitionName(
  element: HTMLElement | null,
  name: string
): void {
  if (!element) return;

  // Use CSS custom property for better compatibility
  element.style.setProperty('view-transition-name', name);
}

/**
 * Remove view transition name from element
 *
 * @param element - HTML element
 */
export function clearViewTransitionName(element: HTMLElement | null): void {
  if (!element) return;

  element.style.removeProperty('view-transition-name');
}

/**
 * Helper to create smooth theme transitions
 *
 * @param newTheme - 'dark' | 'light'
 * @param updateThemeFn - Function to update theme
 */
export async function transitionTheme(
  newTheme: 'dark' | 'light',
  updateThemeFn: () => void
): Promise<void> {
  await updateWithTransition(() => {
    updateThemeFn();
  });
}

/**
 * Helper for smooth scroll with view transition
 *
 * @param targetId - Element ID to scroll to
 * @param options - ScrollIntoViewOptions
 */
export async function scrollToWithTransition(
  targetId: string,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
): Promise<void> {
  const target = document.getElementById(targetId);

  if (!target) {
    console.warn(`Element with id "${targetId}" not found`);
    return;
  }

  await updateWithTransition(() => {
    target.scrollIntoView(options);
  });
}

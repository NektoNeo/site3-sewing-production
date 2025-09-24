'use client';

import { useEffect } from 'react';

export function useKeyboardNavigation() {
  useEffect(() => {
    let isKeyboard = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !isKeyboard) {
        isKeyboard = true;
        document.documentElement.classList.add('keyboard-navigating');
      }
    };

    const handleMouseDown = () => {
      if (isKeyboard) {
        isKeyboard = false;
        document.documentElement.classList.remove('keyboard-navigating');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // Skip to main content shortcut (Alt + 1)
      if (e.altKey && e.key === '1') {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Navigate to header (Alt + H)
      if (e.altKey && e.key === 'h') {
        const header = document.querySelector('header');
        const firstLink = header?.querySelector('a, button');
        if (firstLink instanceof HTMLElement) {
          firstLink.focus();
        }
      }

      // Navigate to footer (Alt + F)
      if (e.altKey && e.key === 'f') {
        const footer = document.querySelector('footer');
        const firstLink = footer?.querySelector('a, button');
        if (firstLink instanceof HTMLElement) {
          firstLink.focus();
        }
      }

      // Escape key to close modals/popups
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('[role="dialog"]:not([hidden])');
        if (activeModal) {
          const closeButton = activeModal.querySelector('[aria-label*="close"], [aria-label*="Close"], .close-button');
          if (closeButton instanceof HTMLElement) {
            closeButton.click();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keyup', handleKeyUp);

    // Set up focus trap for modals
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const modal = document.querySelector('[role="dialog"]:not([hidden])');
          if (modal) {
            trapFocus(modal as HTMLElement);
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keyup', handleKeyUp);
      observer.disconnect();
    };
  }, []);
}

function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0] as HTMLElement;
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  firstFocusable?.focus();

  // Clean up when modal closes
  const cleanupObserver = new MutationObserver(() => {
    if (element.getAttribute('hidden') !== null || !document.body.contains(element)) {
      element.removeEventListener('keydown', handleTabKey);
      cleanupObserver.disconnect();
    }
  });

  cleanupObserver.observe(element, {
    attributes: true,
    attributeFilter: ['hidden'],
  });

  cleanupObserver.observe(element.parentElement || document.body, {
    childList: true,
  });
}
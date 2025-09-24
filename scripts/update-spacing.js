#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Map old spacing classes to new token-based classes
const spacingMap = {
  // Sections: pt-[space.3xl] pb-[space.3xl]
  'py-24': 'pt-[var(--space-3xl)] pb-[var(--space-3xl)]',
  'py-20': 'pt-[var(--space-3xl)] pb-[var(--space-3xl)]',
  'py-16': 'pt-[var(--space-3xl)] pb-[var(--space-3xl)]',
  'py-32': 'pt-[var(--space-4xl)] pb-[var(--space-4xl)]', // Hero can be bigger

  // Заголовок секции → контент: mt-[space.xl]
  'mt-8': 'mt-[var(--space-xl)]',
  'mt-12': 'mt-[var(--space-xl)]',
  'mt-6': 'mt-[var(--space-xl)]',
  'space-y-8': 'space-y-[var(--space-xl)]',
  'space-y-12': 'space-y-[var(--space-xl)]',

  // Карточки внутри гридов: gap-[space.lg]
  'gap-6': 'gap-[var(--space-lg)]',
  'gap-8': 'gap-[var(--space-lg)]',
  'gap-4': 'gap-[var(--space-lg)]',

  // Small spacing tokens
  'py-2': 'py-[var(--space-xs)]',
  'py-3': 'py-[var(--space-sm)]',
  'py-4': 'py-[var(--space-md)]',
  'px-4': 'px-[var(--space-md)]',
  'px-6': 'px-[var(--space-lg)]',
  'px-8': 'px-[var(--space-xl)]',

  // Padding
  'p-6': 'p-[var(--space-lg)]',
  'p-8': 'p-[var(--space-xl)]',

  // Margin bottom
  'mb-8': 'mb-[var(--space-xl)]',
  'mb-12': 'mb-[var(--space-2xl)]',
  'mb-16': 'mb-[var(--space-3xl)]',
};

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  Object.entries(spacingMap).forEach(([oldClass, newClass]) => {
    const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, newClass);
      updated = true;
    }
  });

  if (updated) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
  }
}

// Update all component files
const componentFiles = glob.sync('components/site/*.tsx');
componentFiles.forEach(updateFile);

console.log('Spacing system update complete!');
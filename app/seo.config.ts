import { DefaultSeoProps } from 'next-seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

const defaultSEO: DefaultSeoProps = {
  defaultTitle: 'Modern Web Solutions | Professional Development Services',
  titleTemplate: '%s | Site3',
  description: 'Professional web development services with modern technologies. We create fast, secure, and scalable digital solutions for your business.',
  canonical: siteUrl,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Site3',
    title: 'Modern Web Solutions | Professional Development Services',
    description: 'Professional web development services with modern technologies. We create fast, secure, and scalable digital solutions for your business.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Site3 - Modern Web Solutions',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    handle: '@site3',
    site: '@site3',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'robots',
      content: 'index,follow',
    },
    {
      name: 'googlebot',
      content: 'index,follow',
    },
    {
      name: 'theme-color',
      content: '#000000',
    },
    {
      name: 'author',
      content: 'Site3 Development Team',
    },
    {
      httpEquiv: 'x-ua-compatible',
      content: 'IE=edge',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
};

export default defaultSEO;

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: 'Home',
    description: 'Welcome to Site3 - Your partner for modern web development solutions.',
  },
  about: {
    title: 'About Us',
    description: 'Learn about our team, mission, and approach to creating exceptional digital experiences.',
  },
  services: {
    title: 'Our Services',
    description: 'Explore our comprehensive web development services including design, development, and optimization.',
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with our team to discuss your project and how we can help you succeed.',
  },
  pricing: {
    title: 'Pricing Plans',
    description: 'Choose the perfect plan for your business needs. Transparent pricing with no hidden fees.',
  },
  blog: {
    title: 'Blog & Resources',
    description: 'Stay updated with the latest web development trends, tips, and industry insights.',
  },
};
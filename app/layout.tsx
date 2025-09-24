import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./styles/animations.css";
import { inter, space } from "./fonts";
import { Providers } from "@/lib/providers";
import { SmoothScroll } from "@/lib/smooth-scroll";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Toaster } from "@/components/ui/toaster";
import defaultSEO from "./seo.config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultSEO.defaultTitle || "Modern Web Solutions | Professional Development Services",
    template: defaultSEO.titleTemplate || "%s | Site3",
  },
  description: defaultSEO.description || "Professional web development services with modern technologies",
  keywords: ["web development", "software development", "digital solutions", "modern technology", "scalable applications"],
  authors: [{ name: "Site3 Development Team" }],
  creator: "Site3",
  publisher: "Site3",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: defaultSEO.defaultTitle || "Modern Web Solutions",
    description: defaultSEO.description || "Professional web development services",
    siteName: "Site3",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Site3 - Modern Web Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSEO.defaultTitle || "Modern Web Solutions",
    description: defaultSEO.description || "Professional web development services",
    creator: "@site3",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${space.variable} font-sans`}>
        <Providers>
          <SmoothScroll>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
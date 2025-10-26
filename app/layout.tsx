import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./styles/animations.css";
import "./styles/performance.css";
import { inter, space } from "./fonts";
import { Providers } from "@/lib/providers";
import { SmoothScroll } from "@/lib/smooth-scroll";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Toaster } from "@/components/ui/toaster";
import { SentryTestButton } from "@/components/test/SentryTestButton";
import { SentryInit } from "./sentry-init";
import defaultSEO from "./seo.config";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultSEO.defaultTitle || "Швейное производство полного цикла | От разработки лекал до готового изделия",
    template: defaultSEO.titleTemplate || "%s | Швейное производство",
  },
  description: defaultSEO.description || "Профессиональное швейное производство с опытом более 5 лет. До 10 000 изделий в месяц. Пошив под ключ, разработка лекал, корпоративный мерч, брендирование: DTF печать, вышивка, шелкография, сублимация.",
  keywords: ["швейное производство", "пошив одежды", "разработка лекал", "корпоративный мерч", "униформа", "DTF печать", "вышивка", "шелкография", "сублимация", "пошив под ключ", "давальческая основа", "фулфилмент"],
  authors: [{ name: "Швейное производство" }],
  creator: "Швейное производство",
  publisher: "Швейное производство",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    title: defaultSEO.defaultTitle || "Швейное производство полного цикла",
    description: defaultSEO.description || "Профессиональное швейное производство с опытом более 5 лет",
    siteName: "Швейное производство",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Швейное производство полного цикла",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSEO.defaultTitle || "Швейное производство полного цикла",
    description: defaultSEO.description || "Профессиональное швейное производство с опытом более 5 лет",
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
    { media: "(prefers-color-scheme: light)", color: "#D64218" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1316" },
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
        <SentryInit />
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <Providers>
          <SmoothScroll>
            <Header />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <Toaster />
            {process.env.NODE_ENV === 'development' && <SentryTestButton />}
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
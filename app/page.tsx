import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/site/hero'), {
  loading: () => <div className="h-screen bg-zinc-950" />,
  ssr: false
})

const About = dynamic(() => import('@/components/site/about'))
const Services = dynamic(() => import('@/components/site/services'))
const PatternsSection = dynamic(() => import('@/components/site/patterns-section').then(mod => ({ default: mod.PatternsSection })))
const MerchSection = dynamic(() => import('@/components/site/merch-section').then(mod => ({ default: mod.MerchSection })))
const FulfillmentSection = dynamic(() => import('@/components/site/fulfillment-section').then(mod => ({ default: mod.FulfillmentSection })))
const PricingSection = dynamic(() => import('@/components/site/pricing-section').then(mod => ({ default: mod.PricingSection })))
const CatalogSection = dynamic(() => import('@/components/site/catalog-section').then(mod => ({ default: mod.CatalogSection })))
const Portfolio = dynamic(() => import('@/components/site/portfolio'))
const FAQ = dynamic(() => import('@/components/site/faq'))
const Contacts = dynamic(() => import('@/components/site/contacts'))

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <PatternsSection />
      <MerchSection />
      <FulfillmentSection />
      <PricingSection />
      <CatalogSection />
      <Portfolio />
      <FAQ />
      <Contacts />
    </main>
  );
}
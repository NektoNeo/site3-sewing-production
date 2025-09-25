import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/site/hero'), {
  loading: () => <div className="h-screen bg-zinc-950" />,
  ssr: false
})

const ZipperCanvas = dynamic(() => import('@/components/decor/ZipperCanvas'), {
  loading: () => <div className="h-20 bg-zinc-900/20 w-full" />,
  ssr: false
})
const About = dynamic(() => import('@/components/site/about'))
const AdvantagesCards = dynamic(() => import('@/components/site/advantages-cards'))
const CtaInline = dynamic(() => import('@/components/site/cta-inline').then(mod => ({ default: mod.CtaInline })))
const Steps = dynamic(() => import('@/components/site/steps'))
const Services = dynamic(() => import('@/components/site/services'))
const TechMediaCards = dynamic(() => import('@/components/site/tech-media-cards').then(mod => ({ default: mod.TechMediaCards })))
const PatternsSection = dynamic(() => import('@/components/site/patterns-section').then(mod => ({ default: mod.PatternsSection })))
const MerchSection = dynamic(() => import('@/components/site/merch-section').then(mod => ({ default: mod.MerchSection })))
const FulfillmentSection = dynamic(() => import('@/components/site/fulfillment-section').then(mod => ({ default: mod.FulfillmentSection })))
const PricingSection = dynamic(() => import('@/components/site/pricing-section').then(mod => ({ default: mod.PricingSection })))
const CatalogSection = dynamic(() => import('@/components/site/catalog-section').then(mod => ({ default: mod.CatalogSection })))
const CtaFinal = dynamic(() => import('@/components/site/cta-final').then(mod => ({ default: mod.CtaFinal })))
const CtaMain = dynamic(() => import('@/components/site/cta-main').then(mod => ({ default: mod.CtaMain })))
const Portfolio = dynamic(() => import('@/components/site/portfolio'))
const FAQ = dynamic(() => import('@/components/site/faq'))
const Contacts = dynamic(() => import('@/components/site/contacts'))

export default function Home() {
  return (
    <main>
      <Hero />
      <ZipperCanvas initialOpen={0.15} />
      <About />
      <AdvantagesCards />
      <CtaInline />
      <Services />
      <TechMediaCards />
      <PatternsSection />
      <MerchSection />
      <Steps />
      <FulfillmentSection />
      <PricingSection />
      <CatalogSection />
      <Portfolio />
      <CtaMain />
      <FAQ />
      <Contacts />
    </main>
  );
}
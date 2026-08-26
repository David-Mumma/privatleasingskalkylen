import { SiteHeader } from '@/components/sections/site-header';
import { HeroSection } from '@/components/sections/hero';
import { ComparisonSection } from '@/components/sections/comparison';
import { CalculatorLogicSection } from '@/components/sections/calculator-logic';
import { FaqSection } from '@/components/sections/faq';
import { SiteFooter } from '@/components/sections/site-footer';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        <HeroSection />
        <ComparisonSection />
        <CalculatorLogicSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}

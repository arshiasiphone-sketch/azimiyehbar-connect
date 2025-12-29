import { Header, Footer, FloatingContact } from "@/components/layout";
import {
  HeroSection,
  ServicesSection,
  StepsSection,
  FeaturesSection,
  CTASection,
} from "@/components/sections";
import { SEOHead } from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="باربری در کرج | عظیمیه بار 1850 - باربری در عظیمیه و مهرشهر"
        description="عظیمیه بار 1850 - بهترین خدمات باربری در کرج، عظیمیه، مهرشهر و گوهردشت. حمل اثاثیه منزل، باربری بین‌شهری، وانت‌بار و کامیونت‌بار با بیمه کامل. تماس: 1850"
        canonicalUrl="https://azimiyabar.ir"
      />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <StepsSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Index;

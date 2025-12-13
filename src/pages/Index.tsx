import { Header, Footer, FloatingContact } from "@/components/layout";
import {
  HeroSection,
  ServicesSection,
  StepsSection,
  FeaturesSection,
  CTASection,
} from "@/components/sections";

const Index = () => {
  return (
    <div className="min-h-screen">
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

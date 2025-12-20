import { Link } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function CTASection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="cta-title">
      <div className="container-custom">
        <AnimatedSection>
          <div className="relative rounded-3xl gradient-primary p-8 md:p-20 text-center text-primary-foreground overflow-hidden">
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent rounded-full blur-[100px]" />
              <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10">
              <h2 id="cta-title" className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                آماده سفارش باربری در کرج هستید؟
              </h2>
              <p className="text-primary-foreground/90 mb-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                همین حالا با عظیمیه بار تماس بگیرید یا درخواست خود را ثبت کنید. 
                کارشناسان ما در کمتر از ۳۰ دقیقه با شما تماس خواهند گرفت.
              </p>
              
              {/* Prominent phone number */}
              <div className="mb-6 md:mb-8">
                <a 
                  href="tel:1850" 
                  className="inline-flex items-center gap-3 text-3xl md:text-5xl font-black persian-nums text-accent hover:scale-105 active:scale-95 transition-transform animate-glow rounded-2xl p-4"
                  aria-label="تماس با باربری عظیمیه بار کرج"
                >
                  <Phone className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />
                  1850
                </a>
              </div>
              
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                <Link to="/booking">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="gap-3 text-base md:text-lg px-8 md:px-10 py-5 md:py-6 font-bold hover:scale-105 active:scale-95 transition-transform w-full sm:w-auto"
                    aria-label="ثبت درخواست باربری رایگان در کرج"
                  >
                    ثبت درخواست رایگان
                    <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                  </Button>
                </Link>
                <a href="tel:1850">
                  <Button 
                    size="lg" 
                    className="gap-3 text-base md:text-lg px-8 md:px-10 py-5 md:py-6 bg-accent text-foreground hover:bg-accent/90 font-bold hover:scale-105 active:scale-95 transition-transform w-full sm:w-auto"
                    aria-label="تماس فوری با باربری کرج"
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    <span className="persian-nums font-bold">تماس فوری</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

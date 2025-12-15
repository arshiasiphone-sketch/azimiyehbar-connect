import { Link } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="cta-title">
      <div className="container-custom">
        <div className="relative rounded-3xl gradient-primary p-10 md:p-20 text-center text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10">
            <h2 id="cta-title" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              آماده جابجایی بار خود هستید؟
            </h2>
            <p className="text-primary-foreground/90 mb-4 max-w-2xl mx-auto text-lg leading-relaxed">
              همین حالا با ما تماس بگیرید یا درخواست خود را ثبت کنید. 
              کارشناسان ما در کمتر از ۳۰ دقیقه با شما تماس خواهند گرفت.
            </p>
            
            {/* Prominent phone number */}
            <div className="mb-8">
              <a 
                href="tel:1850" 
                className="inline-flex items-center gap-3 text-4xl md:text-5xl font-black persian-nums text-accent hover:scale-105 transition-transform"
              >
                <Phone className="w-10 h-10" />
                1850
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/booking">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="gap-3 text-lg px-10 py-6 font-bold hover:scale-105 transition-transform"
                >
                  ثبت درخواست رایگان
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:1850">
                <Button 
                  size="lg" 
                  className="gap-3 text-lg px-10 py-6 bg-accent text-foreground hover:bg-accent/90 font-bold hover:scale-105 transition-transform"
                >
                  <Phone className="w-5 h-5" />
                  <span className="persian-nums font-bold">تماس فوری</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

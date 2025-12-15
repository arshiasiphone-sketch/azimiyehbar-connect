import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Truck, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen gradient-hero flex items-center overflow-hidden">
      {/* Background Pattern - Softer fade */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-[120px]" />
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/20 to-transparent" />

      <div className="container-custom relative z-10 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content - RTL aligned */}
          <div className="text-primary-foreground space-y-8 animate-fade-up text-right">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-5 py-2.5 text-sm border border-primary-foreground/20">
              <Shield className="w-5 h-5 text-accent" />
              <span>بیمه کامل محموله</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gradient">عظیمیه بار</span>{" "}
              <span className="text-accent persian-nums font-black">۱۸۵۰</span>
              : حمل سریع و مطمئن
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg leading-relaxed">
              با بیش از <strong className="text-primary-foreground">۱۵ سال تجربه</strong> در صنعت حمل و نقل، 
              ما تضمین می‌کنیم که بار شما با بالاترین استانداردهای ایمنی 
              و در کوتاه‌ترین زمان به مقصد برسد.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/booking">
                <Button size="lg" className="btn-primary gap-3 text-lg px-8 py-6">
                  ثبت درخواست رایگان
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:1850">
                <Button 
                  size="lg" 
                  className="gap-3 text-lg px-8 py-6 bg-accent text-foreground hover:bg-accent/90 font-bold"
                >
                  <Phone className="w-5 h-5" />
                  <span className="persian-nums font-bold">1850</span>
                </Button>
              </a>
            </div>

            {/* Stats - Centered alignment, bolder */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-primary-foreground/20">
              {[
                { value: "۱۵+", label: "سال تجربه" },
                { value: "۵۰۰۰+", label: "مشتری راضی" },
                { value: "۲۴/۷", label: "پشتیبانی" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-black persian-nums text-accent mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm md:text-base text-primary-foreground/80 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual - Organized grid with matching colors */}
          <div className="hidden lg:flex items-center justify-center animate-float">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/10">
                <Truck className="w-40 h-40 text-primary-foreground" aria-label="آیکون کامیون حمل بار" />
              </div>
              {/* Clock icon - top right */}
              <div className="absolute -top-4 -right-4 bg-accent text-foreground rounded-2xl p-4 shadow-xl" aria-label="سرعت بالا">
                <Clock className="w-8 h-8" />
              </div>
              {/* Shield icon - bottom left - matching blue theme */}
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-2xl p-4 shadow-xl" aria-label="ایمنی تضمینی">
                <Shield className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { ArrowLeft, Phone, Truck, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen gradient-hero flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-primary-foreground space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              <Shield className="w-4 h-4 text-accent" />
              <span>بیمه کامل محموله</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              حمل و نقل{" "}
              <span className="text-gradient">مطمئن</span>
              <br />
              با عظیمیه‌بار
            </h1>

            <p className="text-lg text-primary-foreground/80 max-w-lg leading-relaxed">
              با بیش از ۱۵ سال تجربه در صنعت حمل و نقل، ما تضمین می‌کنیم که بار شما
              با بالاترین استانداردهای ایمنی و در کوتاه‌ترین زمان به مقصد برسد.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/booking">
                <Button size="lg" className="btn-primary gap-2">
                  ثبت درخواست رایگان
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:02112345678">
                <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Phone className="w-5 h-5" />
                  <span className="persian-nums">۰۲۱-۱۲۳۴۵۶۷۸</span>
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/20">
              {[
                { value: "۱۵+", label: "سال تجربه" },
                { value: "۵۰۰۰+", label: "مشتری راضی" },
                { value: "۲۴/۷", label: "پشتیبانی" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold persian-nums text-accent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="hidden lg:flex items-center justify-center animate-float">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                <Truck className="w-40 h-40 text-primary-foreground" />
              </div>
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-2xl p-4 shadow-lg">
                <Clock className="w-8 h-8" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-success text-success-foreground rounded-2xl p-4 shadow-lg">
                <Shield className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

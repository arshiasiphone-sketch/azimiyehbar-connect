import { Link } from "react-router-dom";
import { Truck, Package, Home, Car, Container, Box, ArrowLeft, Phone, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const services = [
  {
    icon: Truck,
    title: "باربری بین‌شهری",
    description: "حمل ایمن بار به تمام نقاط کشور",
    features: ["بیمه کامل محموله", "ردیابی آنلاین بار", "تحویل در زمان مقرر"],
    price: "۵۰۰,۰۰۰",
  },
  {
    icon: Package,
    title: "باربری داخل شهری",
    description: "جابجایی سریع بار در سطح شهر",
    features: ["نرخ مناسب", "سرعت بالا", "پوشش تمام مناطق"],
    price: "۲۰۰,۰۰۰",
  },
  {
    icon: Home,
    title: "حمل اثاثیه منزل",
    description: "بسته‌بندی و جابجایی حرفه‌ای",
    features: ["بسته‌بندی رایگان", "کارگر مجرب", "بیمه اثاثیه"],
    price: "۳۵۰,۰۰۰",
  },
  {
    icon: Car,
    title: "وانت‌بار",
    description: "خدمات وانت برای بارهای کوچک",
    features: ["هزینه کم", "دسترسی سریع", "انعطاف‌پذیر"],
    price: "۱۵۰,۰۰۰",
  },
  {
    icon: Container,
    title: "کامیونت‌بار",
    description: "حمل بارهای سنگین و حجیم",
    features: ["ظرفیت بالا", "تجهیزات مدرن", "رانندگان حرفه‌ای"],
    price: "۴۰۰,۰۰۰",
  },
  {
    icon: Box,
    title: "بسته‌بندی حرفه‌ای",
    description: "بسته‌بندی استاندارد انواع وسایل",
    features: ["مواد با کیفیت", "محافظت کامل", "قیمت مناسب"],
    price: "۱۰۰,۰۰۰",
  },
];

export function ServicesSection() {
  return (
    <section className="section-padding bg-background" id="services" aria-labelledby="services-heading">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-16">
          <h2 id="services-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            خدمات <span className="text-gradient">باربری در کرج</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            عظیمیه بار - ارائه طیف گسترده‌ای از خدمات باربری در عظیمیه و کرج با بالاترین کیفیت
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-accent/10 text-foreground px-4 py-2 rounded-full">
            <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="font-bold">برای سفارش تماس بگیرید: </span>
            <span className="persian-nums font-black text-primary text-lg">1850</span>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={index} animation="scale" delay={index * 100}>
              <Card
                className="group card-hover border-border/50 overflow-hidden bg-card h-full"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 md:mb-6 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" aria-hidden="true" />
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm md:text-base mb-4">
                    {service.description}
                  </p>
                  
                  {/* Features with bullets */}
                  <ul className="space-y-2 mb-5 md:mb-6" role="list">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Price - Emphasized */}
                  <div className="flex items-baseline gap-2 pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">شروع از</span>
                    <span className="text-xl md:text-2xl font-black persian-nums text-primary">
                      {service.price}
                    </span>
                    <span className="text-sm text-muted-foreground">تومان</span>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12 md:mt-14 space-y-4" delay={600}>
          <Link to="/services">
            <Button 
              size="lg" 
              className="btn-primary gap-3 text-base md:text-lg px-8 md:px-10 py-5 md:py-6 hover:scale-105 active:scale-95 transition-transform"
              aria-label="مشاهده لیست کامل خدمات باربری در کرج"
            >
              مشاهده همه خدمات
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </Button>
          </Link>
          <p className="text-muted-foreground">
            یا با شماره <a href="tel:1850" className="persian-nums font-bold text-primary hover:underline" aria-label="تماس با باربری عظیمیه بار">1850</a> تماس بگیرید
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

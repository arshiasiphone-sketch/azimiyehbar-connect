import { Link } from "react-router-dom";
import { Truck, Package, Home, Car, Container, Box, ArrowLeft, Phone, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <section className="section-padding bg-background" id="services">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            خدمات <span className="text-gradient">عظیمیه‌بار</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            ما طیف گسترده‌ای از خدمات حمل و نقل را با بالاترین کیفیت ارائه می‌دهیم
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-accent/10 text-foreground px-4 py-2 rounded-full">
            <Phone className="w-5 h-5 text-primary" />
            <span className="font-bold">برای سفارش تماس بگیرید: </span>
            <span className="persian-nums font-black text-primary text-lg">1850</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group card-hover border-border/50 overflow-hidden bg-card"
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                
                {/* Features with bullets */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Price - Emphasized */}
                <div className="flex items-baseline gap-2 pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">شروع از</span>
                  <span className="text-2xl font-black persian-nums text-primary">
                    {service.price}
                  </span>
                  <span className="text-sm text-muted-foreground">تومان</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-14 space-y-4">
          <Link to="/services">
            <Button 
              size="lg" 
              className="btn-primary gap-3 text-lg px-10 py-6 hover:scale-105 transition-transform"
            >
              مشاهده همه خدمات
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <p className="text-muted-foreground">
            یا با شماره <a href="tel:1850" className="persian-nums font-bold text-primary hover:underline">1850</a> تماس بگیرید
          </p>
        </div>
      </div>
    </section>
  );
}

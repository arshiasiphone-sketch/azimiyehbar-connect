import { Link } from "react-router-dom";
import { Truck, Package, Home, Car, Container, Box, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Truck,
    title: "باربری بین‌شهری",
    description: "حمل ایمن بار به تمام نقاط کشور با بیمه کامل",
    price: "از ۵۰۰,۰۰۰ تومان",
  },
  {
    icon: Package,
    title: "باربری داخل شهری",
    description: "جابجایی سریع بار در سطح شهر با نرخ مناسب",
    price: "از ۲۰۰,۰۰۰ تومان",
  },
  {
    icon: Home,
    title: "حمل اثاثیه منزل",
    description: "بسته‌بندی و جابجایی حرفه‌ای اثاثیه منزل",
    price: "از ۳۵۰,۰۰۰ تومان",
  },
  {
    icon: Car,
    title: "وانت‌بار",
    description: "خدمات وانت برای بارهای کوچک و متوسط",
    price: "از ۱۵۰,۰۰۰ تومان",
  },
  {
    icon: Container,
    title: "کامیونت‌بار",
    description: "حمل بارهای سنگین با کامیونت‌های مجهز",
    price: "از ۴۰۰,۰۰۰ تومان",
  },
  {
    icon: Box,
    title: "بسته‌بندی حرفه‌ای",
    description: "بسته‌بندی استاندارد برای انواع وسایل",
    price: "از ۱۰۰,۰۰۰ تومان",
  },
];

export function ServicesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            خدمات <span className="text-gradient">عظیمیه‌بار</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ما طیف گسترده‌ای از خدمات حمل و نقل را با بالاترین کیفیت ارائه می‌دهیم
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group card-hover border-border/50 overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                <p className="text-primary font-bold persian-nums">
                  {service.price}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/services">
            <Button size="lg" variant="outline" className="gap-2">
              مشاهده همه خدمات
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

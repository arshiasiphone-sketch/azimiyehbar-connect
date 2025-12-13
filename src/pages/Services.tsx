import { Link } from "react-router-dom";
import { Header, Footer, FloatingContact } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Package, Home, Car, Container, Box, Check, ArrowLeft } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "باربری بین‌شهری",
    description: "حمل ایمن و سریع بار به تمام نقاط کشور با بیمه کامل محموله. ما با ناوگان مجهز و رانندگان مجرب، بار شما را به هر نقطه از ایران منتقل می‌کنیم.",
    price: "از ۵۰۰,۰۰۰ تومان",
    features: ["پوشش سراسری ۳۱ استان", "بیمه کامل محموله", "ردیابی آنلاین بار", "تحویل درب منزل"],
  },
  {
    icon: Package,
    title: "باربری داخل شهری",
    description: "جابجایی سریع و ایمن بار در سطح شهر با نرخ مناسب. خدمات وانت و نیسان برای بارهای کوچک و متوسط.",
    price: "از ۲۰۰,۰۰۰ تومان",
    features: ["سرویس فوری", "نرخ مناسب", "کارگر مجرب", "ساعات کاری انعطاف‌پذیر"],
  },
  {
    icon: Home,
    title: "حمل اثاثیه منزل",
    description: "بسته‌بندی و جابجایی حرفه‌ای اثاثیه منزل با نهایت دقت. تیم ما وسایل شما را با مواد استاندارد بسته‌بندی می‌کند.",
    price: "از ۳۵۰,۰۰۰ تومان",
    features: ["بسته‌بندی حرفه‌ای", "چیدمان در مقصد", "بیمه اثاثیه", "مواد بسته‌بندی رایگان"],
  },
  {
    icon: Car,
    title: "وانت‌بار",
    description: "خدمات وانت‌بار برای بارهای کوچک و متوسط با قیمت مناسب. رزرو آسان و سرویس سریع.",
    price: "از ۱۵۰,۰۰۰ تومان",
    features: ["رزرو آنلاین", "قیمت اقتصادی", "سرویس فوری", "پوشش تمام نقاط شهر"],
  },
  {
    icon: Container,
    title: "کامیونت‌بار",
    description: "حمل بارهای سنگین و حجیم با کامیونت‌های مجهز. مناسب برای اسباب‌کشی کامل و بارهای صنعتی.",
    price: "از ۴۰۰,۰۰۰ تومان",
    features: ["ظرفیت بالا", "رانندگان مجرب", "تجهیزات ایمنی", "بیمه کامل"],
  },
  {
    icon: Box,
    title: "بسته‌بندی حرفه‌ای",
    description: "خدمات بسته‌بندی استاندارد برای انواع وسایل با مواد با کیفیت. محافظت کامل از وسایل شکستنی و حساس.",
    price: "از ۱۰۰,۰۰۰ تومان",
    features: ["مواد با کیفیت", "بسته‌بندی ویژه شکستنی‌ها", "برچسب‌گذاری", "کارتن و نایلون"],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero pt-32 pb-20">
          <div className="container-custom text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">خدمات ما</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              طیف گسترده‌ای از خدمات حمل و نقل با بالاترین کیفیت و مناسب‌ترین قیمت
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="overflow-hidden card-hover">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 bg-primary/5 p-6 flex items-center justify-center">
                        <service.icon className="w-20 h-20 text-primary" />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {service.description}
                        </p>
                        <ul className="space-y-2 mb-4">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <Check className="w-4 h-4 text-success" />
                              <span className="text-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between">
                          <span className="text-primary font-bold persian-nums">
                            {service.price}
                          </span>
                          <Link to="/booking">
                            <Button size="sm" className="gap-1">
                              ثبت درخواست
                              <ArrowLeft className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Services;

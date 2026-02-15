import { MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

// مختصات پیش‌فرض: عظیمیه کرج
// برای تغییر مکان نقشه، مختصات lat و lng زیر را تغییر دهید
// می‌توانید مختصات را از Google Maps بگیرید:
// 1. به maps.google.com بروید
// 2. روی مکان مورد نظر کلیک راست کنید
// 3. اولین گزینه مختصات است (مثلاً: 35.8327, 50.9915)
const MAP_CONFIG = {
  lat: 35.834832,    // عرض جغرافیایی
  lng: 51.002889,    // طول جغرافیایی
  zoom: 16,          // سطح زوم (1-20)
  title: "عظیمیه بار - باربری در کرج"
};

const MapSection = () => {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.5!2d${MAP_CONFIG.lng}!3d${MAP_CONFIG.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ5JzU3LjciTiA1MMKwNTknMjkuNCJF!5e0!3m2!1sfa!2sir!4v1700000000000!5m2!1sfa!2sir&z=${MAP_CONFIG.zoom}`;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container-custom">
        <AnimatedSection animation="fade-in">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              <MapPin className="w-4 h-4" />
              موقعیت ما روی نقشه
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              دفتر مرکزی باربری عظیمیه بار
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              البرز، کرج، عظیمیه، خیابان ارکیده - آماده ارائه خدمات ۲۴ ساعته
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="scale" delay={200}>
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border/50 bg-card">
            {/* نقشه */}
            <div className="aspect-[21/9] md:aspect-[3/1]">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقعیت باربری عظیمیه بار روی نقشه"
                className="w-full h-full"
              />
            </div>

            {/* کارت اطلاعات */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-card/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-border/50 max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">عظیمیه بار</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    البرز، کرج، عظیمیه، خیابان ارکیده
                  </p>
                  <a
                    href={`https://www.google.com/maps?q=${MAP_CONFIG.lat},${MAP_CONFIG.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                  >
                    مسیریابی با Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default MapSection;
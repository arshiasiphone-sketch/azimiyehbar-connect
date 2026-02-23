import { MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

// مختصات پیش‌فرض: عظیمیه کرج
// برای تغییر مکان نقشه، مختصات lat و lng زیر را تغییر دهید
// می‌توانید مختصات را از Google Maps بگیرید:
// 1. به maps.google.com بروید
// 2. روی مکان مورد نظر کلیک راست کنید
// 3. اولین گزینه مختصات است (مثلاً: 35.8327, 50.9915)
const MAP_CONFIG = {
  lat: 35.834795,    // عرض جغرافیایی
  lng: 51.002883,    // طول جغرافیایی
  zoom: 17,          // سطح زوم (1-20)
  title: "عظیمیه بار - باربری در کرج"
};

const MapSection = () => {
  const mapUrl = `https://maps.google.com/maps?q=${MAP_CONFIG.lat},${MAP_CONFIG.lng}&z=${MAP_CONFIG.zoom}&output=embed&hl=fa`;

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
              عظیمیه، میدان طالقانی، جنب راهنمایی رانندگی - آماده ارائه خدمات ۲۴ ساعته
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
                    عظیمیه، میدان طالقانی، جنب راهنمایی رانندگی
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
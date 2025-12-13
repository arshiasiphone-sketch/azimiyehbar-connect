import { Shield, Clock, Users, Award, Headphones, MapPin } from "lucide-react";

const features = [
  { icon: Shield, title: "بیمه کامل", description: "بیمه تمام محموله‌ها" },
  { icon: Clock, title: "سرعت بالا", description: "تحویل در کوتاه‌ترین زمان" },
  { icon: Users, title: "تیم مجرب", description: "کارگران حرفه‌ای و متعهد" },
  { icon: Award, title: "کیفیت برتر", description: "خدمات با کیفیت تضمینی" },
  { icon: Headphones, title: "پشتیبانی ۲۴/۷", description: "همیشه در دسترس شما" },
  { icon: MapPin, title: "پوشش سراسری", description: "خدمات در تمام کشور" },
];

export function FeaturesSection() {
  return (
    <section className="section-padding gradient-hero text-primary-foreground">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            چرا <span className="text-accent">عظیمیه‌بار</span>؟
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            مزایای انتخاب ما برای حمل و نقل بار شما
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto rounded-xl bg-primary-foreground/10 flex items-center justify-center mb-3 group-hover:bg-primary-foreground/20 transition-colors">
                <feature.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-xs text-primary-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

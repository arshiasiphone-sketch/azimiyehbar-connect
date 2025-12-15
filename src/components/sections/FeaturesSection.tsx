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
    <section className="section-padding gradient-hero text-primary-foreground" aria-labelledby="features-title">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 id="features-title" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            چرا <span className="text-accent">عظیمیه‌بار</span>؟
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            مزایای انتخاب ما برای حمل و نقل بار شما
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary-foreground/10 flex items-center justify-center mb-4 group-hover:bg-primary-foreground/20 transition-colors border border-primary-foreground/10">
                <feature.icon className="w-10 h-10 text-accent" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-primary-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

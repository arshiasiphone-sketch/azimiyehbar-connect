import { Header, Footer, FloatingContact } from "@/components/layout";
import { Shield, Users, Award, Target, Clock, Truck } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero pt-32 pb-20">
          <div className="container-custom text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">درباره عظیمیه‌بار</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              با بیش از ۱۵ سال تجربه در صنعت حمل و نقل، ما افتخار می‌کنیم که یکی از
              معتبرترین شرکت‌های باربری کشور هستیم
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">داستان ما</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    شرکت حمل و نقل عظیمیه‌بار از سال ۱۳۸۸ فعالیت خود را در زمینه
                    ارائه خدمات باربری و حمل اثاثیه آغاز کرد. در طول این سال‌ها،
                    ما با تکیه بر تجربه، تخصص و تعهد به کیفیت، توانسته‌ایم اعتماد
                    هزاران مشتری را جلب کنیم.
                  </p>
                  <p>
                    امروز، عظیمیه‌بار با ناوگان مجهز و تیمی از کارگران متخصص و
                    متعهد، آماده ارائه بهترین خدمات حمل و نقل به شما عزیزان است.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "۱۵+", label: "سال تجربه" },
                  { value: "۵۰۰۰+", label: "مشتری راضی" },
                  { value: "۱۰۰+", label: "خودرو مجهز" },
                  { value: "۳۱", label: "استان تحت پوشش" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-primary/5 rounded-2xl p-6 text-center"
                  >
                    <p className="text-3xl font-bold text-primary persian-nums">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-muted/50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              ارزش‌های ما
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "امانت‌داری",
                  description: "بار شما امانت ماست و با نهایت دقت از آن مراقبت می‌کنیم",
                },
                {
                  icon: Clock,
                  title: "وقت‌شناسی",
                  description: "به تعهدات زمانی خود پایبند هستیم و در زمان مقرر حاضر می‌شویم",
                },
                {
                  icon: Users,
                  title: "مشتری‌مداری",
                  description: "رضایت مشتری برترین اولویت ما در ارائه خدمات است",
                },
              ].map((value, index) => (
                <div key={index} className="bg-card rounded-2xl p-8 text-center card-hover">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding gradient-hero text-primary-foreground">
          <div className="container-custom text-center">
            <Target className="w-16 h-16 mx-auto text-accent mb-6" />
            <h2 className="text-3xl font-bold mb-4">مأموریت ما</h2>
            <p className="max-w-3xl mx-auto text-primary-foreground/80 leading-relaxed">
              ارائه خدمات حمل و نقل با بالاترین استانداردهای کیفی و ایمنی، با
              قیمت منصفانه و در کوتاه‌ترین زمان ممکن. ما متعهد هستیم که تجربه‌ای
              بی‌دغدغه و رضایت‌بخش برای مشتریان خود فراهم کنیم.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default About;

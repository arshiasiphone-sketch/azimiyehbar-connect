import { useState } from "react";
import { Header, Footer, FloatingContact } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message) {
      toast({
        title: "خطا",
        description: "لطفاً فیلدهای ضروری را پر کنید",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("contact_messages").insert([formData]);

      if (error) throw error;

      // Send SMS notification to admin
      try {
        await supabase.functions.invoke("send-sms", {
          body: {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            requestType: formData.message.trim(),
            formType: "contact",
          },
        });
      } catch (smsError) {
        console.error("SMS notification failed:", smsError);
        // Don't throw - message is already saved
      }

      toast({
        title: "پیام ارسال شد",
        description: "پیام شما با موفقیت ثبت شد. به زودی با شما تماس خواهیم گرفت.",
      });

      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact error:", error);
      toast({
        title: "خطا در ارسال پیام",
        description: "مشکلی در ارسال پیام رخ داد. لطفاً دوباره تلاش کنید یا با شماره 1850 تماس بگیرید.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="تماس با باربری در کرج | عظیمیه بار 1850"
        description="تماس با عظیمیه بار - بهترین باربری در کرج، عظیمیه، مهرشهر و گوهردشت. شماره تماس: 1850. آدرس: کرج، عظیمیه. پشتیبانی ۲۴ ساعته."
        keywords={[
          "تماس باربری کرج",
          "شماره باربری عظیمیه",
          "آدرس باربری کرج",
          "پشتیبانی عظیمیه بار",
        ]}
        canonicalUrl="https://azimiyabar.ir/contact"
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero pt-32 pb-20">
          <div className="container-custom text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">تماس با باربری عظیمیه بار کرج</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              سوالی دارید؟ با ما در تماس باشید. کارشناسان باربری در کرج آماده پاسخگویی هستند.
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">اطلاعات تماس باربری کرج</h2>
                
                {[
                  { icon: Phone, title: "تلفن باربری", value: "1850", href: "tel:1850" },
                  { icon: Mail, title: "ایمیل", value: "info@azimiyabar.ir", href: "mailto:info@azimiyabar.ir" },
                  { icon: MapPin, title: "آدرس", value: "البرز، کرج، عظیمیه، خیابان ارکیده" },
                  { icon: Clock, title: "ساعات کاری", value: "شنبه تا پنجشنبه: ۸ صبح تا ۸ شب" },
                ].map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        {item.href ? (
                          <a 
                            href={item.href} 
                            className="text-muted-foreground text-sm hover:text-primary transition-colors persian-nums"
                            aria-label={`${item.title}: ${item.value}`}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground text-sm">{item.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-6">ارسال پیام به باربری کرج</h2>
                    <form onSubmit={handleSubmit} className="space-y-4" aria-label="فرم تماس با باربری عظیمیه بار">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">نام و نام خانوادگی *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="نام خود را وارد کنید"
                            className="input-rtl"
                            aria-required="true"
                            aria-label="نام و نام خانوادگی"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">شماره تماس *</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                            className="input-rtl persian-nums"
                            aria-required="true"
                            aria-label="شماره تماس"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">ایمیل (اختیاری)</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="example@email.com"
                          dir="ltr"
                          className="text-left"
                          aria-label="آدرس ایمیل"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">پیام شما *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="پیام خود را بنویسید..."
                          rows={5}
                          className="input-rtl"
                          aria-required="true"
                          aria-label="متن پیام"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full btn-primary gap-2" 
                        disabled={loading}
                        aria-label="ارسال پیام به باربری عظیمیه بار"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                            در حال ارسال...
                          </>
                        ) : (
                          <>
                            ارسال پیام
                            <Send className="w-4 h-4" aria-hidden="true" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="h-96 bg-muted">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d800!2d51.002883!3d35.834795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sfa!2sir!4v1700000000000`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="نقشه باربری عظیمیه بار در کرج"
            aria-label="موقعیت باربری عظیمیه بار در نقشه"
          />
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Contact;

import { useState } from "react";
import { Header, Footer, FloatingContact } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

      toast({
        title: "پیام ارسال شد",
        description: "پیام شما با موفقیت ثبت شد. به زودی با شما تماس خواهیم گرفت.",
      });

      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در ارسال پیام رخ داد. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero pt-32 pb-20">
          <div className="container-custom text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">تماس با ما</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              سوالی دارید؟ با ما در تماس باشید. کارشناسان ما آماده پاسخگویی هستند.
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">اطلاعات تماس</h2>
                
                {[
                  { icon: Phone, title: "تلفن", value: "۰۲۱-۱۲۳۴۵۶۷۸", href: "tel:02112345678" },
                  { icon: Mail, title: "ایمیل", value: "info@azimiyabar.ir", href: "mailto:info@azimiyabar.ir" },
                  { icon: MapPin, title: "آدرس", value: "تهران، عظیمیه، خیابان اصلی، پلاک ۱۲۳" },
                  { icon: Clock, title: "ساعات کاری", value: "شنبه تا پنجشنبه: ۸ صبح تا ۸ شب" },
                ].map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        {item.href ? (
                          <a href={item.href} className="text-muted-foreground text-sm hover:text-primary transition-colors persian-nums">
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
                    <h2 className="text-2xl font-bold text-foreground mb-6">ارسال پیام</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">نام و نام خانوادگی *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="نام خود را وارد کنید"
                            className="input-rtl"
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
                        />
                      </div>
                      <Button type="submit" className="w-full btn-primary gap-2" disabled={loading}>
                        {loading ? "در حال ارسال..." : "ارسال پیام"}
                        <Send className="w-4 h-4" />
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.9412566428375!2d51.3890!3d35.6892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzIxLjEiTiA1McKwMjMnMjAuNCJF!5e0!3m2!1sen!2s!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="نقشه"
          />
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Contact;

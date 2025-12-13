import { Link } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="relative rounded-3xl gradient-primary p-8 md:p-16 text-center text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              آماده جابجایی بار خود هستید؟
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              همین حالا با ما تماس بگیرید یا درخواست خود را ثبت کنید. کارشناسان ما
              در کمتر از ۳۰ دقیقه با شما تماس خواهند گرفت.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/booking">
                <Button size="lg" variant="secondary" className="gap-2">
                  ثبت درخواست رایگان
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:02112345678">
                <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Phone className="w-5 h-5" />
                  <span className="persian-nums">۰۲۱-۱۲۳۴۵۶۷۸</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

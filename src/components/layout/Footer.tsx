import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Truck, Instagram, Send, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                <Truck className="w-8 h-8 text-primary-foreground" aria-hidden="true" />
              </div>
              <div>
                <span className="text-2xl font-bold block">عظیمیه‌بار</span>
                <span className="text-accent persian-nums font-bold text-xl">1850</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              شرکت حمل و نقل عظیمیه‌بار با بیش از ۱۵ سال سابقه درخشان در ارائه خدمات
              باربری داخل و بین‌شهری، همراه مطمئن شما در جابجایی امن بار و اثاثیه
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">دسترسی سریع</h3>
            <ul className="space-y-4">
              {[
                { name: "صفحه اصلی", href: "/" },
                { name: "خدمات ما", href: "/services" },
                { name: "گالری تصاویر", href: "/gallery" },
                { name: "درباره ما", href: "/about" },
                { name: "ثبت درخواست", href: "/booking" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">خدمات ما</h3>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                باربری بین‌شهری
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                باربری داخل شهری
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                حمل اثاثیه منزل
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                وانت‌بار
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                کامیونت‌بار
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                بسته‌بندی حرفه‌ای
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold">تماس با ما</h3>
            <ul className="space-y-4">
              {/* Prominent phone number */}
              <li>
                <a 
                  href="tel:1850" 
                  className="flex items-center gap-3 bg-accent/20 rounded-xl p-4 hover:bg-accent/30 transition-colors group"
                >
                  <Phone className="w-8 h-8 text-accent" />
                  <div>
                    <span className="text-sm text-primary-foreground/70 block">تماس فوری</span>
                    <span className="persian-nums font-black text-2xl text-accent">1850</span>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80">info@azimiyabar.ir</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">
                  تهران، عظیمیه، خیابان اصلی، پلاک ۱۲۳
                </span>
              </li>
            </ul>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-accent/30 transition-colors"
                aria-label="اینستاگرام"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-accent/30 transition-colors"
                aria-label="تلگرام"
              >
                <Send className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-primary-foreground/70">
          <p className="persian-nums">
            © ۱۴۰۳ عظیمیه‌بار. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-accent transition-colors text-sm">
              سیاست حریم خصوصی
            </Link>
            <Link to="/admin" className="hover:text-accent transition-colors text-sm">
              ورود مدیران
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

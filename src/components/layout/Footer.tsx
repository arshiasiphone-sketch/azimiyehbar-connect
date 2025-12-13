import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Truck, Instagram, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">عظیمیه‌بار</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              شرکت حمل و نقل عظیمیه‌بار با بیش از ۱۵ سال سابقه درخشان در ارائه خدمات
              باربری داخل و بین‌شهری، همراه مطمئن شما در جابجایی امن بار و اثاثیه
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">دسترسی سریع</h3>
            <ul className="space-y-2">
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
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">خدمات ما</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>باربری بین‌شهری</li>
              <li>باربری داخل شهری</li>
              <li>حمل اثاثیه منزل</li>
              <li>وانت‌بار</li>
              <li>کامیونت‌بار</li>
              <li>بسته‌بندی حرفه‌ای</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تماس با ما</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-primary" />
                <span className="persian-nums text-primary-foreground/70">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-primary-foreground/70">info@azimiyabar.ir</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-primary-foreground/70">
                  تهران، عظیمیه، خیابان اصلی، پلاک ۱۲۳
                </span>
              </li>
            </ul>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p className="persian-nums">
            © ۱۴۰۳ عظیمیه‌بار. تمامی حقوق محفوظ است.
          </p>
          <Link to="/admin" className="hover:text-primary-foreground transition-colors">
            ورود مدیران
          </Link>
        </div>
      </div>
    </footer>
  );
}

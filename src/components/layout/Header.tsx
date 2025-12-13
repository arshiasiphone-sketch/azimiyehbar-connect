import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "صفحه اصلی", href: "/" },
  { name: "خدمات", href: "/services" },
  { name: "گالری", href: "/gallery" },
  { name: "درباره ما", href: "/about" },
  { name: "تماس با ما", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <Truck className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className={cn(
            "text-xl font-bold transition-colors",
            isScrolled ? "text-foreground" : "text-primary-foreground"
          )}>
            عظیمیه‌بار
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.href
                  ? "text-primary"
                  : isScrolled
                  ? "text-foreground"
                  : "text-primary-foreground/90"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:02112345678" className="flex items-center gap-2">
            <Button variant={isScrolled ? "outline" : "secondary"} size="sm" className="gap-2">
              <Phone className="w-4 h-4" />
              <span className="persian-nums">۰۲۱-۱۲۳۴۵۶۷۸</span>
            </Button>
          </a>
          <Link to="/booking">
            <Button size="sm" className="btn-primary">
              ثبت درخواست
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className={cn("w-6 h-6", isScrolled ? "text-foreground" : "text-primary-foreground")} />
          ) : (
            <Menu className={cn("w-6 h-6", isScrolled ? "text-foreground" : "text-primary-foreground")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full right-0 left-0 bg-background shadow-lg animate-fade-in">
          <nav className="flex flex-col p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "py-3 px-4 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
              <a href="tel:02112345678">
                <Button variant="outline" className="w-full gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="persian-nums">۰۲۱-۱۲۳۴۵۶۷۸</span>
                </Button>
              </a>
              <Link to="/booking" onClick={() => setIsOpen(false)}>
                <Button className="w-full btn-primary">ثبت درخواست</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

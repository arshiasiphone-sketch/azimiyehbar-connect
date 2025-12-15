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
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo - Larger with more whitespace */}
        <Link to="/" className="flex items-center gap-3 pl-6">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
            <Truck className="w-7 h-7 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "text-xl font-bold transition-colors leading-tight",
              isScrolled ? "text-foreground" : "text-primary-foreground"
            )}>
              عظیمیه‌بار
            </span>
            <span className={cn(
              "text-lg font-bold persian-nums transition-colors",
              isScrolled ? "text-primary" : "text-accent"
            )}>
              1850
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - Larger font with hover effects */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-base font-medium transition-all duration-300 relative py-2",
                "after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300",
                "hover:after:w-full",
                location.pathname === link.href
                  ? "text-primary after:w-full"
                  : isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-primary-foreground/90 hover:text-primary-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons - RTL aligned (right side) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/booking">
            <Button size="default" className="btn-primary text-base px-6">
              ثبت درخواست
            </Button>
          </Link>
          <a href="tel:1850">
            <Button 
              size="default" 
              className={cn(
                "gap-2 text-base px-6 font-bold",
                isScrolled 
                  ? "bg-accent text-foreground hover:bg-accent/90 border-0" 
                  : "bg-accent text-foreground hover:bg-accent/90"
              )}
            >
              <Phone className="w-5 h-5" />
              <span className="persian-nums text-foreground font-bold">1850</span>
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="باز کردن منو"
        >
          {isOpen ? (
            <X className={cn("w-7 h-7", isScrolled ? "text-foreground" : "text-primary-foreground")} />
          ) : (
            <Menu className={cn("w-7 h-7", isScrolled ? "text-foreground" : "text-primary-foreground")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full right-0 left-0 bg-background shadow-xl animate-fade-in border-t border-border">
          <nav className="flex flex-col p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "py-4 px-4 rounded-lg text-base font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
              <a href="tel:1850">
                <Button className="w-full gap-2 bg-accent text-foreground hover:bg-accent/90 font-bold text-lg">
                  <Phone className="w-5 h-5" />
                  <span className="persian-nums font-bold">تماس فوری: 1850</span>
                </Button>
              </a>
              <Link to="/booking" onClick={() => setIsOpen(false)}>
                <Button className="w-full btn-primary text-base">ثبت درخواست</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

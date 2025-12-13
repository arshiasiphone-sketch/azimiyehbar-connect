import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ClipboardList,
  Image,
  Settings,
  LogOut,
  Truck,
  Menu,
  X,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "داشبورد", href: "/admin/dashboard" },
  { icon: ClipboardList, label: "درخواست‌ها", href: "/admin/bookings" },
  { icon: MessageSquare, label: "پیام‌ها", href: "/admin/messages" },
  { icon: Image, label: "گالری", href: "/admin/gallery" },
  { icon: Settings, label: "خدمات", href: "/admin/services" },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 right-0 left-0 h-16 bg-background border-b border-border z-40 flex items-center justify-between px-4">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <Truck className="w-6 h-6 text-primary" />
          <span className="font-bold">پنل مدیریت</span>
        </div>
        <div className="w-6" />
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-64 bg-background border-l border-border z-50 transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Truck className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold">عظیمیه‌بار</span>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 right-0 left-0 p-4 border-t border-border">
          <div className="text-sm text-muted-foreground mb-2 truncate">
            {user?.email}
          </div>
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={signOut}
          >
            <LogOut className="w-4 h-4" />
            خروج
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:mr-64 pt-16 lg:pt-0">
        <header className="hidden lg:flex h-16 bg-background border-b border-border items-center px-6">
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
        </header>
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 left-6 z-40">
      <a href="tel:1850" aria-label="تماس با شماره 1850">
        <Button
          size="lg"
          className="rounded-full w-16 h-16 shadow-xl shadow-primary/40 animate-pulse-slow bg-accent hover:bg-accent/90 text-foreground flex flex-col items-center justify-center gap-0 p-0"
        >
          <Phone className="w-6 h-6" />
          <span className="text-xs font-bold persian-nums">1850</span>
        </Button>
      </a>
    </div>
  );
}

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 left-6 z-40">
      <a href="tel:02112345678">
        <Button
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg shadow-primary/30 animate-pulse-slow btn-primary"
        >
          <Phone className="w-6 h-6" />
        </Button>
      </a>
    </div>
  );
}

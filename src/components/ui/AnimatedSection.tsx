import { ReactNode } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "scale" | "slide-right" | "bounce";
  delay?: number;
}

const animationClasses = {
  "fade-up": "animate-slide-up-mobile md:animate-fade-up",
  "fade-in": "animate-fade-in",
  "scale": "animate-scale-mobile md:animate-scale-in",
  "slide-right": "animate-slide-right",
  "bounce": "animate-bounce-in",
};

export function AnimatedSection({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
}: AnimatedSectionProps) {
  const { ref, isInView } = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`${className} ${
        isInView ? animationClasses[animation] : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

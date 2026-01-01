import { Phone, ClipboardList, Truck, CheckCircle } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const steps = [
  {
    icon: Phone,
    title: "تماس با ما",
    description: "با شماره 1850 تماس بگیرید یا فرم آنلاین را پر کنید",
  },
  {
    icon: ClipboardList,
    title: "ثبت درخواست",
    description: "مشخصات بار و مقصد را به ما اعلام کنید",
  },
  {
    icon: Truck,
    title: "حمل بار",
    description: "تیم مجرب ما در زمان مقرر بار شما را حمل می‌کند",
  },
  {
    icon: CheckCircle,
    title: "تحویل امن",
    description: "بار شما سالم و امن به مقصد تحویل داده می‌شود",
  },
];

export function StepsSection() {
  return (
    <section className="section-padding bg-muted/50" aria-labelledby="steps-title">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-14">
          <h2 id="steps-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            مراحل <span className="text-gradient">سفارش باربری در کرج</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            در چهار مرحله ساده، بار خود را به مقصد برسانید
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {steps.map((step, index) => (
            <AnimatedSection key={index} animation="bounce" delay={index * 150}>
              <div className="relative text-center group">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div 
                    className="hidden md:block absolute top-16 left-0 w-full h-0.5 bg-border -translate-x-1/2" 
                    aria-hidden="true"
                  />
                )}

                <div className="relative z-10 flex flex-col items-center">
                  {/* Step Number - Above Icon */}
                  <div 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm md:text-lg font-bold persian-nums shadow-lg mb-3"
                    aria-label={`مرحله ${index + 1}`}
                  >
                    {index + 1}
                  </div>
                  
                  {/* Icon Circle */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 md:mb-5 group-hover:bg-primary/20 transition-colors border-2 border-primary/20">
                    <step.icon className="w-10 h-10 md:w-12 md:h-12 text-primary" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="text-base md:text-xl font-bold text-foreground mb-2 md:mb-3">
                  {step.title}
                </h3>
                <p className="text-xs md:text-base text-muted-foreground leading-relaxed px-2">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

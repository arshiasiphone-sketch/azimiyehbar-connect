import { Phone, ClipboardList, Truck, CheckCircle } from "lucide-react";

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
        <div className="text-center mb-14">
          <h2 id="steps-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            مراحل <span className="text-gradient">کار با ما</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            در چهار مرحله ساده، بار خود را به مقصد برسانید
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div 
                  className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border -translate-x-1/2" 
                  aria-hidden="true"
                />
              )}

              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors border-2 border-primary/20">
                  <step.icon className="w-12 h-12 text-primary" aria-hidden="true" />
                </div>
                <div 
                  className="absolute top-0 right-1/2 translate-x-6 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold persian-nums shadow-lg"
                  aria-label={`مرحله ${index + 1}`}
                >
                  {index + 1}
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

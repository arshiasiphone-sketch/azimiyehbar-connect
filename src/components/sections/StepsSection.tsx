import { Phone, ClipboardList, Truck, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "تماس با ما",
    description: "با شماره ما تماس بگیرید یا فرم آنلاین را پر کنید",
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
    <section className="section-padding bg-muted/50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            مراحل <span className="text-gradient">کار با ما</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            در چهار مرحله ساده، بار خود را به مقصد برسانید
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-border -translate-x-1/2" />
              )}

              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold persian-nums">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

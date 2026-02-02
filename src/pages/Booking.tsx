import { useState } from "react";
import { Header, Footer, FloatingContact } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JalaliCalendar } from "@/components/ui/jalali-calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CheckCircle, Truck, Phone, Loader2, AlertCircle } from "lucide-react";
import { format } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { SEOHead } from "@/components/SEOHead";

type ServiceType = "intercity" | "local" | "furniture" | "van" | "truck" | "packing";

const serviceOptions: { value: ServiceType; label: string }[] = [
  { value: "intercity", label: "باربری بین‌شهری" },
  { value: "local", label: "باربری داخل شهری" },
  { value: "furniture", label: "حمل اثاثیه منزل" },
  { value: "van", label: "وانت‌بار" },
  { value: "truck", label: "کامیونت‌بار" },
  { value: "packing", label: "بسته‌بندی حرفه‌ای" },
];

// Persian phone validation
const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-]/g, '');
  const persianMobileRegex = /^(\+98|0)?9\d{9}$/;
  return persianMobileRegex.test(cleaned);
};

// Format phone for display
const formatPhoneInput = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 4) return cleaned;
  if (cleaned.length <= 7) return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
  return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
};

const Booking = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState<Date>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    origin: "",
    destination: "",
    service_type: "" as ServiceType | "",
    description: "",
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = "نام و نام خانوادگی الزامی است";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "شماره تماس الزامی است";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "شماره موبایل نامعتبر است (مثال: ۰۹۱۲۳۴۵۶۷۸۹)";
    }
    
    if (!formData.origin.trim()) {
      newErrors.origin = "آدرس مبدأ الزامی است";
    }
    
    if (!formData.destination.trim()) {
      newErrors.destination = "آدرس مقصد الزامی است";
    }
    
    if (!formData.service_type) {
      newErrors.service_type = "نوع سرویس را انتخاب کنید";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value);
    setFormData({ ...formData, phone: formatted });
    if (errors.phone) {
      setErrors({ ...errors, phone: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "خطا در فرم",
        description: "لطفاً همه فیلدهای ضروری را به درستی پر کنید",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const cleanPhone = formData.phone.replace(/[\s\-]/g, '');
      
      const { error } = await supabase.from("bookings").insert([
        {
          full_name: formData.full_name.trim(),
          phone: cleanPhone,
          origin: formData.origin.trim(),
          destination: formData.destination.trim(),
          service_type: formData.service_type as ServiceType,
          description: formData.description.trim() || null,
          booking_date: date?.toISOString().split("T")[0] || null,
        },
      ]);

      if (error) throw error;

      // Send SMS notification to admin
      try {
        const serviceLabel = serviceOptions.find(s => s.value === formData.service_type)?.label || formData.service_type;
        const { error: smsInvokeError } = await supabase.functions.invoke("send-sms", {
          body: {
            name: formData.full_name.trim(),
            phone: cleanPhone,
            requestType: serviceLabel,
            details: `مبدأ: ${formData.origin.trim()} - مقصد: ${formData.destination.trim()}`,
            formType: "booking",
          },
        });

        if (smsInvokeError) throw smsInvokeError;
      } catch (smsError) {
        console.error("SMS notification failed:", smsError);
        toast({
          title: "پیامک ارسال نشد",
          description: "پیامک ارسال نشد، دوباره امتحان کنید",
          variant: "destructive",
        });
        // Don't throw - booking is already saved
      }

      setSuccess(true);
      toast({
        title: "درخواست ثبت شد",
        description: "درخواست شما با موفقیت ثبت شد. به زودی با شما تماس خواهیم گرفت.",
      });
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "خطا در ثبت درخواست",
        description: "مشکلی در ثبت درخواست رخ داد. لطفاً دوباره تلاش کنید یا با شماره 1850 تماس بگیرید.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  if (success) {
    return (
      <div className="min-h-screen">
        <SEOHead
          title="ثبت موفق درخواست باربری | عظیمیه بار کرج"
          description="درخواست باربری شما با موفقیت ثبت شد. کارشناسان عظیمیه بار به زودی با شما تماس خواهند گرفت."
        />
        <Header />
        <main className="gradient-hero min-h-[80vh] flex items-center justify-center">
          <Card className="max-w-md w-full mx-4 shadow-2xl">
            <CardContent className="pt-10 pb-8 text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-6">
                <CheckCircle className="w-14 h-14 text-success" aria-hidden="true" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-3">درخواست شما ثبت شد!</h1>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                کارشناسان باربری ما در کمتر از ۳۰ دقیقه با شما تماس خواهند گرفت.
              </p>
              <div className="bg-accent/10 rounded-xl p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-1">یا خودتان تماس بگیرید:</p>
                <a 
                  href="tel:1850" 
                  className="persian-nums text-3xl font-black text-primary hover:underline"
                  aria-label="تماس با باربری عظیمیه بار"
                >
                  1850
                </a>
              </div>
              <Button 
                onClick={() => setSuccess(false)} 
                className="btn-primary w-full"
                aria-label="ثبت درخواست جدید باربری"
              >
                ثبت درخواست جدید
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEOHead
        title="ثبت درخواست باربری در کرج | عظیمیه بار 1850"
        description="ثبت درخواست آنلاین باربری در کرج، عظیمیه، مهرشهر و گوهردشت. فرم رزرو رایگان با پاسخگویی در ۳۰ دقیقه. عظیمیه بار 1850"
        keywords={[
          "ثبت درخواست باربری کرج",
          "رزرو باربری عظیمیه",
          "درخواست آنلاین باربری",
          "فرم باربری کرج",
        ]}
        canonicalUrl="https://azimiyabar.ir/booking"
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero pt-32 pb-20">
          <div className="container-custom text-center text-primary-foreground">
            <Truck className="w-20 h-20 mx-auto mb-6 text-accent" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              ثبت درخواست باربری در کرج
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg leading-relaxed mb-6">
              فرم زیر را پر کنید تا کارشناسان باربری عظیمیه بار در اسرع وقت با شما تماس بگیرند
            </p>
            <div className="inline-flex items-center gap-3 bg-primary-foreground/10 rounded-full px-6 py-3">
              <Phone className="w-5 h-5 text-accent" aria-hidden="true" />
              <span>یا با شماره</span>
              <a 
                href="tel:1850" 
                className="persian-nums font-black text-2xl text-accent hover:underline"
                aria-label="تماس مستقیم با باربری عظیمیه بار"
              >
                1850
              </a>
              <span>تماس بگیرید</span>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-2xl">
            <Card className="shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">اطلاعات درخواست باربری</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  <ul className="mt-2 space-y-1" role="list">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />
                      <span>پاسخگویی در کمتر از ۳۰ دقیقه</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />
                      <span>مشاوره رایگان و قیمت‌دهی شفاف</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />
                      <span>بیمه کامل محموله شما</span>
                    </li>
                  </ul>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                  aria-label="فرم ثبت درخواست باربری در کرج"
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-base">نام و نام خانوادگی *</Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => {
                          setFormData({ ...formData, full_name: e.target.value });
                          if (errors.full_name) setErrors({ ...errors, full_name: "" });
                        }}
                        placeholder="نام کامل خود را وارد کنید"
                        className={cn("input-rtl h-12", errors.full_name && "border-destructive")}
                        aria-invalid={!!errors.full_name}
                        aria-describedby={errors.full_name ? "full_name-error" : undefined}
                        aria-required="true"
                      />
                      {errors.full_name && (
                        <p id="full_name-error" className="text-sm text-destructive flex items-center gap-1" role="alert">
                          <AlertCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.full_name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base">شماره تماس *</Label>
                      <div className="relative">
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          placeholder="۰۹۱۲-۳۴۵-۶۷۸۹"
                          className={cn("input-rtl persian-nums h-12 pl-16", errors.phone && "border-destructive")}
                          maxLength={13}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          aria-required="true"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                          ایران
                        </span>
                      </div>
                      {errors.phone && (
                        <p id="phone-error" className="text-sm text-destructive flex items-center gap-1" role="alert">
                          <AlertCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="origin" className="text-base">مبدأ *</Label>
                      <Input
                        id="origin"
                        value={formData.origin}
                        onChange={(e) => {
                          setFormData({ ...formData, origin: e.target.value });
                          if (errors.origin) setErrors({ ...errors, origin: "" });
                        }}
                        placeholder="آدرس مبدأ (شهر و محله)"
                        className={cn("input-rtl h-12", errors.origin && "border-destructive")}
                        aria-invalid={!!errors.origin}
                        aria-required="true"
                      />
                      {errors.origin && (
                        <p className="text-sm text-destructive flex items-center gap-1" role="alert">
                          <AlertCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.origin}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination" className="text-base">مقصد *</Label>
                      <Input
                        id="destination"
                        value={formData.destination}
                        onChange={(e) => {
                          setFormData({ ...formData, destination: e.target.value });
                          if (errors.destination) setErrors({ ...errors, destination: "" });
                        }}
                        placeholder="آدرس مقصد (شهر و محله)"
                        className={cn("input-rtl h-12", errors.destination && "border-destructive")}
                        aria-invalid={!!errors.destination}
                        aria-required="true"
                      />
                      {errors.destination && (
                        <p className="text-sm text-destructive flex items-center gap-1" role="alert">
                          <AlertCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.destination}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label className="text-base">نوع سرویس *</Label>
                      <Select
                        value={formData.service_type}
                        onValueChange={(value) => {
                          setFormData({ ...formData, service_type: value as ServiceType });
                          if (errors.service_type) setErrors({ ...errors, service_type: "" });
                        }}
                      >
                        <SelectTrigger 
                          className={cn("h-12", errors.service_type && "border-destructive")}
                          aria-label="انتخاب نوع سرویس باربری"
                        >
                          <SelectValue placeholder="انتخاب کنید" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service_type && (
                        <p className="text-sm text-destructive flex items-center gap-1" role="alert">
                          <AlertCircle className="w-4 h-4" aria-hidden="true" />
                          {errors.service_type}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base">تاریخ جابجایی</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full h-12 justify-start text-right font-normal"
                            aria-label="انتخاب تاریخ جابجایی"
                          >
                            <CalendarIcon className="ml-2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                            {date ? format(date, "yyyy/MM/dd", { locale: faIR }) : "انتخاب تاریخ (اختیاری)"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <JalaliCalendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(d) => d < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base">توضیحات اضافی</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="توضیحات بیشتر درباره بار، تعداد اقلام، وسایل خاص و..."
                      rows={4}
                      className="input-rtl resize-none"
                      aria-label="توضیحات اضافی درباره بار"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-primary h-14 text-lg font-bold" 
                    disabled={loading}
                    aria-label="ثبت درخواست رایگان باربری در کرج"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin ml-2" aria-hidden="true" />
                        در حال ثبت درخواست...
                      </>
                    ) : (
                      "ثبت درخواست رایگان"
                    )}
                  </Button>

                  <div className="text-center pt-4 border-t border-border">
                    <p className="text-muted-foreground mb-2">
                      یا با شماره زیر تماس بگیرید:
                    </p>
                    <a 
                      href="tel:1850" 
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                      aria-label="تماس تلفنی با باربری عظیمیه بار"
                    >
                      <Phone className="w-5 h-5" aria-hidden="true" />
                      <span className="persian-nums text-2xl font-bold">1850</span>
                    </a>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Booking;

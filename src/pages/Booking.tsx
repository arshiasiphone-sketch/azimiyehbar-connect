import { useState } from "react";
import { Header, Footer, FloatingContact } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CheckCircle, Truck } from "lucide-react";
import { format } from "date-fns";
import { faIR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type ServiceType = "intercity" | "local" | "furniture" | "van" | "truck" | "packing";

const serviceOptions: { value: ServiceType; label: string }[] = [
  { value: "intercity", label: "باربری بین‌شهری" },
  { value: "local", label: "باربری داخل شهری" },
  { value: "furniture", label: "حمل اثاثیه منزل" },
  { value: "van", label: "وانت‌بار" },
  { value: "truck", label: "کامیونت‌بار" },
  { value: "packing", label: "بسته‌بندی حرفه‌ای" },
];

const Booking = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    origin: "",
    destination: "",
    service_type: "" as ServiceType | "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name || !formData.phone || !formData.origin || !formData.destination || !formData.service_type) {
      toast({
        title: "خطا",
        description: "لطفاً همه فیلدهای ضروری را پر کنید",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("bookings").insert([
        {
          ...formData,
          service_type: formData.service_type as ServiceType,
          booking_date: date?.toISOString().split("T")[0] || null,
        },
      ]);

      if (error) throw error;

      setSuccess(true);
      toast({
        title: "درخواست ثبت شد",
        description: "درخواست شما با موفقیت ثبت شد. به زودی با شما تماس خواهیم گرفت.",
      });
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در ثبت درخواست رخ داد. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="gradient-hero min-h-[80vh] flex items-center justify-center">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="pt-8 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-6">
                <CheckCircle className="w-12 h-12 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">درخواست شما ثبت شد!</h2>
              <p className="text-muted-foreground mb-6">
                کارشناسان ما در کمتر از ۳۰ دقیقه با شما تماس خواهند گرفت.
              </p>
              <Button onClick={() => setSuccess(false)} className="btn-primary">
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
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero pt-32 pb-20">
          <div className="container-custom text-center text-primary-foreground">
            <Truck className="w-16 h-16 mx-auto mb-4 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">ثبت درخواست باربری</h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              فرم زیر را پر کنید تا کارشناسان ما در اسرع وقت با شما تماس بگیرند
            </p>
          </div>
        </section>

        {/* Booking Form */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">اطلاعات درخواست</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">نام و نام خانوادگی *</Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        placeholder="نام کامل خود را وارد کنید"
                        className="input-rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">شماره تماس *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        className="input-rtl persian-nums"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="origin">مبدأ *</Label>
                      <Input
                        id="origin"
                        value={formData.origin}
                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                        placeholder="آدرس مبدأ"
                        className="input-rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">مقصد *</Label>
                      <Input
                        id="destination"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        placeholder="آدرس مقصد"
                        className="input-rtl"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>نوع سرویس *</Label>
                      <Select
                        value={formData.service_type}
                        onValueChange={(value) => setFormData({ ...formData, service_type: value as ServiceType })}
                      >
                        <SelectTrigger>
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
                    </div>
                    <div className="space-y-2">
                      <Label>تاریخ جابجایی</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-right font-normal">
                            <CalendarIcon className="ml-2 h-4 w-4" />
                            {date ? format(date, "yyyy/MM/dd") : "انتخاب تاریخ"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">توضیحات اضافی</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="توضیحات بیشتر درباره بار، تعداد اقلام، وسایل خاص و..."
                      rows={4}
                      className="input-rtl"
                    />
                  </div>

                  <Button type="submit" className="w-full btn-primary" size="lg" disabled={loading}>
                    {loading ? "در حال ثبت..." : "ثبت درخواست رایگان"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    با ثبت درخواست، کارشناسان ما در کمتر از ۳۰ دقیقه با شما تماس خواهند گرفت.
                  </p>
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

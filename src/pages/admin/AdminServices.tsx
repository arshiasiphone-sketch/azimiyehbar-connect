import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type Service = Database["public"]["Tables"]["services"]["Row"];

const AdminServices = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    price_from: "",
    features: "",
    is_active: true,
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        description: service.description || "",
        icon: service.icon || "",
        price_from: service.price_from?.toString() || "",
        features: service.features?.join("\n") || "",
        is_active: service.is_active ?? true,
      });
    } else {
      setEditingService(null);
      setFormData({
        title: "",
        description: "",
        icon: "",
        price_from: "",
        features: "",
        is_active: true,
      });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      toast({
        title: "خطا",
        description: "لطفاً عنوان سرویس را وارد کنید",
        variant: "destructive",
      });
      return;
    }

    const serviceData = {
      title: formData.title,
      description: formData.description || null,
      icon: formData.icon || null,
      price_from: formData.price_from ? parseInt(formData.price_from) : null,
      features: formData.features ? formData.features.split("\n").filter(Boolean) : null,
      is_active: formData.is_active,
    };

    try {
      if (editingService) {
        const { error } = await supabase
          .from("services")
          .update(serviceData)
          .eq("id", editingService.id);

        if (error) throw error;
        toast({ title: "سرویس به‌روزرسانی شد" });
      } else {
        const { error } = await supabase
          .from("services")
          .insert([serviceData]);

        if (error) throw error;
        toast({ title: "سرویس اضافه شد" });
      }

      setDialogOpen(false);
      fetchServices();
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی رخ داد",
        variant: "destructive",
      });
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("آیا از حذف این سرویس مطمئن هستید؟")) return;

    try {
      const { error } = await supabase
        .from("services")
        .update({ is_active: false })
        .eq("id", id);

      if (error) throw error;
      toast({ title: "سرویس حذف شد" });
      fetchServices();
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در حذف رخ داد",
        variant: "destructive",
      });
    }
  };

  const formatPrice = (price: number | null) => {
    if (!price) return "-";
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  return (
    <AdminLayout title="مدیریت خدمات">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          {services.filter(s => s.is_active).length} سرویس فعال
        </p>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="gap-2">
              <Plus className="w-4 h-4" />
              افزودن سرویس
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingService ? "ویرایش سرویس" : "افزودن سرویس جدید"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="عنوان سرویس"
                  className="input-rtl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">توضیحات</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="توضیحات سرویس"
                  className="input-rtl"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icon">آیکون</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="نام آیکون"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price_from">قیمت از (تومان)</Label>
                  <Input
                    id="price_from"
                    type="number"
                    value={formData.price_from}
                    onChange={(e) => setFormData({ ...formData, price_from: e.target.value })}
                    placeholder="100000"
                    dir="ltr"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">ویژگی‌ها (هر خط یک ویژگی)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="ویژگی ۱&#10;ویژگی ۲&#10;ویژگی ۳"
                  className="input-rtl"
                  rows={4}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="is_active">فعال</Label>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
              </div>
              <Button type="submit" className="w-full">
                {editingService ? "به‌روزرسانی" : "افزودن"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p className="text-center py-8">در حال بارگذاری...</p>
      ) : services.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            هنوز سرویسی تعریف نشده است
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Card key={service.id} className={!service.is_active ? "opacity-50" : ""}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-lg">{service.title}</h3>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDialog(service)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteService(service.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                {service.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {service.description}
                  </p>
                )}
                <p className="text-primary font-bold persian-nums">
                  از {formatPrice(service.price_from)}
                </p>
                {service.features && service.features.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminServices;

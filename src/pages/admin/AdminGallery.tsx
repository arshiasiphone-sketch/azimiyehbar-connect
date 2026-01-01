import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";
import { format } from "date-fns-jalali";

type GalleryItem = Database["public"]["Tables"]["gallery"]["Row"];

interface FormData {
  title: string;
  image_url: string;
  category: string;
  is_active: boolean;
}

const AdminGallery = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<GalleryItem | null>(null);
  const [showInactive, setShowInactive] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    image_url: "",
    category: "",
    is_active: true,
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openDialog = (item?: GalleryItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        image_url: item.image_url,
        category: item.category || "",
        is_active: item.is_active ?? true,
      });
    } else {
      setEditingItem(null);
      setFormData({ title: "", image_url: "", category: "", is_active: true });
    }
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.image_url) {
      toast({
        title: "خطا",
        description: "لطفاً عنوان و آدرس تصویر را وارد کنید",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingItem) {
        const { error } = await supabase
          .from("gallery")
          .update(formData)
          .eq("id", editingItem.id);

        if (error) throw error;
        toast({ title: "تصویر به‌روزرسانی شد" });
      } else {
        const { error } = await supabase
          .from("gallery")
          .insert([{ ...formData }]);

        if (error) throw error;
        toast({ title: "تصویر اضافه شد" });
      }

      setDialogOpen(false);
      fetchItems();
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی رخ داد",
        variant: "destructive",
      });
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from("gallery")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "تصویر حذف شد" });
      setDeleteConfirm(null);
      fetchItems();
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در حذف رخ داد",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (item: GalleryItem) => {
    try {
      const { error } = await supabase
        .from("gallery")
        .update({ is_active: !item.is_active })
        .eq("id", item.id);

      if (error) throw error;
      toast({ title: item.is_active ? "تصویر غیرفعال شد" : "تصویر فعال شد" });
      fetchItems();
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی رخ داد",
        variant: "destructive",
      });
    }
  };

  const filteredItems = showInactive ? items : items.filter(i => i.is_active);

  const formatDate = (date: string | null) => {
    if (!date) return "-";
    try {
      return format(new Date(date), "yyyy/MM/dd");
    } catch {
      return date;
    }
  };

  return (
    <AdminLayout title="مدیریت گالری">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <p className="text-muted-foreground">
            {filteredItems.length} تصویر {showInactive ? "(همه)" : "(فعال)"}
          </p>
          <div className="flex items-center gap-2">
            <Switch
              checked={showInactive}
              onCheckedChange={setShowInactive}
              id="show-inactive"
            />
            <Label htmlFor="show-inactive" className="text-sm cursor-pointer">
              نمایش غیرفعال‌ها
            </Label>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()} className="gap-2">
              <Plus className="w-4 h-4" />
              افزودن تصویر
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "ویرایش تصویر" : "افزودن تصویر جدید"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="عنوان تصویر"
                  className="input-rtl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">آدرس تصویر</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">دسته‌بندی</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="مثال: ناوگان، پروژه‌ها"
                  className="input-rtl"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  id="is_active"
                />
                <Label htmlFor="is_active" className="cursor-pointer">
                  فعال (نمایش در سایت)
                </Label>
              </div>
              {formData.image_url && (
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = "")}
                  />
                </div>
              )}
              <Button type="submit" className="w-full">
                {editingItem ? "به‌روزرسانی" : "افزودن"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <p className="text-center py-8">در حال بارگذاری...</p>
      ) : filteredItems.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            هنوز تصویری در گالری وجود ندارد
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className={`overflow-hidden group ${!item.is_active ? 'opacity-60' : ''}`}>
              <div className="aspect-square relative">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {!item.is_active && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-destructive/80 text-destructive-foreground text-xs rounded">
                    غیرفعال
                  </div>
                )}
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => openDialog(item)}
                    title="ویرایش"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => toggleActive(item)}
                    title={item.is_active ? "غیرفعال کردن" : "فعال کردن"}
                  >
                    {item.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => setDeleteConfirm(item)}
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="font-medium text-sm truncate">{item.title}</p>
                <div className="flex justify-between items-center mt-1">
                  {item.category && (
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  )}
                  <p className="text-xs text-muted-foreground persian-nums">
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
            <AlertDialogDescription>
              این عملیات قابل بازگشت نیست. تصویر «{deleteConfirm?.title}» برای همیشه حذف خواهد شد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && deleteItem(deleteConfirm.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminGallery;
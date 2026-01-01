import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Eye, Download, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns-jalali";
import { Database } from "@/integrations/supabase/types";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type BookingStatus = Database["public"]["Enums"]["booking_status"];

const statusOptions: { value: BookingStatus; label: string }[] = [
  { value: "pending", label: "در انتظار" },
  { value: "confirmed", label: "تأیید شده" },
  { value: "in_progress", label: "در حال انجام" },
  { value: "completed", label: "تکمیل شده" },
  { value: "cancelled", label: "لغو شده" },
];

const serviceTypeLabels: Record<string, string> = {
  intercity: "باربری بین‌شهری",
  local: "باربری داخل شهری",
  furniture: "حمل اثاثیه منزل",
  van: "وانت‌بار",
  truck: "کامیونت‌بار",
  packing: "بسته‌بندی حرفه‌ای",
};

const AdminBookings = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Booking | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter as BookingStatus);
      }

      const { data, error } = await query;
      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const updateStatus = async (id: string, status: BookingStatus) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast({ title: "وضعیت به‌روزرسانی شد" });
      fetchBookings();
      setSelectedBooking(null);
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در به‌روزرسانی رخ داد",
        variant: "destructive",
      });
    }
  };

  const deleteBooking = async (id: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({ title: "درخواست حذف شد" });
      fetchBookings();
      setDeleteConfirm(null);
    } catch (error) {
      toast({
        title: "خطا",
        description: "مشکلی در حذف رخ داد",
        variant: "destructive",
      });
    }
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.full_name.toLowerCase().includes(search.toLowerCase()) ||
      booking.phone.includes(search) ||
      booking.origin.toLowerCase().includes(search.toLowerCase()) ||
      booking.destination.toLowerCase().includes(search.toLowerCase())
  );

  const formatJalaliDate = (date: string | null) => {
    if (!date) return "-";
    try {
      return format(new Date(date), "yyyy/MM/dd - HH:mm");
    } catch {
      return date;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; class: string }> = {
      pending: { label: "در انتظار", class: "bg-warning/10 text-warning" },
      confirmed: { label: "تأیید شده", class: "bg-primary/10 text-primary" },
      in_progress: { label: "در حال انجام", class: "bg-accent/10 text-accent" },
      completed: { label: "تکمیل شده", class: "bg-success/10 text-success" },
      cancelled: { label: "لغو شده", class: "bg-destructive/10 text-destructive" },
    };
    const { label, class: className } = statusMap[status] || statusMap.pending;
    return <span className={`px-2 py-1 rounded-full text-xs ${className}`}>{label}</span>;
  };

  const exportToCSV = () => {
    const headers = ["نام", "تلفن", "مبدأ", "مقصد", "نوع سرویس", "تاریخ", "وضعیت"];
    const rows = filteredBookings.map((b) => [
      b.full_name,
      b.phone,
      b.origin,
      b.destination,
      serviceTypeLabels[b.service_type] || b.service_type,
      b.booking_date || "",
      statusOptions.find((s) => s.value === b.status)?.label || b.status,
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `bookings-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
  };

  return (
    <AdminLayout title="مدیریت درخواست‌ها">
      <Card>
        <CardContent className="p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="جستجو بر اساس نام، تلفن، مبدأ یا مقصد..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="فیلتر وضعیت" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه</SelectItem>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportToCSV} className="gap-2">
              <Download className="w-4 h-4" />
              خروجی CSV
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>نام</TableHead>
                  <TableHead>تلفن</TableHead>
                  <TableHead>مبدأ</TableHead>
                  <TableHead>مقصد</TableHead>
                  <TableHead>سرویس</TableHead>
                  <TableHead>تاریخ ثبت</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead>عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      در حال بارگذاری...
                    </TableCell>
                  </TableRow>
                ) : filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      درخواستی یافت نشد
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.full_name}</TableCell>
                      <TableCell className="persian-nums">{booking.phone}</TableCell>
                      <TableCell>{booking.origin}</TableCell>
                      <TableCell>{booking.destination}</TableCell>
                      <TableCell>{serviceTypeLabels[booking.service_type] || booking.service_type}</TableCell>
                      <TableCell className="persian-nums text-xs">
                        {formatJalaliDate(booking.created_at)}
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status || "pending")}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedBooking(booking)}
                            title="مشاهده جزئیات"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteConfirm(booking)}
                            className="text-destructive hover:text-destructive"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>جزئیات درخواست</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">نام</p>
                  <p className="font-medium">{selectedBooking.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">تلفن</p>
                  <p className="font-medium persian-nums">{selectedBooking.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">مبدأ</p>
                  <p className="font-medium">{selectedBooking.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">مقصد</p>
                  <p className="font-medium">{selectedBooking.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">نوع سرویس</p>
                  <p className="font-medium">
                    {serviceTypeLabels[selectedBooking.service_type] || selectedBooking.service_type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">تاریخ جابجایی</p>
                  <p className="font-medium persian-nums">
                    {selectedBooking.booking_date || "مشخص نشده"}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">تاریخ ثبت</p>
                  <p className="font-medium persian-nums">{formatJalaliDate(selectedBooking.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">آخرین بروزرسانی</p>
                  <p className="font-medium persian-nums">{formatJalaliDate(selectedBooking.updated_at)}</p>
                </div>
              </div>
              {selectedBooking.description && (
                <div>
                  <p className="text-sm text-muted-foreground">توضیحات</p>
                  <p className="font-medium">{selectedBooking.description}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground mb-2">تغییر وضعیت</p>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={selectedBooking.status === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStatus(selectedBooking.id, option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setSelectedBooking(null);
                    setDeleteConfirm(selectedBooking);
                  }}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف درخواست
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
            <AlertDialogDescription>
              این عملیات قابل بازگشت نیست. درخواست «{deleteConfirm?.full_name}» برای همیشه حذف خواهد شد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && deleteBooking(deleteConfirm.id)}
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

export default AdminBookings;

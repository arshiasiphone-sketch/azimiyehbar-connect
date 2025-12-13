import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, MessageSquare, TrendingUp, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  totalBookings: number;
  pendingBookings: number;
  totalMessages: number;
  unreadMessages: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    pendingBookings: 0,
    totalMessages: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch bookings stats
        const { count: totalBookings } = await supabase
          .from("bookings")
          .select("*", { count: "exact", head: true });

        const { count: pendingBookings } = await supabase
          .from("bookings")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending");

        // Fetch messages stats
        const { count: totalMessages } = await supabase
          .from("contact_messages")
          .select("*", { count: "exact", head: true });

        const { count: unreadMessages } = await supabase
          .from("contact_messages")
          .select("*", { count: "exact", head: true })
          .eq("is_read", false);

        setStats({
          totalBookings: totalBookings || 0,
          pendingBookings: pendingBookings || 0,
          totalMessages: totalMessages || 0,
          unreadMessages: unreadMessages || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "کل درخواست‌ها",
      value: stats.totalBookings,
      icon: ClipboardList,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "در انتظار بررسی",
      value: stats.pendingBookings,
      icon: Clock,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    {
      title: "کل پیام‌ها",
      value: stats.totalMessages,
      icon: MessageSquare,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      title: "پیام‌های خوانده نشده",
      value: stats.unreadMessages,
      icon: TrendingUp,
      color: "text-success",
      bg: "bg-success/10",
    },
  ];

  return (
    <AdminLayout title="داشبورد">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold persian-nums mt-1">
                    {loading ? "..." : stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>آخرین درخواست‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentBookings />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>آخرین پیام‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentMessages />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

function RecentBookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      
      setBookings(data || []);
    };
    fetchBookings();
  }, []);

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

  return (
    <div className="space-y-4">
      {bookings.length === 0 ? (
        <p className="text-muted-foreground text-sm">درخواستی وجود ندارد</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">{booking.full_name}</p>
              <p className="text-sm text-muted-foreground">{booking.origin} → {booking.destination}</p>
            </div>
            {getStatusBadge(booking.status)}
          </div>
        ))
      )}
    </div>
  );
}

function RecentMessages() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      
      setMessages(data || []);
    };
    fetchMessages();
  }, []);

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <p className="text-muted-foreground text-sm">پیامی وجود ندارد</p>
      ) : (
        messages.map((message) => (
          <div key={message.id} className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium">{message.name}</p>
              {!message.is_read && (
                <span className="w-2 h-2 rounded-full bg-primary" />
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;

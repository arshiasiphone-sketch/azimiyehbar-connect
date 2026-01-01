# پروژه کرج باربری - نکات مهم

## 📋 خلاصه پروژه

وب‌سایت شرکت حمل و نقل با قابلیت‌های:
- رزرو آنلاین
- فرم تماس
- پنل ادمین
- ارسال SMS به ادمین
- SEO بهینه

## 🔧 تکنولوژی‌ها

| بخش | تکنولوژی |
|-----|----------|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Supabase (PostgreSQL) |
| SMS | SMS.ir API via Edge Functions |
| Hosting | لیارا (Static) |

## 🗃️ ساختار دیتابیس

### جداول اصلی

| جدول | توضیح |
|------|-------|
| `profiles` | پروفایل کاربران |
| `user_roles` | نقش‌های کاربری (admin/user) |
| `services` | لیست خدمات |
| `bookings` | رزروها |
| `contact_messages` | پیام‌های تماس |
| `gallery` | تصاویر گالری |

### Enums

```sql
-- نقش کاربر
app_role: 'admin' | 'user'

-- وضعیت رزرو
booking_status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'

-- نوع خدمت
service_type: 'intercity' | 'local' | 'furniture' | 'van' | 'truck' | 'packing'
```

## 🔐 متغیرهای محیطی

### Frontend (.env)
```env
VITE_SUPABASE_URL=https://urbabtkeofqgljgmxwrq.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_PROJECT_ID=urbabtkeofqgljgmxwrq
```

### Edge Functions (Supabase Secrets)
```env
SMSIR_API_KEY=<کلید API از SMS.ir>
ADMIN_PHONE_NUMBER=<شماره موبایل ادمین>
SMSIR_LINE_NUMBER=30007732900960
SMSIR_TEMPLATE_ID=<شناسه قالب - اختیاری>
```

## 📱 Edge Functions

### send-sms
- **مسیر:** `supabase/functions/send-sms/index.ts`
- **کاربرد:** ارسال SMS به ادمین هنگام ثبت رزرو یا پیام تماس
- **نوع:** Public (بدون احراز هویت)

## 🎨 SEO

### Schema Markup (JSON-LD)
- نوع: LocalBusiness
- شامل: خدمات، ساعات کاری، آدرس، تلفن

### Meta Tags
- Title: بهینه برای هر صفحه
- Description: توضیحات با کلمات کلیدی
- Open Graph: برای اشتراک در شبکه‌های اجتماعی

### فایل‌ها
- `public/sitemap.xml`: نقشه سایت
- `public/robots.txt`: دستورات ربات‌ها

## 🛣️ مسیرها

| مسیر | صفحه |
|------|------|
| `/` | صفحه اصلی |
| `/services` | خدمات |
| `/booking` | رزرو |
| `/contact` | تماس |
| `/about` | درباره ما |
| `/gallery` | گالری |
| `/admin` | پنل ادمین |
| `/admin/bookings` | مدیریت رزروها |
| `/admin/messages` | مدیریت پیام‌ها |
| `/admin/services` | مدیریت خدمات |
| `/admin/gallery` | مدیریت گالری |

## ⚠️ نکات مهم

### امنیت
1. RLS فعال است روی همه جداول
2. فقط ادمین‌ها به پنل مدیریت دسترسی دارند
3. کلیدهای API در Edge Functions امن هستند

### Performance
1. تصاویر با Lazy Loading بارگذاری می‌شوند
2. کامپوننت OptimizedImage با Intersection Observer کار می‌کند
3. Code Splitting با React.lazy (در صورت نیاز)

### SMS
1. اگر SMS ارسال نشود، داده در دیتابیس ذخیره می‌شود
2. خطاهای SMS در کنسول لاگ می‌شوند
3. محدودیت ارسال SMS.ir را بررسی کنید

## 🚀 دستورات

```bash
# توسعه
npm run dev

# ساخت Production
npm run build

# پیش‌نمایش Build
npm run preview

# Deploy به لیارا
liara deploy
```

## 📂 ساختار پروژه

```
├── docs/
│   ├── database/
│   │   ├── schema.sql       # Schema کامل دیتابیس
│   │   ├── seed.sql         # داده‌های اولیه
│   │   └── prisma-schema.prisma  # مرجع Prisma
│   ├── LIARA_DEPLOYMENT.md  # راهنمای لیارا
│   └── README.md            # این فایل
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── integrations/supabase/
├── supabase/
│   ├── config.toml
│   └── functions/send-sms/
└── liara.json
```

## 🔗 لینک‌های مفید

- [داکیومنت Supabase](https://supabase.com/docs)
- [داکیومنت لیارا](https://docs.liara.ir)
- [SMS.ir API](https://www.sms.ir/developers)
- [Tailwind CSS](https://tailwindcss.com/docs)

# حسابداری - نسخه 4.6.9

**اپلیکیشن حسابداری شخصی و خانوادگی جامع**

## 🎯 ویژگی‌های اصلی

### 💰 مدیریت تراکنش‌ها
- ✅ پرداخت و دریافت
- ✅ انتقال بین حساب‌ها
- ✅ تراکنش‌های ترکیبی
- ✅ ثبت بر اساس چک و نقد
- ✅ مدیریت وام و اقساط

### 📈 داشبورد تحلیلی
- ✅ نمودار Sunburst برای هزینه‌ها
- ✅ نمودار Pie برای درآمدها
- ✅ مقایسه بصری درآمد vs هزینه
- ✅ گزارش‌های مختلف (Excel Export)
- ✅ مانده حساب‌ها و بانک‌ها

### 🏦 مدیریت حساب‌ها
- ✅ حساب‌های بانکی
- ✅ صندوق شخصی
- ✅ کیف پول الکترونیکی
- ✅ اعضای خانواده
- ✅ پروژه‌ها

### 🔔 ویژگی‌های هوشمند
- ✅ درج تراکنش با صدا (Voice Recognition)
- ✅ نوتیفیکیشن‌های بانکی
- ✅ هشدار چک‌های سررسید شده
- ✅ یادداشت‌های شخصی
- ✅ بودجه‌بندی و پیش‌بینی

### 🔐 امنیت
- ✅ قفل امنیتی (رمز + اثر انگشت)
- ✅ رمزگذاری محلی
- ✅ پشتیبان‌گیری آنلاین و آفلاین

### 🎨 تخصیص‌پذیری
- ✅ حالت روز و شب
- ✅ انتخاب تم رنگی
- ✅ تغییر اندازه فونت
- ✅ انتخاب زبان (فارسی و انگلیسی)
- ✅ تقویم شمسی و میلادی

---

## 🛠️ تکنولوژی

- **React Native** - Framework
- **TypeScript** - Type Safety
- **Realm DB** - Database (سریع و سبک)
- **Chart.js** - Data Visualization
- **React Navigation** - Navigation
- **i18next** - Multi-language
- **Axios** - HTTP Client

---

## 📦 نصب و اجرا

### نیازمندی‌ها
- Node.js 16+
- npm 8+
- Android SDK (برای اندروید)
- Java JDK 11+

### نصب

```bash
# نصب dependencies
npm install

# نصب Pods (برای iOS)
cd ios && pod install && cd ..
```

### اجرا

```bash
# اندروید
npm run android

# iOS
npm run ios

# تطویری
npm start
```

### Build

```bash
# Build APK (اندروید)
npm run build:android

# Build Debug APK
npm run build:android:debug

# Build iOS
npm run build:ios
```

---

## 📁 ساختار پروژه

```
accounting-app/
├── src/
│   ├── screens/              # صفحات اپلیکیشن
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── SplashScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── TransactionScreen.tsx
│   │   ├── ReportScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── components/           # کمپوننت‌های مجدد استفاده‌پذیر
│   │   ├── Header.tsx
│   │   ├── BottomNavBar.tsx
│   │   └── DrawerMenu.tsx
│   ├── services/             # Services و API
│   │   ├── database/
│   │   │   └── realmService.ts
│   │   └── notification/
│   │       └── notificationService.ts
│   ├── context/              # Context API
│   │   ├── ThemeContext.tsx
│   │   └── AuthContext.tsx
│   ├── utils/                # Utility Functions
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── formatters.ts
│   │   └── validators.ts
│   ├── types/                # TypeScript Types
│   │   └── index.ts
│   ├── i18n/                 # Localization
│   │   └── (coming soon)
│   └── App.tsx               # Main App
├── android/                  # Android config
├── ios/                      # iOS config
├── app.json                  # Expo config
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── README.md
```

---

## 🚀 Roadmap

- [x] Project Setup
- [x] Core Architecture
- [x] Database Integration (Realm)
- [x] Navigation Structure
- [x] Home Screen with Charts
- [ ] Transaction Management
- [ ] Reports & Analytics
- [ ] Voice Recognition
- [ ] Cloud Sync
- [ ] Testing
- [ ] Release Build

---

## 📝 لایسنس

Private - تمام حقوق محفوظ است

---

## 👤 توسعه‌دهنده

Réxa Apps - حسابداری هوشمند

---

## 📞 پشتیبانی

برای سوالات و مشکلات، لطفاً issue ایجاد کنید.

---

**نسخه:** 4.6.9 | **وضعیت:** در حال توسعه 🔨

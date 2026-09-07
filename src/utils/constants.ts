export const APP_NAME = 'حسابداری';
export const APP_VERSION = '4.6.9';
export const APP_DESCRIPTION = 'پلتفرم حسابداری شخصی و خانوادگی جامع';

// Currency
export const CURRENCIES = {
  IRR: { symbol: '﷼', name: 'تومان' },
  USD: { symbol: '$', name: 'دلار' },
  EUR: { symbol: '€', name: 'یورو' },
};

// Transaction Categories with Icons
export const INCOME_CATEGORIES = [
  { id: 'salary', name: 'حقوق', icon: '💼', color: '#2ecc71' },
  { id: 'freelance', name: 'کار آزاد', icon: '💻', color: '#3498db' },
  { id: 'investment', name: 'سرمایه‌گذاری', icon: '📈', color: '#f39c12' },
  { id: 'gift', name: 'هدیه', icon: '🎁', color: '#9b59b6' },
  { id: 'bonus', name: 'بونوس', icon: '🎉', color: '#e74c3c' },
  { id: 'subsidy', name: 'یارانه', icon: '🏦', color: '#1abc9c' },
  { id: 'rental', name: 'اجاره', icon: '🏠', color: '#34495e' },
  { id: 'other', name: 'دیگر', icon: '💰', color: '#95a5a6' },
];

export const EXPENSE_CATEGORIES = [
  { id: 'electricity', name: 'برق', icon: '⚡', color: '#f39c12' },
  { id: 'water', name: 'آب', icon: '💧', color: '#3498db' },
  { id: 'gas', name: 'گاز', icon: '🔥', color: '#e74c3c' },
  { id: 'internet', name: 'اینترنت', icon: '📡', color: '#9b59b6' },
  { id: 'phone', name: 'تلفن', icon: '☎️', color: '#1abc9c' },
  { id: 'taxi', name: 'تاکسی', icon: '🚕', color: '#f1c40f' },
  { id: 'fuel', name: 'سوخت', icon: '⛽', color: '#e67e22' },
  { id: 'food', name: 'غذا', icon: '🍔', color: '#c0392b' },
  { id: 'shopping', name: 'خریداری', icon: '🛍️', color: '#d35400' },
  { id: 'entertainment', name: 'سرگرمی', icon: '🎬', color: '#8e44ad' },
  { id: 'health', name: 'بهداشت', icon: '🏥', color: '#16a085' },
  { id: 'education', name: 'آموزش', icon: '📚', color: '#2980b9' },
  { id: 'transport', name: 'حمل‌ونقل', icon: '🚗', color: '#c0392b' },
  { id: 'insurance', name: 'بیمه', icon: '🛡️', color: '#8c3039' },
  { id: 'rent', name: 'اجاره', icon: '🏠', color: '#27ae60' },
  { id: 'other', name: 'دیگر', icon: '📌', color: '#95a5a6' },
];

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'cash', name: 'نقد', icon: '💵' },
  { id: 'check', name: 'چک', icon: '✓' },
  { id: 'transfer', name: 'انتقال', icon: '↔️' },
  { id: 'card', name: 'کارت', icon: '💳' },
];

// Chart Colors
export const CHART_COLORS = [
  '#3498db', // blue
  '#2ecc71', // green
  '#e74c3c', // red
  '#f39c12', // orange
  '#9b59b6', // purple
  '#1abc9c', // turquoise
  '#e67e22', // dark orange
  '#34495e', // dark gray
];

// Months (Jalali Calendar)
export const MONTHS_JALALI = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

// Days (Persian)
export const DAYS_PERSIAN = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];

// Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'userToken',
  USER_DATA: 'userData',
  USER_SETTINGS: 'userSettings',
  TRANSACTIONS: 'transactions',
  ACCOUNTS: 'accounts',
  FUNDS: 'funds',
  MEMBERS: 'members',
  PROJECTS: 'projects',
  CHECKS: 'checks',
  BUDGETS: 'budgets',
  NOTIFICATIONS: 'notifications',
  LAST_BACKUP: 'lastBackup',
};
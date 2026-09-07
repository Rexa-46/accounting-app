import { CURRENCIES, MONTHS_JALALI } from './constants';

// Format currency
export const formatCurrency = (amount: number, currency: string = 'IRR'): string => {
  const currencyData = CURRENCIES[currency as keyof typeof CURRENCIES];
  const symbol = currencyData?.symbol || '﷼';
  const formatted = amount.toLocaleString('fa-IR');
  return `${formatted} ${symbol}`;
};

// Format number to Persian digits
export const formatPersianNumber = (num: string | number): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (d) => persianDigits[parseInt(d)]);
};

// Convert Persian digits to English
export const persianToEnglish = (str: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  let result = str;
  persianDigits.forEach((digit, index) => {
    result = result.replace(new RegExp(digit, 'g'), String(index));
  });
  return result;
};

// Format date (Jalali Calendar)
export const formatJalaliDate = (date: Date): string => {
  const d = new Date(date);
  const day = formatPersianNumber(d.getDate());
  const month = MONTHS_JALALI[d.getMonth()];
  const year = formatPersianNumber(d.getFullYear());
  return `${day} ${month} ${year}`;
};

// Format time
export const formatTime = (date: Date): string => {
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return formatPersianNumber(`${hours}:${minutes}`);
};

// Format date and time
export const formatDateTime = (date: Date): string => {
  return `${formatJalaliDate(date)} - ${formatTime(date)}`;
};

// Format short date
export const formatShortDate = (date: Date): string => {
  const d = new Date(date);
  const day = formatPersianNumber(d.getDate());
  const month = MONTHS_JALALI[d.getMonth()].substring(0, 3);
  return `${day} ${month}`;
};

// Check if today
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Get relative date
export const getRelativeDate = (date: Date): string => {
  if (isToday(date)) {
    return 'امروز';
  }
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return 'دیروز';
  }
  return formatJalaliDate(date);
};

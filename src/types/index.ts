// Transaction Types
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  TRANSFER = 'transfer',
  CHECK = 'check',
}

export enum PaymentMethod {
  CASH = 'cash',
  CHECK = 'check',
  TRANSFER = 'transfer',
}

export interface Transaction {
  id: string;
  title: string;
  description?: string;
  amount: number;
  type: TransactionType;
  paymentMethod: PaymentMethod;
  fromAccount: string;
  toAccount: string;
  date: Date;
  category: string;
  projectId?: string;
  memberIds?: string[];
  isRecurring: boolean;
  recurringPattern?: string;
}

// Account Types
export interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  currency: 'IRR' | 'USD' | 'EUR';
  bankName: string;
  color: string;
}

export interface PrivateFund {
  id: string;
  name: string;
  description: string;
  balance: number;
  currency: 'IRR' | 'USD' | 'EUR';
  type: 'wallet' | 'safe' | 'other';
  color: string;
}

// Category Types
export interface TransactionCategory {
  id: string;
  name: string;
  icon: string;
  type: TransactionType;
  color: string;
  isCustom: boolean;
}

// Member Types
export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  budget?: number;
  spent: number;
  members: string[]; // Member IDs
}

// Check Types
export interface Check {
  id: string;
  checkNumber: string;
  amount: number;
  dueDate: Date;
  issuedDate: Date;
  description: string;
  fromAccount: string;
  toAccount?: string;
  status: 'pending' | 'cleared' | 'bounced';
  payer?: string;
  payee?: string;
}

// Budget Types
export interface Budget {
  id: string;
  name: string;
  category: string;
  limitAmount: number;
  spent: number;
  month: number;
  year: number;
  alert: boolean;
  alertThreshold: number; // percentage
}

// Notification Types
export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  isRead: boolean;
  data?: any;
}

// Report Types
export interface DailyReport {
  date: Date;
  income: number;
  expense: number;
  net: number;
}

export interface MonthlyReport {
  month: number;
  year: number;
  income: number;
  expense: number;
  net: number;
  byCategory: { [key: string]: number };
}

export interface YearlyReport {
  year: number;
  income: number;
  expense: number;
  net: number;
  byMonth: { [key: number]: MonthlyReport };
}

// User Settings
export interface UserSettings {
  userId: string;
  userName: string;
  email: string;
  phone?: string;
  profileImage?: string;
  defaultCurrency: 'IRR' | 'USD' | 'EUR';
  dateFormat: 'jalali' | 'gregorian';
  language: 'fa' | 'en';
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  notifications: {
    bankMessages: boolean;
    checkAlerts: boolean;
    budgetAlerts: boolean;
    transactionNotifications: boolean;
  };
  security: {
    biometricEnabled: boolean;
    pinEnabled: boolean;
    autoLockTime: number; // minutes
  };
}

import { Transaction, Check, Budget, BankAccount, PrivateFund, FamilyMember, TransactionType, PaymentMethod } from '@/types';

// تاریخ امروز (شمسی)
const today = new Date();
const yesterdayObj = new Date(today.getTime() - 24 * 60 * 60 * 1000);
const twoDaysAgo = new Date(today.getTime() - 48 * 60 * 60 * 1000);

// حساب‌های بانکی
export const mockBankAccounts: BankAccount[] = [
  {
    id: '1',
    name: 'بانک ملت',
    accountNumber: '123456789',
    balance: 18450000,
    currency: 'IRR',
    bankName: 'بانک ملت',
    color: '#D64545',
  },
  {
    id: '2',
    name: 'بانک ملی',
    accountNumber: '987654321',
    balance: 6200000,
    currency: 'IRR',
    bankName: 'بانک ملی',
    color: '#2E86C1',
  },
  {
    id: '3',
    name: 'بانک صادرات',
    accountNumber: '555666777',
    balance: 2100000,
    currency: 'IRR',
    bankName: 'بانک صادرات',
    color: '#C9942B',
  },
];

// صندوق‌های شخصی
export const mockPrivateFunds: PrivateFund[] = [
  {
    id: '1',
    name: 'صندوق خانه (گاوصندوق)',
    description: 'پول نقد در خانه',
    balance: 3200000,
    currency: 'IRR',
    type: 'safe',
    color: '#7A5CC0',
  },
  {
    id: '2',
    name: 'پول توجیبی رضا',
    description: 'پول شهریه فرزند',
    balance: 450000,
    currency: 'IRR',
    type: 'wallet',
    color: '#2E86C1',
  },
  {
    id: '3',
    name: 'پول توجیبی نیلا',
    description: 'پول شهریه فرزند',
    balance: 380000,
    currency: 'IRR',
    type: 'wallet',
    color: '#D64545',
  },
];

// تراکنش‌های هزینه
export const mockExpenseTransactions: Transaction[] = [
  {
    id: '1',
    title: 'سوپرمارکت',
    description: 'خرید مواد غذایی',
    amount: 620000,
    type: TransactionType.EXPENSE,
    paymentMethod: PaymentMethod.CASH,
    fromAccount: 'نقد شخصی',
    toAccount: 'خوراک',
    date: today,
    category: 'خوراک',
    memberIds: ['sara'],
    isRecurring: false,
  },
  {
    id: '2',
    title: 'قبض برق',
    description: 'قبض برق ماه شهریور',
    amount: 310000,
    type: TransactionType.EXPENSE,
    paymentMethod: PaymentMethod.TRANSFER,
    fromAccount: 'بانک ملت',
    toAccount: 'قبوض',
    date: twoDaysAgo,
    category: 'قبوض',
    memberIds: [],
    isRecurring: true,
  },
  {
    id: '3',
    title: 'تاکسی',
    description: 'سفر به مراکز خریدی',
    amount: 75000,
    type: TransactionType.EXPENSE,
    paymentMethod: PaymentMethod.CASH,
    fromAccount: 'نقد شخصی',
    toAccount: 'حمل‌ونقل',
    date: today,
    category: 'حمل‌ونقل',
    memberIds: ['sara'],
    isRecurring: false,
  },
  {
    id: '4',
    title: 'قبض آب',
    description: 'قبض آب ماه شهریور',
    amount: 150000,
    type: TransactionType.EXPENSE,
    paymentMethod: PaymentMethod.TRANSFER,
    fromAccount: 'بانک ملی',
    toAccount: 'قبوض',
    date: yesterdayObj,
    category: 'قبوض',
    memberIds: [],
    isRecurring: true,
  },
];

// تراکنش‌های درآمد
export const mockIncomeTransactions: Transaction[] = [
  {
    id: '5',
    title: 'حقوق ماهانه',
    description: 'حقوق سپتامبر',
    amount: 28000000,
    type: TransactionType.INCOME,
    paymentMethod: PaymentMethod.TRANSFER,
    fromAccount: 'کارفرما',
    toAccount: 'بانک ملی',
    date: today,
    category: 'حقوق',
    memberIds: [],
    isRecurring: true,
  },
  {
    id: '6',
    title: 'یارانه',
    description: 'یارانه دولتی',
    amount: 900000,
    type: TransactionType.INCOME,
    paymentMethod: PaymentMethod.TRANSFER,
    fromAccount: 'دولت',
    toAccount: 'بانک صادرات',
    date: yesterdayObj,
    category: 'یارانه',
    memberIds: [],
    isRecurring: true,
  },
  {
    id: '7',
    title: 'فروش وسیله دست‌دوم',
    description: 'فروش دوچرخه قدیمی',
    amount: 450000,
    type: TransactionType.INCOME,
    paymentMethod: PaymentMethod.CASH,
    fromAccount: 'خریدار',
    toAccount: 'نقد شخصی',
    date: twoDaysAgo,
    category: 'فروش',
    memberIds: [],
    isRecurring: false,
  },
];

// تراکنش‌های انتقالی
export const mockTransferTransactions: Transaction[] = [
  {
    id: '8',
    title: 'انتقال به صندوق خانه',
    description: 'پس‌انداز ماهانه',
    amount: 2000000,
    type: TransactionType.TRANSFER,
    paymentMethod: PaymentMethod.TRANSFER,
    fromAccount: 'بانک ملت',
    toAccount: 'صندوق خانه',
    date: today,
    category: 'انتقالات',
    memberIds: [],
    isRecurring: false,
  },
];

// چک‌ها
export const mockChecks: Check[] = [
  {
    id: '1',
    checkNumber: '884215',
    amount: 12000000,
    dueDate: new Date('2024-09-20'),
    issuedDate: new Date('2024-09-16'),
    description: 'اجاره مغازه',
    fromAccount: 'بانک ملت',
    toAccount: 'موجر',
    status: 'pending',
    payer: 'سارا احمدی',
    payee: 'آقای رفیع‌زاده',
  },
  {
    id: '2',
    checkNumber: '884216',
    amount: 5400000,
    dueDate: new Date('2024-10-05'),
    issuedDate: new Date('2024-09-16'),
    description: 'قسط خودرو',
    fromAccount: 'بانک ملی',
    toAccount: 'شرکت اعتباری',
    status: 'pending',
    payer: 'سارا احمدی',
    payee: 'شرکت موتور',
  },
  {
    id: '3',
    checkNumber: '884217',
    amount: 8000000,
    dueDate: new Date('2024-10-18'),
    issuedDate: new Date('2024-09-16'),
    description: 'بدهی تامین‌کننده',
    fromAccount: 'بانک صادرات',
    toAccount: 'تامین‌کننده',
    status: 'pending',
    payer: 'سارا احمدی',
    payee: 'تاج تجارت',
  },
];

// بودجه‌ها
export const mockBudgets: Budget[] = [
  {
    id: '1',
    name: 'خوراک',
    category: 'خوراک',
    limitAmount: 6000000,
    spent: 3200000,
    month: 9,
    year: 1405,
    alert: false,
    alertThreshold: 80,
  },
  {
    id: '2',
    name: 'حمل‌ونقل',
    category: 'حمل‌ونقل',
    limitAmount: 2000000,
    spent: 1450000,
    month: 9,
    year: 1405,
    alert: false,
    alertThreshold: 80,
  },
  {
    id: '3',
    name: 'تفریح',
    category: 'تفریح',
    limitAmount: 1500000,
    spent: 520000,
    month: 9,
    year: 1405,
    alert: false,
    alertThreshold: 80,
  },
];

// اعضاء خانواده
export const mockFamilyMembers: FamilyMember[] = [
  {
    id: 'sara',
    name: 'سارا',
    relation: 'صاحب حساب',
    email: 'sara@example.com',
    phone: '09121234567',
    avatar: '👩',
  },
  {
    id: 'reza',
    name: 'رضا',
    relation: 'همسر',
    email: 'reza@example.com',
    phone: '09129876543',
    avatar: '👨',
  },
  {
    id: 'maman',
    name: 'مامان',
    relation: 'مادر',
    avatar: '👩‍🦳',
  },
  {
    id: 'baba',
    name: 'بابا',
    relation: 'پدر',
    avatar: '👨‍🦳',
  },
];

// تمام تراکنش‌ها
export const mockAllTransactions: Transaction[] = [
  ...mockExpenseTransactions,
  ...mockIncomeTransactions,
  ...mockTransferTransactions,
];

// میانبرها
export const mockShortcuts = [
  { id: '1', title: 'قبض برق', emoji: '⚡', category: 'قبوض', type: 'expense' },
  { id: '2', title: 'قبض آب', emoji: '💧', category: 'قبوض', type: 'expense' },
  { id: '3', title: 'کرایه تاکسی', emoji: '🚕', category: 'حمل‌ونقل', type: 'expense' },
  { id: '4', title: 'سوخت', emoji: '⛽', category: 'حمل‌ونقل', type: 'expense' },
  { id: '5', title: 'اینترنت', emoji: '🌐', category: 'قبوض', type: 'expense' },
];

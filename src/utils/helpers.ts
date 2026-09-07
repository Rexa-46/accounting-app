import { Transaction, TransactionType } from '@/types';

// Group transactions by date
export const groupTransactionsByDate = (transactions: Transaction[]) => {
  const grouped: { [key: string]: Transaction[] } = {};
  transactions.forEach((transaction) => {
    const dateKey = transaction.date.toDateString();
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(transaction);
  });
  return grouped;
};

// Group transactions by category
export const groupTransactionsByCategory = (transactions: Transaction[]) => {
  const grouped: { [key: string]: Transaction[] } = {};
  transactions.forEach((transaction) => {
    if (!grouped[transaction.category]) {
      grouped[transaction.category] = [];
    }
    grouped[transaction.category].push(transaction);
  });
  return grouped;
};

// Calculate total by type
export const calculateTotalByType = (transactions: Transaction[], type: TransactionType): number => {
  return transactions
    .filter((t) => t.type === type)
    .reduce((sum, t) => sum + t.amount, 0);
};

// Calculate balance
export const calculateBalance = (income: number, expense: number): number => {
  return income - expense;
};

// Get emotion based on income vs expense
export const getEmotion = (income: number, expense: number): 'happy' | 'sad' | 'neutral' => {
  if (income > expense) return 'happy';
  if (income < expense) return 'sad';
  return 'neutral';
};

// Filter transactions by date range
export const filterByDateRange = (transactions: Transaction[], startDate: Date, endDate: Date) => {
  return transactions.filter((t) => t.date >= startDate && t.date <= endDate);
};

// Filter transactions by type
export const filterByType = (transactions: Transaction[], type: TransactionType) => {
  return transactions.filter((t) => t.type === type);
};

// Filter transactions by category
export const filterByCategory = (transactions: Transaction[], category: string) => {
  return transactions.filter((t) => t.category === category);
};

// Sort transactions by date (newest first)
export const sortByDateDesc = (transactions: Transaction[]) => {
  return [...transactions].sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Sort transactions by amount (highest first)
export const sortByAmountDesc = (transactions: Transaction[]) => {
  return [...transactions].sort((a, b) => b.amount - a.amount);
};

// Generate UUID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get month start and end dates
export const getMonthDateRange = (date: Date = new Date()) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return { start, end };
};

// Get year start and end dates
export const getYearDateRange = (year: number = new Date().getFullYear()) => {
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  return { start, end };
};
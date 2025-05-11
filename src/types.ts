export interface Income {
  id?: number;
  source: string;
  amount: number;
  date: string;
}

export interface Expense {
  id?: number;
  category: string;
  name: string;
  amount: number;
  date: string;
}

export interface Budget {
  category: string;
  amount: number;
}

export interface CategoryProgress {
  category: string;
  budgetAmount: number;
  spentAmount: number;
  percentage: number;
}

// Predefined expense categories
export const EXPENSE_CATEGORIES = [
  'Tools',
  'Subscriptions',
  'Hosting',
  'Education',
  'Office',
  'Other'
];

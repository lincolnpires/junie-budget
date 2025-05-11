// Define interfaces for our API services

import { Income, Expense } from '../types';

// Generic response type for API calls
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Income service interface
export interface IncomeService {
  getIncomes(): Promise<ApiResponse<Income[]>>;
  addIncome(income: Omit<Income, 'id'>): Promise<ApiResponse<Income>>;
}

// Expense service interface
export interface ExpenseService {
  getExpenses(): Promise<ApiResponse<Expense[]>>;
  addExpense(expense: Omit<Expense, 'id'>): Promise<ApiResponse<Expense>>;
}

// Factory function to get the appropriate income service implementation
export const getIncomeService = (): IncomeService => {
  // For now, we'll use the local storage implementation
  // Later, this could return a different implementation based on environment or config
  return new LocalStorageIncomeService();
};

// Factory function to get the appropriate expense service implementation
export const getExpenseService = (): ExpenseService => {
  // For now, we'll use the local storage implementation
  return new LocalStorageExpenseService();
};

// Local storage implementation of the IncomeService interface
class LocalStorageIncomeService implements IncomeService {
  private readonly STORAGE_KEY = 'incomes';

  async getIncomes(): Promise<ApiResponse<Income[]>> {
    try {
      const savedIncomes = localStorage.getItem(this.STORAGE_KEY);
      const incomes = savedIncomes ? JSON.parse(savedIncomes) : [];
      return { data: incomes };
    } catch (error) {
      console.error('Failed to get incomes from local storage', error);
      return { error: 'Failed to load incomes. Please try again.' };
    }
  }

  async addIncome(income: Omit<Income, 'id'>): Promise<ApiResponse<Income>> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Create income with ID
      const incomeWithId: Income = {
        ...income,
        id: Date.now() // Use timestamp as a simple ID
      };

      // Get current incomes
      const { data: currentIncomes = [] } = await this.getIncomes();

      // Add new income
      const updatedIncomes = [...currentIncomes, incomeWithId];

      // Save to local storage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedIncomes));

      return { data: incomeWithId };
    } catch (error) {
      console.error('Failed to add income to local storage', error);
      return { error: 'Failed to add income. Please try again.' };
    }
  }
}

// Local storage implementation of the ExpenseService interface
class LocalStorageExpenseService implements ExpenseService {
  private readonly STORAGE_KEY = 'expenses';

  async getExpenses(): Promise<ApiResponse<Expense[]>> {
    try {
      const savedExpenses = localStorage.getItem(this.STORAGE_KEY);
      const expenses = savedExpenses ? JSON.parse(savedExpenses) : [];
      return { data: expenses };
    } catch (error) {
      console.error('Failed to get expenses from local storage', error);
      return { error: 'Failed to load expenses. Please try again.' };
    }
  }

  async addExpense(expense: Omit<Expense, 'id'>): Promise<ApiResponse<Expense>> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Create expense with ID
      const expenseWithId: Expense = {
        ...expense,
        id: Date.now() // Use timestamp as a simple ID
      };

      // Get current expenses
      const { data: currentExpenses = [] } = await this.getExpenses();

      // Add new expense
      const updatedExpenses = [...currentExpenses, expenseWithId];

      // Save to local storage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedExpenses));

      return { data: expenseWithId };
    } catch (error) {
      console.error('Failed to add expense to local storage', error);
      return { error: 'Failed to add expense. Please try again.' };
    }
  }
}

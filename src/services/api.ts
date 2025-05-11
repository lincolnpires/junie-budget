// Define interfaces for our API services
import type {Income, Expense, Budget, CategoryProgress} from '../types';

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

// Budget service interface
export interface BudgetService {
  getBudgets(): Promise<ApiResponse<Budget[]>>;
  setBudget(budget: Budget): Promise<ApiResponse<Budget>>;
}

// Progress service interface
export interface ProgressService {
  getProgress(): Promise<ApiResponse<CategoryProgress[]>>;
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

// Factory function to get the appropriate budget service implementation
export const getBudgetService = (): BudgetService => {
  // For now, we'll use the local storage implementation
  return new LocalStorageBudgetService();
};

// Factory function to get the appropriate progress service implementation
export const getProgressService = (): ProgressService => {
  // For now, we'll use the local storage implementation
  return new LocalStorageProgressService();
};

const apiDelaySimulation = 300;

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
      await new Promise(resolve => setTimeout(resolve, apiDelaySimulation));

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
      await new Promise(resolve => {
        return setTimeout(resolve, apiDelaySimulation);
      });

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

// Local storage implementation of the BudgetService interface
class LocalStorageBudgetService implements BudgetService {
  private readonly STORAGE_KEY = 'budgets';

  async getBudgets(): Promise<ApiResponse<Budget[]>> {
    try {
      const savedBudgets = localStorage.getItem(this.STORAGE_KEY);
      const budgets = savedBudgets ? JSON.parse(savedBudgets) : [];
      return { data: budgets };
    } catch (error) {
      console.error('Failed to get budgets from local storage', error);
      return { error: 'Failed to load budgets. Please try again.' };
    }
  }

  async setBudget(budget: Budget): Promise<ApiResponse<Budget>> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, apiDelaySimulation));

      // Get current budgets
      const { data: currentBudgets = [] } = await this.getBudgets();

      // Check if budget for this category already exists
      const existingBudgetIndex = currentBudgets.findIndex(
        b => b.category === budget.category
      );

      let updatedBudgets;
      if (existingBudgetIndex >= 0) {
        // Update existing budget
        updatedBudgets = [...currentBudgets];
        updatedBudgets[existingBudgetIndex] = budget;
      } else {
        // Add new budget
        updatedBudgets = [...currentBudgets, budget];
      }

      // Save to local storage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedBudgets));

      return { data: budget };
    } catch (error) {
      console.error('Failed to set budget in local storage', error);
      return { error: 'Failed to set budget. Please try again.' };
    }
  }
}

// Local storage implementation of the ProgressService interface
class LocalStorageProgressService implements ProgressService {
  private readonly BUDGETS_KEY = 'budgets';
  private readonly EXPENSES_KEY = 'expenses';

  async getProgress(): Promise<ApiResponse<CategoryProgress[]>> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, apiDelaySimulation));

      // Get budgets
      const savedBudgets = localStorage.getItem(this.BUDGETS_KEY);
      const budgets: Budget[] = savedBudgets ? JSON.parse(savedBudgets) : [];

      // Get expenses
      const savedExpenses = localStorage.getItem(this.EXPENSES_KEY);
      const expenses: Expense[] = savedExpenses ? JSON.parse(savedExpenses) : [];

      // Calculate progress for each budget category
      const progress: CategoryProgress[] = budgets.map(budget => {
        // Calculate total spent for this category
        const spentAmount = expenses
          .filter(expense => expense.category === budget.category)
          .reduce((total, expense) => total + expense.amount, 0);

        // Calculate percentage (capped at 100%)
        const percentage = Math.min(
          (spentAmount / budget.amount) * 100,
          100
        );

        return {
          category: budget.category,
          budgetAmount: budget.amount,
          spentAmount,
          percentage
        };
      });

      return { data: progress };
    } catch (error) {
      console.error('Failed to calculate progress', error);
      return { error: 'Failed to load spending progress. Please try again.' };
    }
  }
}

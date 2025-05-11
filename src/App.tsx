import { useState, useEffect, useMemo } from 'react'
import './App.css'
import IncomeForm from './components/IncomeForm'
import IncomeList from './components/IncomeList'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import BudgetForm from './components/BudgetForm'
import ProgressDisplay from './components/ProgressDisplay'
import type {Income, Expense, Budget, CategoryProgress} from './types'
import { 
  getIncomeService, 
  getExpenseService, 
  getBudgetService, 
  getProgressService 
} from './services/api'

function App() {
  // Income state
  const [incomes, setIncomes] = useState<Income[]>([])
  const [incomeLoading, setIncomeLoading] = useState(false)
  const [incomeError, setIncomeError] = useState<string | null>(null)

  // Expense state
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [expenseLoading, setExpenseLoading] = useState(false)
  const [expenseError, setExpenseError] = useState<string | null>(null)

  // Budget state
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [budgetLoading, setBudgetLoading] = useState(false)
  const [budgetError, setBudgetError] = useState<string | null>(null)

  // Progress state
  const [progressData, setProgressData] = useState<CategoryProgress[]>([])
  const [progressLoading, setProgressLoading] = useState(false)
  const [progressError, setProgressError] = useState<string | null>(null)

  // Get the services - memoize to prevent recreation on every render
  const incomeService = useMemo(() => getIncomeService(), [])
  const expenseService = useMemo(() => getExpenseService(), [])
  const budgetService = useMemo(() => getBudgetService(), [])
  const progressService = useMemo(() => getProgressService(), [])

  // Fetch incomes from the service
  useEffect(() => {
    const fetchIncomes = async () => {
      setIncomeLoading(true)
      const response = await incomeService.getIncomes()
      setIncomeLoading(false)

      if (response.error) {
        setIncomeError(response.error)
      } else if (response.data) {
        setIncomes(response.data)
      }
    }

    fetchIncomes()
  }, [incomeService])

  // Fetch expenses from the service
  useEffect(() => {
    const fetchExpenses = async () => {
      setExpenseLoading(true)
      const response = await expenseService.getExpenses()
      setExpenseLoading(false)

      if (response.error) {
        setExpenseError(response.error)
      } else if (response.data) {
        setExpenses(response.data)
      }
    }

    fetchExpenses()
  }, [expenseService])

  // Fetch budgets from the service
  useEffect(() => {
    const fetchBudgets = async () => {
      setBudgetLoading(true)
      const response = await budgetService.getBudgets()
      setBudgetLoading(false)

      if (response.error) {
        setBudgetError(response.error)
      } else if (response.data) {
        setBudgets(response.data)
      }
    }

    fetchBudgets()
  }, [budgetService])

  // Fetch progress data from the service
  useEffect(() => {
    const fetchProgress = async () => {
      setProgressLoading(true)
      const response = await progressService.getProgress()
      setProgressLoading(false)

      if (response.error) {
        setProgressError(response.error)
      } else if (response.data) {
        setProgressData(response.data)
      }
    }

    // Fetch progress data when expenses or budgets change
    fetchProgress()

    // No need for an interval - this was causing the memory leak
    // Progress will update when expenses or budgets change

  }, [progressService, expenses, budgets])

  const handleAddIncome = async (newIncome: Omit<Income, 'id'>) => {
    setIncomeLoading(true)
    setIncomeError(null)

    const response = await incomeService.addIncome(newIncome)

    setIncomeLoading(false)

    if (response.error) {
      setIncomeError(response.error)
    } else if (response.data) {
      setIncomes(prevIncomes => [...prevIncomes, response.data as Income])
    }
  }

  const handleAddExpense = async (newExpense: Omit<Expense, 'id'>) => {
    setExpenseLoading(true)
    setExpenseError(null)

    const response = await expenseService.addExpense(newExpense)

    setExpenseLoading(false)

    if (response.error) {
      setExpenseError(response.error)
    } else if (response.data) {
      setExpenses(prevExpenses => [...prevExpenses, response.data as Expense])
    }
  }

  const handleSetBudget = async (budget: Budget) => {
    setBudgetLoading(true)
    setBudgetError(null)

    const response = await budgetService.setBudget(budget)

    setBudgetLoading(false)

    if (response.error) {
      setBudgetError(response.error)
    } else if (response.data) {
      // Check if we're updating an existing budget or adding a new one
      const existingIndex = budgets.findIndex(b => b.category === budget.category)

      if (existingIndex >= 0) {
        // Update existing budget
        setBudgets(prevBudgets => {
          const newBudgets = [...prevBudgets]
          newBudgets[existingIndex] = response.data as Budget
          return newBudgets
        })
      } else {
        // Add new budget
        setBudgets(prevBudgets => [...prevBudgets, response.data as Budget])
      }
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Junie Budget</h1>
      </header>

      <main className="app-main">
        <div className="app-row">
          <section className="income-section">
            <IncomeForm onAddIncome={handleAddIncome} />

            {incomeLoading && <p className="loading">Loading...</p>}
            {incomeError && <p className="error">{incomeError}</p>}

            <IncomeList incomes={incomes} />
          </section>

          <section className="expense-section">
            <ExpenseForm onAddExpense={handleAddExpense} />

            {expenseLoading && <p className="loading">Loading...</p>}
            {expenseError && <p className="error">{expenseError}</p>}

            <ExpenseList expenses={expenses} />
          </section>
        </div>

        <div className="app-row">
          <section className="budget-section">
            <BudgetForm onSetBudget={handleSetBudget} />

            {budgetLoading && <p className="loading">Loading...</p>}
            {budgetError && <p className="error">{budgetError}</p>}
          </section>

          <section className="progress-section">
            {progressLoading && <p className="loading">Loading...</p>}
            {progressError && <p className="error">{progressError}</p>}

            <ProgressDisplay progressData={progressData} />
          </section>
        </div>
      </main>
    </div>
  )
}

export default App

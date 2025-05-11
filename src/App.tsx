import { useState, useEffect } from 'react'
import './App.css'
import IncomeForm from './components/IncomeForm'
import IncomeList from './components/IncomeList'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import type {Income, Expense} from './types'
import { getIncomeService, getExpenseService } from './services/api'

function App() {
  // Income state
  const [incomes, setIncomes] = useState<Income[]>([])
  const [incomeLoading, setIncomeLoading] = useState(false)
  const [incomeError, setIncomeError] = useState<string | null>(null)

  // Expense state
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [expenseLoading, setExpenseLoading] = useState(false)
  const [expenseError, setExpenseError] = useState<string | null>(null)

  // Get the services
  const incomeService = getIncomeService()
  const expenseService = getExpenseService()

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
  }, [])

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
  }, [])

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

  return (
    <div className="app">
      <header className="app-header">
        <h1>Junie Budget</h1>
      </header>

      <main className="app-main">
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
      </main>
    </div>
  )
}

export default App

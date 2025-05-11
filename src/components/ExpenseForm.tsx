import { useState, type FormEvent } from 'react';
import type { Expense } from '../types';
import { EXPENSE_CATEGORIES } from '../types';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!category) {
      setError('Category is required');
      return;
    }

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError('Amount must be a positive number');
      return;
    }

    if (!date) {
      setError('Date is required');
      return;
    }

    // Clear error if validation passes
    setError('');

    // Call the onAddExpense prop with the form data
    onAddExpense({
      category,
      name,
      amount: amountValue,
      date
    });

    // Reset form
    setCategory('');
    setName('');
    setAmount('');
    setDate('');
  };

  return (
    <div className="expense-form">
      <h2>Record Expense</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., GitHub Pro, AWS Hosting"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
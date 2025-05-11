import { useState, type FormEvent } from 'react';
import type { Budget } from '../types';
import { EXPENSE_CATEGORIES } from '../types';

interface BudgetFormProps {
  onSetBudget: (budget: Budget) => void;
}

const BudgetForm = ({ onSetBudget }: BudgetFormProps) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!category) {
      setError('Category is required');
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError('Amount must be a positive number');
      return;
    }

    // Clear error if validation passes
    setError('');

    // Call the onSetBudget prop with the form data
    onSetBudget({
      category,
      amount: amountValue
    });

    // Reset form
    setCategory('');
    setAmount('');
  };

  return (
    <div className="budget-form">
      <h2>Set Monthly Budget</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="budget-category">Category:</label>
          <select
            id="budget-category"
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
          <label htmlFor="budget-amount">Amount:</label>
          <input
            type="number"
            id="budget-amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <button type="submit">Set Budget</button>
      </form>
    </div>
  );
};

export default BudgetForm;
import { useState, type FormEvent } from 'react';
import type {Income} from '../types';

interface IncomeFormProps {
  onAddIncome: (income: Omit<Income, 'id'>) => void;
}

const IncomeForm = ({ onAddIncome }: IncomeFormProps) => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!source.trim()) {
      setError('Source is required');
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

    // Call the onAddIncome prop with the form data
    onAddIncome({
      source,
      amount: amountValue,
      date
    });

    // Reset form
    setSource('');
    setAmount('');
    setDate('');
  };

  return (
    <div className="income-form">
      <h2>Record Income</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="source">Source:</label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="e.g., Salary, Freelance"
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit">Add Income</button>
      </form>
    </div>
  );
};

export default IncomeForm;

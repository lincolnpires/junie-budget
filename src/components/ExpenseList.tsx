import React from 'react';
import type { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Format amount as currency
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (expenses.length === 0) {
    return <p>No expense records yet. Add your first expense above!</p>;
  }

  return (
    <div className="expense-list">
      <h2>Expense Records</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense.id || index}>
              <td>{expense.category}</td>
              <td>{expense.name}</td>
              <td>{formatAmount(expense.amount)}</td>
              <td>{formatDate(expense.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
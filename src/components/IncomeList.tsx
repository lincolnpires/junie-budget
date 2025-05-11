import React from 'react';
import type {Income} from '../types';

interface IncomeListProps {
  incomes: Income[];
}

const IncomeList: React.FC<IncomeListProps> = ({ incomes }) => {
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

  if (incomes.length === 0) {
    return <p>No income records yet. Add your first income above!</p>;
  }

  return (
    <div className="income-list">
      <h2>Income Records</h2>
      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income, index) => (
            <tr key={income.id || index}>
              <td>{income.source}</td>
              <td>{formatAmount(income.amount)}</td>
              <td>{formatDate(income.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeList;

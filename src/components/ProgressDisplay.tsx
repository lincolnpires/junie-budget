import React from 'react';
import type { CategoryProgress } from '../types';

interface ProgressDisplayProps {
  progressData: CategoryProgress[];
}

const ProgressDisplay: React.FC<ProgressDisplayProps> = ({ progressData }) => {
  // Format amount as currency
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (progressData.length === 0) {
    return <p>No budget data available. Set budgets to track your spending progress.</p>;
  }

  return (
    <div className="progress-display">
      <h2>Spending Progress</h2>
      {progressData.map((item) => (
        <div key={item.category} className="progress-item">
          <div className="progress-header">
            <h3>{item.category}</h3>
            <div className="progress-amounts">
              <span>{formatAmount(item.spentAmount)}</span>
              <span> / </span>
              <span>{formatAmount(item.budgetAmount)}</span>
            </div>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${item.percentage}%` }}
              data-percentage={`${Math.round(item.percentage)}%`}
            />
          </div>
          <div className="progress-footer">
            <span>{Math.round(item.percentage)}% of budget spent</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressDisplay;
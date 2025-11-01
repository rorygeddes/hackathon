"use client";

import { useMemo, useState } from "react";
import { Budget, BudgetCategory } from "@/types";

export default function BudgetPage() {
  const [spendingPercentage, setSpendingPercentage] = useState(65);

  // Sample data - in real app, this would come from API
  const budget: Budget = useMemo(() => {
    const last3MonthIncome = 5000;
    const last3MonthSpending = 3500;
    const cashFlow = last3MonthIncome - last3MonthSpending;
    
    return {
      cashFlow,
      last3MonthAvg: {
        income: last3MonthIncome,
        spending: last3MonthSpending,
      },
      monthlySpending: {
        allowance: Math.round((cashFlow * spendingPercentage) / 100),
        actual: 2500,
      },
      emergency: {
        allowance: 400,
        actual: 1800,
        target: 5000,
      },
      goals: {
        allowance: cashFlow - Math.round((cashFlow * spendingPercentage) / 100) - 400,
        actual: 1000,
      },
    };
  }, [spendingPercentage]);

  const categories: BudgetCategory[] = useMemo(() => [
    { name: "Food & Dining", allowance: Math.round(budget.monthlySpending.allowance * 0.3), actual: 650 },
    { name: "Transportation", allowance: Math.round(budget.monthlySpending.allowance * 0.2), actual: 420 },
    { name: "Entertainment", allowance: Math.round(budget.monthlySpending.allowance * 0.15), actual: 280 },
    { name: "Shopping", allowance: Math.round(budget.monthlySpending.allowance * 0.15), actual: 750 },
    { name: "Bills & Utilities", allowance: Math.round(budget.monthlySpending.allowance * 0.2), actual: 400 },
  ], [budget]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-apple-gray-darker mb-2">Budget</h1>
        <p className="text-apple-gray-dark">Your automated budget is live (based on last 3 months). Edit anytime.</p>
      </header>

      <div className="space-y-6">
        {/* Budget Overview */}
        <div className="bg-white rounded-3xl shadow-apple border border-apple-gray/30 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-apple-gray-darker">Last 3 Months Average</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-apple-gray-dark mb-1">Income</p>
                <p className="text-xl font-semibold text-green-600">
                  ${budget.last3MonthAvg.income.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-apple-gray-dark mb-1">Spending</p>
                <p className="text-xl font-semibold text-apple-gray-darker">
                  ${budget.last3MonthAvg.spending.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-apple-gray">
              <p className="text-sm text-apple-gray-dark mb-1">Net Cash Flow</p>
              <p className="text-2xl font-semibold text-apple-gray-darker">
                ${budget.cashFlow.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Allocation Pools */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-apple-gray-darker">Allocation Pools</h3>

          {/* Monthly Spending */}
          <div className="bg-white rounded-3xl shadow-apple border border-apple-gray/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-apple-gray-darker">Monthly Spending</h4>
              <span className="text-sm text-apple-gray-dark">
                {spendingPercentage}% of cash flow
              </span>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-apple-gray-dark">Allowance</span>
                <span className="text-sm font-semibold text-apple-gray-darker">
                  ${budget.monthlySpending.allowance.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-apple-gray-dark">Actual</span>
                <span className={`text-sm font-semibold ${
                  budget.monthlySpending.actual > budget.monthlySpending.allowance
                    ? 'text-red-600'
                    : 'text-apple-gray-darker'
                }`}>
                  ${budget.monthlySpending.actual.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-apple-gray rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all rounded-full ${
                    budget.monthlySpending.actual > budget.monthlySpending.allowance
                      ? 'bg-red-500'
                      : 'bg-apple-blue'
                  }`}
                  style={{
                    width: `${Math.min((budget.monthlySpending.actual / budget.monthlySpending.allowance) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Emergency */}
          <div className="bg-white rounded-3xl shadow-apple border border-apple-gray/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-apple-gray-darker">Emergency</h4>
              <span className="text-sm text-apple-gray-dark">
                ${budget.emergency.actual.toLocaleString()} / ${budget.emergency.target.toLocaleString()}
              </span>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-apple-gray-dark">Monthly Allowance</span>
                <span className="text-sm font-semibold text-apple-gray-darker">
                  ${budget.emergency.allowance.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-apple-gray rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-green-600 transition-all rounded-full"
                  style={{
                    width: `${Math.min((budget.emergency.actual / budget.emergency.target) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Goals */}
          <div className="bg-white rounded-3xl shadow-apple border border-apple-gray/30 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-apple-gray-darker">Goals</h4>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-apple-gray-dark">Allowance</span>
                <span className="text-sm font-semibold text-apple-gray-darker">
                  ${budget.goals.allowance.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-apple-gray-dark">Actual</span>
                <span className="text-sm font-semibold text-apple-gray-darker">
                  ${budget.goals.actual.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-apple-gray rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-apple-blue transition-all rounded-full"
                  style={{
                    width: `${Math.min((budget.goals.actual / budget.goals.allowance) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-3xl shadow-apple border border-apple-gray/30 p-6">
          <h3 className="text-lg font-semibold text-apple-gray-darker mb-4">Categories</h3>
          <div className="space-y-4">
            {categories.map((category, index) => {
              const percentage = category.allowance > 0
                ? Math.min((category.actual / category.allowance) * 100, 100)
                : 0;
              const isOver = category.actual > category.allowance;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-apple-gray-darker">{category.name}</span>
                    <span className={`text-xs font-semibold ${isOver ? 'text-red-600' : 'text-apple-gray-dark'}`}>
                      ${category.actual.toLocaleString()} / ${category.allowance.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-apple-gray rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all rounded-full ${isOver ? 'bg-red-500' : 'bg-apple-blue'}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tune Budget CTA */}
        <div className="bg-white rounded-3xl shadow-apple border border-apple-gray/30 p-6">
          <h3 className="text-lg font-semibold text-apple-gray-darker mb-4">Tune Budget</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-apple-gray-dark mb-2">
                Monthly Spending: {spendingPercentage}%
              </label>
              <input
                type="range"
                min="60"
                max="70"
                value={spendingPercentage}
                onChange={(e) => setSpendingPercentage(Number(e.target.value))}
                className="w-full accent-apple-blue"
              />
              <div className="flex justify-between text-xs text-apple-gray-dark mt-1">
                <span>60%</span>
                <span>70%</span>
              </div>
            </div>
            <button className="w-full py-3 rounded-2xl bg-apple-blue text-white hover:bg-apple-blue-dark transition-all duration-200 font-medium shadow-apple">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


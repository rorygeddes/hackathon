"use client";

import React, { useState } from "react";
import { Goal } from "@/types";

interface GoalCalculatorProps {
  onClose: () => void;
  onAddGoal: (goal: Goal) => void;
}

export default function GoalCalculator({ onClose, onAddGoal }: GoalCalculatorProps) {
  const [goalInput, setGoalInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [calculation, setCalculation] = useState<any>(null);

  const handleCalculate = () => {
    // Sample calculation logic
    // In real app, this would call an API
    const estimatedAmount = goalInput.toLowerCase().includes("m5") ? 75000 : 50000;
    const monthlyIncome = 5000;
    const monthlyExpenses = 3500;
    const availableSavings = monthlyIncome - monthlyExpenses;
    const monthsNeeded = Math.ceil(estimatedAmount / availableSavings);
    const yearsNeeded = (monthsNeeded / 12).toFixed(1);

    const needsMoreIncome = monthsNeeded > 120; // 10 years

    setCalculation({
      goalAmount: estimatedAmount,
      monthlyIncome,
      monthlyExpenses,
      availableSavings,
      monthsNeeded,
      yearsNeeded,
      needsMoreIncome,
      goalName: goalInput,
    });
    setShowResults(true);
  };

  const handleCreateGoal = () => {
    if (!calculation) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      name: calculation.goalName,
      targetAmount: calculation.goalAmount,
      currentAmount: 0,
      description: "Created from goal calculator",
    };

    onAddGoal(newGoal);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-semibold text-gray-900">Goal Calculator</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>

          {!showResults ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you want to save for?
                </label>
                <input
                  type="text"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  placeholder="e.g., I want to buy an M5"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-lg"
                  onKeyPress={(e) => e.key === "Enter" && handleCalculate()}
                />
              </div>

              <button
                onClick={handleCalculate}
                disabled={!goalInput.trim()}
                className="w-full py-4 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Calculate Plan
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Results */}
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Your Plan</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estimated Cost</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      ${calculation.goalAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Monthly Savings</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      ${calculation.availableSavings.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Timeline</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {calculation.yearsNeeded} years
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
                    <p className="text-2xl font-semibold text-green-600">
                      ${calculation.monthlyIncome.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Honest Advice */}
              <div className={`rounded-2xl p-6 ${
                calculation.needsMoreIncome 
                  ? "bg-red-50 border border-red-200" 
                  : "bg-blue-50 border border-blue-200"
              }`}>
                <h4 className="font-semibold text-lg mb-2">
                  {calculation.needsMoreIncome ? "Real Talk" : "You're On Track"}
                </h4>
                <p className="text-gray-700">
                  {calculation.needsMoreIncome ? (
                    <>
                      At your current rate, it&apos;ll take {calculation.yearsNeeded} years to afford this. 
                      Consider increasing your income through a promotion, side hustle, or better job. 
                      Otherwise, you might not see this goal achieved.
                    </>
                  ) : (
                    <>
                      Great news! You can achieve this goal in {calculation.yearsNeeded} years at your 
                      current savings rate. Keep it up!
                    </>
                  )}
                </p>
              </div>

              {/* Action Steps */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h4 className="font-semibold text-lg mb-4">Action Steps</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">1.</span>
                    <span>Save ${calculation.availableSavings.toLocaleString()} per month consistently</span>
                  </li>
                  {calculation.needsMoreIncome && (
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold mt-1">2.</span>
                      <span>Focus on increasing your income by 20-30%</span>
                    </li>
                  )}
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">
                      {calculation.needsMoreIncome ? "3." : "2."}
                    </span>
                    <span>Check out our insights panel for money-saving alternatives</span>
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setCalculation(null);
                  }}
                  className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
                >
                  Recalculate
                </button>
                <button
                  onClick={handleCreateGoal}
                  className="flex-1 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors font-medium"
                >
                  Create Goal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


"use client";

import { useMemo } from "react";
import BalanceStrip from "@/components/BalanceStrip";
import GoalsCard from "@/components/GoalsCard";
import BudgetSnapshot from "@/components/BudgetSnapshot";
import QuickActions from "@/components/QuickActions";
import { Goal, Account, BudgetCategory } from "@/types";

export default function Dashboard() {
  // Sample data - in real app, this would come from API/state
  const accounts: Account[] = useMemo(() => [
    { id: "1", name: "Checking", balance: 5420, type: "checking" },
    { id: "2", name: "Savings", balance: 12000, type: "savings" },
    { id: "3", name: "Credit", balance: -1200, type: "credit" },
  ], []);

  const totalBalance = useMemo(
    () => accounts.reduce((sum, acc) => sum + acc.balance, 0),
    [accounts]
  );

  const goals: Goal[] = useMemo(() => [
    {
      id: "1",
      name: "BMW",
      targetAmount: 74000,
      currentAmount: 20000,
    },
    {
      id: "2",
      name: "Tuition",
      targetAmount: 10000,
      currentAmount: 0,
    },
    {
      id: "3",
      name: "Europe Trip",
      targetAmount: 3000,
      currentAmount: 0,
    },
  ], []);

  const budgetCategories: BudgetCategory[] = useMemo(() => [
    { name: "Food & Dining", allowance: 800, actual: 650 },
    { name: "Transportation", allowance: 400, actual: 420 },
    { name: "Entertainment", allowance: 300, actual: 280 },
    { name: "Shopping", allowance: 500, actual: 750 },
  ], []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Your daily financial pulse</p>
      </header>

      <div className="space-y-6">
        {/* Balance Strip */}
        <BalanceStrip totalBalance={totalBalance} accounts={accounts} />

        {/* Goals Card */}
        <GoalsCard goals={goals} />

        {/* Budget Snapshot */}
        <BudgetSnapshot categories={budgetCategories} />

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <QuickActions
            onCategorize={() => alert("Categorize 5 transactions")}
            onAddTransfer={() => alert("Add transfer to BMW goal")}
            onInviteFriend={() => {}}
            onAskAI={() => {}}
          />
        </div>
      </div>
    </div>
  );
}


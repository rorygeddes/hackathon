"use client";

import { Goal } from "@/types";
import Link from "next/link";

interface GoalsCardProps {
  goals: Goal[];
}

export default function GoalsCard({ goals }: GoalsCardProps) {
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const displayedGoals = goals.slice(0, 3);

  return (
    <div className="bg-white rounded-3xl shadow-apple border border-apple-gray/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-apple-gray-darker">Goals</h3>
        <span className="text-sm text-apple-gray-dark">Total target ${totalTarget.toLocaleString()}</span>
      </div>
      <div className="space-y-3">
        {displayedGoals.length === 0 ? (
          <div className="text-center py-8 text-apple-gray-dark">
            <p className="mb-2">No goals yet</p>
            <Link href="/" className="text-sm text-apple-blue hover:text-apple-blue-dark transition-colors">
              Create your first goal
            </Link>
          </div>
        ) : (
          displayedGoals.map((goal) => {
            const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
            return (
              <Link
                key={goal.id}
                href={`/goals/${goal.id}`}
                className="block hover:bg-apple-gray-light rounded-2xl p-3 -mx-3 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-apple-blue-subtle flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-apple-gray-darker truncate">
                        {goal.name}
                      </span>
                      <span className="text-xs text-apple-gray-dark ml-2">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-apple-gray-dark">
                        ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-apple-gray rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-apple-blue transition-all duration-300 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}


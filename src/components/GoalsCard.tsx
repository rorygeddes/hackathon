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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Goals</h3>
        <span className="text-sm text-gray-600">Total target ${totalTarget.toLocaleString()}</span>
      </div>
      <div className="space-y-3">
        {displayedGoals.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-2">No goals yet</p>
            <Link href="/" className="text-sm text-blue-600 hover:underline">
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
                className="block hover:bg-gray-50 rounded-xl p-3 -mx-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {goal.name}
                      </span>
                      <span className="text-xs text-gray-600 ml-2">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-600">
                        ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-300"
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


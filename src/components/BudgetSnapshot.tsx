"use client";

import { BudgetCategory } from "@/types";

interface BudgetSnapshotProps {
  categories: BudgetCategory[];
}

export default function BudgetSnapshot({ categories }: BudgetSnapshotProps) {
  return (
    <div className="bg-white rounded-3xl shadow-apple border border-apple-gray/30 p-6">
      <h3 className="text-lg font-semibold text-apple-gray-darker mb-4">Budget Snapshot</h3>
      <div className="space-y-4">
        {categories.length === 0 ? (
          <div className="text-center py-4 text-apple-gray-dark text-sm">
            No budget categories yet
          </div>
        ) : (
          categories.map((category, index) => {
            const percentage = category.allowance > 0 
              ? Math.min((category.actual / category.allowance) * 100, 100) 
              : 0;
            const isOver = category.actual > category.allowance;
            return (
              <div key={index} className="pb-3 border-b border-apple-gray last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-apple-gray-darker">{category.name}</span>
                  <span className={`text-xs font-semibold ${isOver ? 'text-red-600' : 'text-apple-gray-dark'}`}>
                    ${category.actual.toLocaleString()} / ${category.allowance.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-apple-gray rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${isOver ? 'bg-red-500' : 'bg-apple-blue'}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}


"use client";

import { BudgetCategory } from "@/types";

interface BudgetSnapshotProps {
  categories: BudgetCategory[];
}

export default function BudgetSnapshot({ categories }: BudgetSnapshotProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Snapshot</h3>
      <div className="space-y-3">
        {categories.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            No budget categories yet
          </div>
        ) : (
          categories.map((category, index) => {
            const percentage = category.allowance > 0 
              ? Math.min((category.actual / category.allowance) * 100, 100) 
              : 0;
            const isOver = category.actual > category.allowance;
            return (
              <div key={index} className="pb-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  <span className={`text-xs font-semibold ${isOver ? 'text-red-600' : 'text-gray-600'}`}>
                    ${category.actual.toLocaleString()} / ${category.allowance.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${isOver ? 'bg-red-500' : 'bg-blue-600'}`}
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


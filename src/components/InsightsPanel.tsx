"use client";

import React from "react";
import { Insight } from "@/types";

interface InsightsPanelProps {
  insights: Insight[];
}

export default function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {insights.map((insight) => (
        <div
          key={insight.id}
          className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {insight.type === "positive" && (
                  <span className="text-2xl">✨</span>
                )}
                <h4 className="text-lg font-semibold text-gray-900">{insight.title}</h4>
              </div>
              <p className="text-gray-600 text-sm mb-4">{insight.description}</p>
              
              {insight.savings && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 mb-4">
                  <span className="text-green-700 font-semibold text-sm">
                    Save ${insight.savings}/month
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <button
            className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700"
            onClick={() => {
              // In real app, this would open the recipe/guide
              alert(`${insight.action} clicked!`);
            }}
          >
            {insight.action}
          </button>
        </div>
      ))}
    </div>
  );
}


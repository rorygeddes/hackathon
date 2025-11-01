"use client";

import React from "react";
import { Goal } from "@/types";

interface GoalCardProps {
  goal: Goal;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  const remaining = goal.targetAmount - goal.currentAmount;
  const deadlineDate = goal.deadline instanceof Date ? goal.deadline : goal.deadline ? new Date(goal.deadline as any) : null;
  const monthsRemaining = deadlineDate
    ? Math.ceil((deadlineDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30))
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image Container with Progress Overlay */}
      <div className="relative h-64 bg-gray-100">
        {/* Base Image - Skeleton/Grayed */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
        
        {/* Progress Fill */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent transition-all duration-500"
          style={{ height: `${100 - progress}%` }}
        />
        
        {/* Progress Indicator */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between text-white mb-2">
            <span className="text-sm font-medium">{goal.name}</span>
            <span className="text-sm font-semibold">{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Goal Icon Placeholder */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-6xl opacity-30">
          🎯
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">{goal.name}</h4>
        {goal.description && (
          <p className="text-gray-600 text-sm mb-4">{goal.description}</p>
        )}
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Saved</span>
            <span className="text-lg font-semibold text-gray-900">
              ${goal.currentAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Goal</span>
            <span className="text-lg font-semibold text-gray-900">
              ${goal.targetAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <span className="text-gray-600 text-sm">Remaining</span>
            <span className="text-lg font-semibold text-blue-600">
              ${remaining.toLocaleString()}
            </span>
          </div>
          
          {monthsRemaining && monthsRemaining > 0 && (
            <div className="pt-2">
              <span className="text-xs text-gray-500">
                {monthsRemaining} months until deadline
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


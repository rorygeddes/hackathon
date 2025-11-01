export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  imageUrl?: string;
  description?: string;
  deadline?: Date;
}

export interface Insight {
  id: string;
  type: "positive" | "neutral" | "warning";
  title: string;
  description: string;
  savings?: number;
  action: string;
  link: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  actionBubbles?: ActionBubble[];
}

export interface ActionBubble {
  id: string;
  tool: string;
  status: "running" | "completed" | "error";
  result?: any;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  type: "checking" | "savings" | "credit" | "investment";
}

export interface Budget {
  monthlySpending: {
    allowance: number;
    actual: number;
  };
  emergency: {
    allowance: number;
    actual: number;
    target: number;
  };
  goals: {
    allowance: number;
    actual: number;
  };
  cashFlow: number;
  last3MonthAvg: {
    income: number;
    spending: number;
  };
}

export interface BudgetCategory {
  name: string;
  allowance: number;
  actual: number;
}

export interface SplitPerson {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  netAmount: number;
}

export interface SplitGroup {
  id: string;
  name: string;
  members: SplitPerson[];
  netAmount: number;
}

export interface SplitTransaction {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitAmong: string[];
  date: Date;
  groupId?: string;
}

export interface Friend {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: "pending" | "accepted";
}

export interface FriendRequest {
  id: string;
  from: Friend;
  to: Friend;
  status: "pending" | "accepted" | "declined";
  timestamp: Date;
}


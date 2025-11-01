// Data models for the Finance App

class Account {
  final String id;
  final String name;
  final double balance;
  final AccountType type;

  Account({
    required this.id,
    required this.name,
    required this.balance,
    required this.type,
  });
}

enum AccountType { checking, savings, credit, investment }

class Goal {
  final String id;
  final String name;
  final double targetAmount;
  final double currentAmount;
  final String? description;
  final DateTime? deadline;

  Goal({
    required this.id,
    required this.name,
    required this.targetAmount,
    required this.currentAmount,
    this.description,
    this.deadline,
  });

  double get progress => currentAmount / targetAmount;
}

class BudgetCategory {
  final String name;
  final double allowance;
  final double actual;

  BudgetCategory({
    required this.name,
    required this.allowance,
    required this.actual,
  });

  double get percentage => allowance > 0 ? (actual / allowance).clamp(0.0, 1.0) : 0.0;
  bool get isOver => actual > allowance;
}

class Budget {
  final double cashFlow;
  final double last3MonthIncome;
  final double last3MonthSpending;
  final MonthlySpending monthlySpending;
  final EmergencyFund emergency;
  final GoalsBudget goals;

  Budget({
    required this.cashFlow,
    required this.last3MonthIncome,
    required this.last3MonthSpending,
    required this.monthlySpending,
    required this.emergency,
    required this.goals,
  });
}

class MonthlySpending {
  final double allowance;
  final double actual;

  MonthlySpending({required this.allowance, required this.actual});
}

class EmergencyFund {
  final double allowance;
  final double actual;
  final double target;

  EmergencyFund({
    required this.allowance,
    required this.actual,
    required this.target,
  });
}

class GoalsBudget {
  final double allowance;
  final double actual;

  GoalsBudget({required this.allowance, required this.actual});
}

class ChatMessage {
  final String id;
  final String role; // 'user' or 'assistant'
  final String content;
  final DateTime timestamp;
  final List<ActionBubble>? actionBubbles;

  ChatMessage({
    required this.id,
    required this.role,
    required this.content,
    required this.timestamp,
    this.actionBubbles,
  });
}

class ActionBubble {
  final String id;
  final String tool;
  final String status; // 'running', 'completed', 'error'
  final Map<String, dynamic>? result;

  ActionBubble({
    required this.id,
    required this.tool,
    required this.status,
    this.result,
  });
}

class SplitPerson {
  final String id;
  final String name;
  final String? email;
  final double netAmount;

  SplitPerson({
    required this.id,
    required this.name,
    this.email,
    required this.netAmount,
  });
}

class SplitGroup {
  final String id;
  final String name;
  final List<SplitPerson> members;
  final double netAmount;

  SplitGroup({
    required this.id,
    required this.name,
    required this.members,
    required this.netAmount,
  });
}

class Friend {
  final String id;
  final String name;
  final String email;
  final String status; // 'pending' or 'accepted'

  Friend({
    required this.id,
    required this.name,
    required this.email,
    required this.status,
  });
}

class FriendRequest {
  final String id;
  final Friend from;
  final Friend to;
  final String status; // 'pending', 'accepted', 'declined'
  final DateTime timestamp;

  FriendRequest({
    required this.id,
    required this.from,
    required this.to,
    required this.status,
    required this.timestamp,
  });
}


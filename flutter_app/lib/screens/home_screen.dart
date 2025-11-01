import 'package:flutter/material.dart';
import '../models/models.dart';
import '../constants/colors.dart';
import 'goal_detail_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  // Sample data
  final List<Account> accounts = [
    Account(id: "1", name: "Checking", balance: 5420, type: AccountType.checking),
    Account(id: "2", name: "Savings", balance: 12000, type: AccountType.savings),
    Account(id: "3", name: "Credit", balance: -1200, type: AccountType.credit),
  ];

  List<Goal> goals = [
    Goal(id: "1", name: "BMW", targetAmount: 74000, currentAmount: 20000),
    Goal(id: "2", name: "Tuition", targetAmount: 10000, currentAmount: 0),
    Goal(id: "3", name: "Europe Trip", targetAmount: 3000, currentAmount: 0),
  ];

  final List<BudgetCategory> budgetCategories = [
    BudgetCategory(name: "Food & Dining", allowance: 800, actual: 650),
    BudgetCategory(name: "Transportation", allowance: 400, actual: 420),
    BudgetCategory(name: "Entertainment", allowance: 300, actual: 280),
    BudgetCategory(name: "Shopping", allowance: 500, actual: 750),
  ];

  double get totalBalance => accounts.fold(0.0, (sum, acc) => sum + acc.balance);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppleColors.grayLight,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              const Text(
                "Dashboard",
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w600,
                  color: AppleColors.grayDarker,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                "Your daily financial pulse",
                style: TextStyle(
                  fontSize: 16,
                  color: AppleColors.grayDark,
                ),
              ),
              const SizedBox(height: 32),

              // Balance Strip
              GestureDetector(
                onTap: () {
                  // Navigate to accounts detail (you can create this screen later)
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text("Accounts detail coming soon!"),
                      backgroundColor: AppleColors.blue,
                    ),
                  );
                },
                child: _buildBalanceStrip(),
              ),
              const SizedBox(height: 24),

              // Goals Card
              _buildGoalsCard(),
              const SizedBox(height: 24),

              // Budget Snapshot
              GestureDetector(
                onTap: () {
                  // Navigate to budget detail - could navigate to BudgetScreen
                  // For now, just show a message
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text("Budget detail - navigate to Budget tab for full view"),
                      backgroundColor: AppleColors.blue,
                    ),
                  );
                },
                child: _buildBudgetSnapshot(),
              ),
              const SizedBox(height: 24),

              // Quick Actions
              const Text(
                "Quick Actions",
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  color: AppleColors.grayDarker,
                ),
              ),
              const SizedBox(height: 16),
              _buildQuickActions(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBalanceStrip() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppleColors.gray.withOpacity(0.3)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 1,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                "Total Balance",
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: AppleColors.grayDark,
                ),
              ),
              const Text(
                "Tap to view accounts",
                style: TextStyle(
                  fontSize: 12,
                  color: AppleColors.grayDark,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            "\$${totalBalance.toStringAsFixed(0)}",
            style: const TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.w600,
              color: AppleColors.grayDarker,
            ),
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 16,
            runSpacing: 8,
            children: accounts.take(3).map((account) {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    account.name,
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppleColors.grayDark,
                    ),
                  ),
                  Text(
                    "\$${account.balance.toStringAsFixed(0)}",
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: AppleColors.grayDarker,
                    ),
                  ),
                ],
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildGoalsCard() {
    final totalTarget = goals.fold(0.0, (sum, goal) => sum + goal.targetAmount);
    final displayedGoals = goals.take(3).toList();

    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppleColors.gray.withOpacity(0.3)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 1,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                "Goals",
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  color: AppleColors.grayDarker,
                ),
              ),
              Text(
                "Total target \$${totalTarget.toStringAsFixed(0)}",
                style: const TextStyle(
                  fontSize: 14,
                  color: AppleColors.grayDark,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          if (displayedGoals.isEmpty)
            const Center(
              child: Padding(
                padding: EdgeInsets.all(32),
                child: Text(
                  "No goals yet",
                  style: TextStyle(color: AppleColors.grayDark),
                ),
              ),
            )
          else
            ...displayedGoals.map((goal) {
              final progress = goal.progress.clamp(0.0, 1.0);
              return Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: InkWell(
                  onTap: () async {
                    final result = await Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => GoalDetailScreen(
                          goal: goal,
                          totalBalance: totalBalance,
                          onContribute: (contributedAmount) {
                            setState(() {
                              final goalIndex = goals.indexWhere((g) => g.id == goal.id);
                              if (goalIndex != -1) {
                                goals[goalIndex] = Goal(
                                  id: goal.id,
                                  name: goal.name,
                                  targetAmount: goal.targetAmount,
                                  currentAmount: goal.currentAmount + contributedAmount,
                                  description: goal.description,
                                  deadline: goal.deadline,
                                );
                              }
                            });
                          },
                        ),
                      ),
                    );
                    // Refresh UI if goal was updated
                    if (result != null) {
                      setState(() {});
                    }
                  },
                  borderRadius: BorderRadius.circular(16),
                  child: Padding(
                    padding: const EdgeInsets.all(8),
                    child: Row(
                      children: [
                        Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            color: AppleColors.blueSubtle,
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: const Center(child: Text("🎯")),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    goal.name,
                                    style: const TextStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.w500,
                                      color: AppleColors.grayDarker,
                                    ),
                                  ),
                                  Text(
                                    "${(progress * 100).toStringAsFixed(0)}%",
                                    style: const TextStyle(
                                      fontSize: 12,
                                      color: AppleColors.grayDark,
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 4),
                              Text(
                                "\$${goal.currentAmount.toStringAsFixed(0)} / \$${goal.targetAmount.toStringAsFixed(0)}",
                                style: const TextStyle(
                                  fontSize: 12,
                                  color: AppleColors.grayDark,
                                ),
                              ),
                              const SizedBox(height: 8),
                              ClipRRect(
                                borderRadius: BorderRadius.circular(8),
                                child: LinearProgressIndicator(
                                  value: progress,
                                  backgroundColor: AppleColors.gray,
                                  valueColor: const AlwaysStoppedAnimation<Color>(AppleColors.blue),
                                  minHeight: 8,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const Icon(
                          Icons.chevron_right,
                          color: AppleColors.grayDark,
                          size: 20,
                        ),
                      ],
                    ),
                  ),
                ),
              );
            }),
        ],
      ),
    );
  }

  Widget _buildBudgetSnapshot() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: AppleColors.gray.withOpacity(0.3)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 1,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Budget Snapshot",
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: AppleColors.grayDarker,
            ),
          ),
          const SizedBox(height: 16),
          ...budgetCategories.map((category) {
            final percentage = category.percentage;
            final isOver = category.isOver;
            return Padding(
              padding: const EdgeInsets.only(bottom: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        category.name,
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          color: AppleColors.grayDarker,
                        ),
                      ),
                      Text(
                        "\$${category.actual.toStringAsFixed(0)} / \$${category.allowance.toStringAsFixed(0)}",
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: isOver ? const Color(0xFFDC2626) : AppleColors.grayDark,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: LinearProgressIndicator(
                      value: percentage,
                      backgroundColor: AppleColors.gray,
                      valueColor: AlwaysStoppedAnimation<Color>(
                        isOver ? const Color(0xFFEF4444) : AppleColors.blue,
                      ),
                      minHeight: 8,
                    ),
                  ),
                ],
              ),
            );
          }),
        ],
      ),
    );
  }

  Widget _buildQuickActions() {
    return GridView.count(
      crossAxisCount: 2,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisSpacing: 12,
      mainAxisSpacing: 12,
      childAspectRatio: 2.5,
      children: [
        _buildActionButton("Categorize 5", () {}),
        _buildActionButton("Add transfer to BMW", () {}),
        _buildActionButton("Invite friend", () {}),
        _buildActionButton("Ask AI", () {}),
      ],
    );
  }

  Widget _buildActionButton(String label, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppleColors.gray.withOpacity(0.5)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Center(
          child: Text(
            label,
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              color: AppleColors.grayDarker,
            ),
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }
}


import 'package:flutter/material.dart';
import '../models/models.dart';
import '../constants/colors.dart';

class BudgetScreen extends StatefulWidget {
  const BudgetScreen({super.key});

  @override
  State<BudgetScreen> createState() => _BudgetScreenState();
}

class _BudgetScreenState extends State<BudgetScreen> {
  double spendingPercentage = 65.0;

  Budget get budget {
    final last3MonthIncome = 5000.0;
    final last3MonthSpending = 3500.0;
    final cashFlow = last3MonthIncome - last3MonthSpending;

    return Budget(
      cashFlow: cashFlow,
      last3MonthIncome: last3MonthIncome,
      last3MonthSpending: last3MonthSpending,
      monthlySpending: MonthlySpending(
        allowance: (cashFlow * spendingPercentage / 100).roundToDouble(),
        actual: 2500,
      ),
      emergency: EmergencyFund(
        allowance: 400,
        actual: 1800,
        target: 5000,
      ),
      goals: GoalsBudget(
        allowance: cashFlow - (cashFlow * spendingPercentage / 100).roundToDouble() - 400,
        actual: 1000,
      ),
    );
  }

  List<BudgetCategory> get categories {
    return [
      BudgetCategory(
        name: "Food & Dining",
        allowance: (budget.monthlySpending.allowance * 0.3).roundToDouble(),
        actual: 650,
      ),
      BudgetCategory(
        name: "Transportation",
        allowance: (budget.monthlySpending.allowance * 0.2).roundToDouble(),
        actual: 420,
      ),
      BudgetCategory(
        name: "Entertainment",
        allowance: (budget.monthlySpending.allowance * 0.15).roundToDouble(),
        actual: 280,
      ),
      BudgetCategory(
        name: "Shopping",
        allowance: (budget.monthlySpending.allowance * 0.15).roundToDouble(),
        actual: 750,
      ),
      BudgetCategory(
        name: "Bills & Utilities",
        allowance: (budget.monthlySpending.allowance * 0.2).roundToDouble(),
        actual: 400,
      ),
    ];
  }

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
              const Text(
                "Budget",
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w600,
                  color: AppleColors.grayDarker,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                "Your automated budget is live (based on last 3 months). Edit anytime.",
                style: TextStyle(
                  fontSize: 16,
                  color: AppleColors.grayDark,
                ),
              ),
              const SizedBox(height: 32),

              // Last 3 Months Average
              _buildBudgetOverview(),
              const SizedBox(height: 24),

              // Allocation Pools
              const Text(
                "Allocation Pools",
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  color: AppleColors.grayDarker,
                ),
              ),
              const SizedBox(height: 16),

              _buildAllocationPool(
                "Monthly Spending",
                "${spendingPercentage.toStringAsFixed(0)}% of cash flow",
                budget.monthlySpending.allowance,
                budget.monthlySpending.actual,
                AppleColors.blue,
              ),
              const SizedBox(height: 16),

              _buildEmergencyPool(),
              const SizedBox(height: 16),

              _buildAllocationPool(
                "Goals",
                "",
                budget.goals.allowance,
                budget.goals.actual,
                AppleColors.blue,
              ),
              const SizedBox(height: 24),

              // Categories
              _buildCategories(),
              const SizedBox(height: 24),

              // Tune Budget
              _buildTuneBudget(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBudgetOverview() {
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
            "Last 3 Months Average",
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: Color(0xFF111827),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Income",
                      style: TextStyle(
                        fontSize: 14,
                        color: AppleColors.grayDark,
                      ),
                    ),
                    Text(
                      "\$${budget.last3MonthIncome.toStringAsFixed(0)}",
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF10B981),
                      ),
                    ),
                  ],
                ),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Spending",
                      style: TextStyle(
                        fontSize: 14,
                        color: AppleColors.grayDark,
                      ),
                    ),
                    Text(
                      "\$${budget.last3MonthSpending.toStringAsFixed(0)}",
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                        color: AppleColors.grayDarker,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const Divider(height: 32),
          const Text(
            "Net Cash Flow",
            style: TextStyle(
              fontSize: 14,
              color: Color(0xFF6B7280),
            ),
          ),
          Text(
            "\$${budget.cashFlow.toStringAsFixed(0)}",
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w600,
              color: Color(0xFF111827),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAllocationPool(String title, String subtitle, double allowance, double actual, Color color) {
    final isOver = actual > allowance;
    final percentage = allowance > 0 ? (actual / allowance).clamp(0.0, 1.0) : 0.0;

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
              Text(
                title,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: AppleColors.grayDarker,
                ),
              ),
              if (subtitle.isNotEmpty)
                Text(
                  subtitle,
                  style: const TextStyle(
                    fontSize: 14,
                    color: AppleColors.grayDark,
                  ),
                ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                "Allowance",
                style: TextStyle(
                  fontSize: 14,
                  color: AppleColors.grayDark,
                ),
              ),
              Text(
                "\$${allowance.toStringAsFixed(0)}",
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: AppleColors.grayDarker,
                ),
              ),
            ],
          ),
          if (title != "Emergency") ...[
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  "Actual",
                  style: TextStyle(
                    fontSize: 14,
                    color: AppleColors.grayDark,
                  ),
                ),
                Text(
                  "\$${actual.toStringAsFixed(0)}",
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: isOver ? const Color(0xFFDC2626) : const Color(0xFF111827),
                  ),
                ),
              ],
            ),
          ],
          const SizedBox(height: 12),
          ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: LinearProgressIndicator(
              value: percentage,
              backgroundColor: AppleColors.gray,
              valueColor: AlwaysStoppedAnimation<Color>(
                isOver ? Colors.red : color,
              ),
              minHeight: 12,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmergencyPool() {
    final percentage = (budget.emergency.actual / budget.emergency.target).clamp(0.0, 1.0);

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
                "Emergency",
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: AppleColors.grayDarker,
                ),
              ),
              Text(
                "\$${budget.emergency.actual.toStringAsFixed(0)} / \$${budget.emergency.target.toStringAsFixed(0)}",
                style: const TextStyle(
                  fontSize: 14,
                  color: AppleColors.grayDark,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          const Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                "Monthly Allowance",
                style: TextStyle(
                  fontSize: 14,
                  color: AppleColors.grayDark,
                ),
              ),
              Text(
                "\$400",
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: AppleColors.grayDarker,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: LinearProgressIndicator(
              value: percentage,
              backgroundColor: AppleColors.gray,
              valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF10B981)),
              minHeight: 12,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategories() {
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
            "Categories",
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: Color(0xFF111827),
            ),
          ),
          const SizedBox(height: 16),
          ...categories.map((category) {
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
                          color: isOver ? const Color(0xFFDC2626) : const Color(0xFF6B7280),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(6),
                    child: LinearProgressIndicator(
                      value: percentage,
                      backgroundColor: AppleColors.gray,
                      valueColor: AlwaysStoppedAnimation<Color>(
                        isOver ? Colors.red : AppleColors.blue,
                      ),
                      minHeight: 6,
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

  Widget _buildTuneBudget() {
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
            "Tune Budget",
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: Color(0xFF111827),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            "Monthly Spending: ${spendingPercentage.toStringAsFixed(0)}%",
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              color: AppleColors.grayDarker,
            ),
          ),
          Slider(
            value: spendingPercentage,
            min: 60,
            max: 70,
            divisions: 10,
            label: "${spendingPercentage.toStringAsFixed(0)}%",
            onChanged: (value) {
              setState(() {
                spendingPercentage = value;
              });
            },
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text(
                "60%",
                style: TextStyle(fontSize: 12, color: AppleColors.grayDark),
              ),
              Text(
                "70%",
                style: TextStyle(fontSize: 12, color: AppleColors.grayDark),
              ),
            ],
          ),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: AppleColors.blue,
                padding: const EdgeInsets.symmetric(vertical: 12),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              child: const Text(
                "Save Changes",
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}


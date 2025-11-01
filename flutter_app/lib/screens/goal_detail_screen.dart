import 'package:flutter/material.dart';
import '../models/models.dart';
import '../constants/colors.dart';

class GoalDetailScreen extends StatefulWidget {
  final Goal goal;
  final double totalBalance;
  final Function(double)? onContribute;

  const GoalDetailScreen({
    super.key,
    required this.goal,
    required this.totalBalance,
    this.onContribute,
  });

  @override
  State<GoalDetailScreen> createState() => _GoalDetailScreenState();
}

class _GoalDetailScreenState extends State<GoalDetailScreen> {
  final TextEditingController _amountController = TextEditingController();
  bool _showContributeDialog = false;
  late Goal _currentGoal;
  
  @override
  void initState() {
    super.initState();
    _currentGoal = widget.goal;
  }

  // Sample actions for achieving the goal
  List<Map<String, dynamic>> get _actions => [
    {
      'title': 'Save \$500/month',
      'description': 'Set up automatic transfer from checking to savings',
      'completed': _currentGoal.currentAmount >= _currentGoal.targetAmount * 0.3,
      'priority': 'high',
    },
    {
      'title': 'Reduce dining out by 40%',
      'description': 'Cook at home more often to save approximately \$200/month',
      'completed': _currentGoal.currentAmount >= _currentGoal.targetAmount * 0.5,
      'priority': 'medium',
    },
    {
      'title': 'Review subscription services',
      'description': 'Cancel unused subscriptions to save \$50/month',
      'completed': _currentGoal.currentAmount >= _currentGoal.targetAmount * 0.7,
      'priority': 'low',
    },
    {
      'title': 'Side income project',
      'description': 'Start a small side project to generate extra \$300/month',
      'completed': _currentGoal.currentAmount >= _currentGoal.targetAmount * 0.9,
      'priority': 'high',
    },
  ];

  double get _remainingAmount => _currentGoal.targetAmount - _currentGoal.currentAmount;
  double get _progress => (_currentGoal.currentAmount / _currentGoal.targetAmount).clamp(0.0, 1.0);

  void _showContributeBottomSheet() {
    _amountController.clear();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => GestureDetector(
        onTap: () {
          // Dismiss keyboard when tapping outside
          FocusScope.of(context).unfocus();
        },
        behavior: HitTestBehavior.opaque,
        child: Container(
          constraints: BoxConstraints(
            maxHeight: MediaQuery.of(context).size.height * 0.8,
          ),
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(24),
              topRight: Radius.circular(24),
            ),
          ),
          child: Padding(
            padding: EdgeInsets.only(
              left: 24,
              right: 24,
              top: 24,
              bottom: MediaQuery.of(context).viewInsets.bottom + 24,
            ),
            child: SingleChildScrollView(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        "Contribute to Goal",
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.w600,
                          color: AppleColors.grayDarker,
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.close),
                        onPressed: () {
                          FocusScope.of(context).unfocus();
                          Navigator.pop(context);
                        },
                        color: AppleColors.grayDark,
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  Text(
                    "Available Balance: \$${widget.totalBalance.toStringAsFixed(2)}",
                    style: const TextStyle(
                      fontSize: 16,
                      color: AppleColors.grayDark,
                    ),
                  ),
                  const SizedBox(height: 24),
                  const Text(
                    "Amount to Contribute",
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                      color: AppleColors.grayDarker,
                    ),
                  ),
                  const SizedBox(height: 8),
                  TextField(
                    controller: _amountController,
                    keyboardType: TextInputType.numberWithOptions(decimal: true),
                    textInputAction: TextInputAction.done,
                    onSubmitted: (_) {
                      // When user taps "Done" on keyboard, dismiss it
                      FocusScope.of(context).unfocus();
                    },
                    decoration: InputDecoration(
                      hintText: "0.00",
                      prefixText: "\$ ",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(16),
                        borderSide: const BorderSide(color: AppleColors.gray),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(16),
                        borderSide: const BorderSide(color: AppleColors.gray),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(16),
                        borderSide: const BorderSide(color: AppleColors.blue, width: 2),
                      ),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                    ),
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                      color: AppleColors.grayDarker,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    "Remaining needed: \$${_remainingAmount.toStringAsFixed(2)}",
                    style: const TextStyle(
                      fontSize: 14,
                      color: AppleColors.grayDark,
                    ),
                  ),
                  const SizedBox(height: 24),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton(
                          onPressed: () {
                            FocusScope.of(context).unfocus();
                            Navigator.pop(context);
                          },
                          style: OutlinedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            side: const BorderSide(color: AppleColors.gray),
                          ),
                          child: const Text(
                            "Cancel",
                            style: TextStyle(
                              color: AppleColors.grayDarker,
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        flex: 2,
                        child: ElevatedButton(
                          onPressed: () {
                            // Dismiss keyboard before handling contribute
                            FocusScope.of(context).unfocus();
                            _handleContribute();
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppleColors.blue,
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                          ),
                          child: const Text(
                            "Contribute",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  void _handleContribute() {
    final amount = double.tryParse(_amountController.text);
    if (amount == null || amount <= 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Please enter a valid amount"),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    if (amount > widget.totalBalance) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Amount exceeds available balance"),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    // Close the bottom sheet first
    Navigator.pop(context);
    
    // Update the goal's current amount
    setState(() {
      _currentGoal = Goal(
        id: _currentGoal.id,
        name: _currentGoal.name,
        targetAmount: _currentGoal.targetAmount,
        currentAmount: _currentGoal.currentAmount + amount,
        description: _currentGoal.description,
        deadline: _currentGoal.deadline,
      );
    });

    // Call the callback to update parent state
    if (widget.onContribute != null) {
      widget.onContribute!(amount);
    }
    
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text("Contributed \$${amount.toStringAsFixed(2)} to ${_currentGoal.name}"),
        backgroundColor: AppleColors.blue,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  @override
  void dispose() {
    _amountController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppleColors.grayLight,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppleColors.grayDarker),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          _currentGoal.name,
          style: const TextStyle(
            color: AppleColors.grayDarker,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Progress Card
            Container(
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
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "\$${_currentGoal.currentAmount.toStringAsFixed(0)}",
                            style: const TextStyle(
                              fontSize: 32,
                              fontWeight: FontWeight.w600,
                              color: AppleColors.grayDarker,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            "of \$${_currentGoal.targetAmount.toStringAsFixed(0)}",
                            style: const TextStyle(
                              fontSize: 16,
                              color: AppleColors.grayDark,
                            ),
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        decoration: BoxDecoration(
                          color: AppleColors.blueSubtle,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          "${(_progress * 100).toStringAsFixed(0)}%",
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w600,
                            color: AppleColors.blue,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(12),
                    child: LinearProgressIndicator(
                      value: _progress,
                      backgroundColor: AppleColors.gray,
                      valueColor: const AlwaysStoppedAnimation<Color>(AppleColors.blue),
                      minHeight: 12,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        "Remaining",
                        style: const TextStyle(
                          fontSize: 14,
                          color: AppleColors.grayDark,
                        ),
                      ),
                      Text(
                        "\$${_remainingAmount.toStringAsFixed(0)}",
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: AppleColors.grayDarker,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Contribute Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _showContributeBottomSheet,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppleColors.blue,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: const Text(
                  "Contribute",
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 32),

            // Actions Section
            const Text(
              "Actions to Achieve Goal",
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w600,
                color: AppleColors.grayDarker,
              ),
            ),
            const SizedBox(height: 16),
            ..._actions.map((action) => _buildActionCard(action)),
          ],
        ),
      ),
    );
  }

  Widget _buildActionCard(Map<String, dynamic> action) {
    final isCompleted = action['completed'] as bool;
    final priority = action['priority'] as String;
    
    Color priorityColor;
    String priorityLabel;
    switch (priority) {
      case 'high':
        priorityColor = Colors.red;
        priorityLabel = 'High';
        break;
      case 'medium':
        priorityColor = Colors.orange;
        priorityLabel = 'Medium';
        break;
      default:
        priorityColor = Colors.green;
        priorityLabel = 'Low';
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: isCompleted 
            ? AppleColors.blue.withOpacity(0.3)
            : AppleColors.gray.withOpacity(0.3)
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: isCompleted 
                ? AppleColors.blueSubtle
                : priorityColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Center(
              child: isCompleted
                ? const Icon(Icons.check_circle, color: AppleColors.blue, size: 28)
                : Icon(
                    priority == 'high' 
                      ? Icons.trending_up
                      : priority == 'medium'
                        ? Icons.remove
                        : Icons.trending_down,
                    color: priorityColor,
                    size: 24,
                  ),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        action['title'],
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: AppleColors.grayDarker,
                          decoration: isCompleted 
                            ? TextDecoration.lineThrough
                            : null,
                        ),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: priorityColor.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        priorityLabel,
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                          color: priorityColor,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  action['description'],
                  style: TextStyle(
                    fontSize: 14,
                    color: AppleColors.grayDark,
                    decoration: isCompleted 
                      ? TextDecoration.lineThrough
                      : null,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}


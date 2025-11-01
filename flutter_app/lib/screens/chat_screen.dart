import 'package:flutter/material.dart';
import '../models/models.dart';
import '../constants/colors.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  String mode = "chat"; // 'chat' or 'agent'
  final TextEditingController _inputController = TextEditingController();
  final List<ChatMessage> _messages = [
    ChatMessage(
      id: "1",
      role: "assistant",
      content: "Hi! I'm AI. I can help you with your finances. Ask me anything!",
      timestamp: DateTime.now(),
    ),
  ];
  List<ActionBubble> _runningActions = [];

  final List<String> suggestedQuestions = [
    "How much did I spend on food this month?",
    "What's my current balance?",
    "Show me uncategorized transactions",
    "How am I doing on my goals?",
  ];

  void _handleSend() {
    if (_inputController.text.trim().isEmpty) return;

    final userMessage = ChatMessage(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      role: "user",
      content: _inputController.text,
      timestamp: DateTime.now(),
    );

    setState(() {
      _messages.add(userMessage);
      _inputController.clear();
    });

    final input = userMessage.content.toLowerCase();
    final needsAgent = input.contains("spend") ||
        input.contains("balance") ||
        input.contains("transaction") ||
        input.contains("goal");

    if (needsAgent && mode == "chat") {
      setState(() {
        mode = "agent";
      });
    }

    if (mode == "agent" || needsAgent) {
      setState(() {
        _runningActions = [
          ActionBubble(id: "1", tool: "get_spending_by_category", status: "running"),
          ActionBubble(id: "2", tool: "get_account_balances", status: "running"),
        ];
      });

      Future.delayed(const Duration(milliseconds: 1500), () {
        setState(() {
          _runningActions = [
            ActionBubble(
              id: "1",
              tool: "get_spending_by_category",
              status: "completed",
              result: {"food": 650},
            ),
            ActionBubble(
              id: "2",
              tool: "get_account_balances",
              status: "completed",
              result: {"total": 16220},
            ),
          ];
        });

        Future.delayed(const Duration(milliseconds: 1000), () {
          final response = _generateResponse(userMessage.content, {"food": 650, "total": 16220});

          final assistantMessage = ChatMessage(
            id: (DateTime.now().millisecondsSinceEpoch + 1).toString(),
            role: "assistant",
            content: response,
            timestamp: DateTime.now(),
            actionBubbles: [
              ActionBubble(
                id: "1",
                tool: "get_spending_by_category",
                status: "completed",
                result: {"food": 650},
              ),
              ActionBubble(
                id: "2",
                tool: "get_account_balances",
                status: "completed",
                result: {"total": 16220},
              ),
            ],
          );

          setState(() {
            _messages.add(assistantMessage);
            _runningActions = [];
          });
        });
      });
    } else {
      Future.delayed(const Duration(milliseconds: 500), () {
        final assistantMessage = ChatMessage(
          id: (DateTime.now().millisecondsSinceEpoch + 1).toString(),
          role: "assistant",
          content:
              "I'd be happy to help! For detailed financial analysis, try asking about your spending or balances.",
          timestamp: DateTime.now(),
        );

        setState(() {
          _messages.add(assistantMessage);
        });
      });
    }
  }

  String _generateResponse(String question, Map<String, dynamic> data) {
    final lower = question.toLowerCase();
    if (lower.contains("food") || lower.contains("spend")) {
      return "You've spent \$${data['food']} on food this month. That's within your budget of \$800! 🎉";
    }
    if (lower.contains("balance")) {
      return "Your total balance across all accounts is \$${data['total']}.";
    }
    return "Here's what I found based on your data...";
  }

  @override
  void dispose() {
    _inputController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppleColors.grayLight,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        "AI",
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.w600,
                          color: AppleColors.grayDarker,
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.all(4),
                        decoration: BoxDecoration(
                          color: AppleColors.grayLight,
                          borderRadius: BorderRadius.circular(24),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            _buildModeButton("Chat", "chat"),
                            _buildModeButton("Agent", "agent"),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    mode == "chat"
                        ? "Basic help and questions"
                        : "I can read your data and analyze transactions",
                    style: const TextStyle(
                      fontSize: 14,
                      color: AppleColors.grayDark,
                    ),
                  ),
                ],
              ),
            ),

            // Suggested Questions
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Wrap(
                spacing: 8,
                runSpacing: 8,
                children: suggestedQuestions.map((question) {
                  return GestureDetector(
                    onTap: () {
                      _inputController.text = question;
                      _handleSend();
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Text(
                        question,
                        style: const TextStyle(
                          fontSize: 14,
                          color: Color(0xFF374151),
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),

            const SizedBox(height: 16),

            // Messages
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                itemCount: _messages.length,
                itemBuilder: (context, index) {
                  final message = _messages[index];
                  final isUser = message.role == "user";
                  return Column(
                    crossAxisAlignment:
                        isUser ? CrossAxisAlignment.end : CrossAxisAlignment.start,
                    children: [
                      Container(
                        constraints: BoxConstraints(
                          maxWidth: MediaQuery.of(context).size.width * 0.8,
                        ),
                        margin: const EdgeInsets.only(bottom: 8),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isUser
                              ? AppleColors.blue
                              : AppleColors.grayLight,
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Text(
                          message.content,
                          style: TextStyle(
                            fontSize: 14,
                            color: isUser ? Colors.white : AppleColors.grayDarker,
                          ),
                        ),
                      ),
                      if (message.actionBubbles != null && message.actionBubbles!.isNotEmpty)
                        Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: message.actionBubbles!.map((bubble) {
                            return Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                              decoration: BoxDecoration(
                                color: AppleColors.blueSubtle,
                                border: Border.all(color: AppleColors.blue.withOpacity(0.3)),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Text(
                                "${bubble.tool} ✓",
                                style: const TextStyle(
                                  fontSize: 12,
                                  color: AppleColors.blue,
                                ),
                              ),
                            );
                          }).toList(),
                        ),
                    ],
                  );
                },
              ),
            ),

            // Running Actions
            if (_runningActions.isNotEmpty)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
                child: Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: _runningActions.map((action) {
                    return Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: AppleColors.grayLight,
                        border: Border.all(color: AppleColors.gray),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Container(
                            width: 8,
                            height: 8,
                            decoration: const BoxDecoration(
                              color: AppleColors.blue,
                              shape: BoxShape.circle,
                            ),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            "${action.tool}...",
                            style: const TextStyle(
                              fontSize: 12,
                              color: AppleColors.grayDarker,
                            ),
                          ),
                        ],
                      ),
                    );
                  }).toList(),
                ),
              ),

            // Input
            Container(
              padding: const EdgeInsets.all(24),
              decoration: const BoxDecoration(
                color: Colors.white,
                border: Border(top: BorderSide(color: AppleColors.gray)),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _inputController,
                      decoration: InputDecoration(
                        hintText: "Ask me anything about your finances...",
                        hintStyle: const TextStyle(color: AppleColors.grayDark),
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
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      ),
                      onSubmitted: (_) => _handleSend(),
                    ),
                  ),
                  const SizedBox(width: 12),
                  ElevatedButton(
                    onPressed: _handleSend,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppleColors.blue,
                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: const Text(
                      "Send",
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildModeButton(String label, String modeValue) {
    final isActive = mode == modeValue;
    return GestureDetector(
      onTap: () {
        setState(() {
          mode = modeValue;
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isActive ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
          boxShadow: isActive
              ? [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.05),
                    blurRadius: 4,
                    offset: const Offset(0, 2),
                  ),
                ]
              : null,
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w500,
            color: isActive ? AppleColors.blue : AppleColors.grayDark,
          ),
        ),
      ),
    );
  }
}


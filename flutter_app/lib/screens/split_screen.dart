import 'package:flutter/material.dart';
import '../models/models.dart';
import '../constants/colors.dart';

class SplitScreen extends StatefulWidget {
  const SplitScreen({super.key});

  @override
  State<SplitScreen> createState() => _SplitScreenState();
}

class _SplitScreenState extends State<SplitScreen> {
  String activeSection = "groups"; // 'groups' or 'people'

  final List<SplitGroup> groups = [
    SplitGroup(
      id: "1",
      name: "Weekend Trip",
      members: [
        SplitPerson(id: "1", name: "You", netAmount: -150),
        SplitPerson(id: "2", name: "Alice", netAmount: 75),
        SplitPerson(id: "3", name: "Bob", netAmount: 75),
      ],
      netAmount: 0,
    ),
    SplitGroup(
      id: "2",
      name: "Dinner Group",
      members: [
        SplitPerson(id: "1", name: "You", netAmount: 50),
        SplitPerson(id: "4", name: "Charlie", netAmount: -50),
      ],
      netAmount: 0,
    ),
  ];

  final List<SplitPerson> people = [
    SplitPerson(id: "2", name: "Alice", email: "alice@example.com", netAmount: -125),
    SplitPerson(id: "3", name: "Bob", email: "bob@example.com", netAmount: -75),
    SplitPerson(id: "4", name: "Charlie", email: "charlie@example.com", netAmount: 50),
  ];

  double get youOwe =>
      people.where((p) => p.netAmount < 0).fold(0.0, (sum, p) => sum + p.netAmount.abs());

  double get youReceive =>
      people.where((p) => p.netAmount > 0).fold(0.0, (sum, p) => sum + p.netAmount);

  double get net => youReceive - youOwe;

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
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    "Split",
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.w600,
                      color: AppleColors.grayDarker,
                    ),
                  ),
                  ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppleColors.blue,
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: const Text(
                      "+ New Split",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 32),

              // Main Numbers
              Row(
                children: [
                  Expanded(child: _buildNumberCard("Net", net, net >= 0)),
                  const SizedBox(width: 12),
                  Expanded(child: _buildNumberCard("You Owe", youOwe, false)),
                  const SizedBox(width: 12),
                  Expanded(child: _buildNumberCard("You Receive", youReceive, true)),
                ],
              ),
              const SizedBox(height: 32),

              // Tabs
              Row(
                children: [
                  _buildTabButton("Groups", "groups"),
                  const SizedBox(width: 16),
                  _buildTabButton("People", "people"),
                ],
              ),
              const SizedBox(height: 24),

              // Content
              if (activeSection == "groups") _buildGroupsSection(),
              if (activeSection == "people") _buildPeopleSection(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNumberCard(String label, double amount, bool isPositive) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppleColors.gray.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: const TextStyle(
              fontSize: 14,
              color: AppleColors.grayDark,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            "\$${amount.abs().toStringAsFixed(0)}",
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w600,
              color: isPositive ? const Color(0xFF10B981) : const Color(0xFFDC2626),
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label == "Net"
                ? (isPositive ? "You'll receive" : "You owe")
                : (label == "You Owe" ? "Total amount owed" : "Total amount to receive"),
            style: const TextStyle(
              fontSize: 12,
              color: AppleColors.grayDark,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTabButton(String label, String value) {
    final isActive = activeSection == value;
    return GestureDetector(
      onTap: () {
        setState(() {
          activeSection = value;
        });
      },
      child: Container(
        padding: const EdgeInsets.only(bottom: 12),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: isActive ? AppleColors.blue : Colors.transparent,
              width: 2,
            ),
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w500,
            color: isActive ? AppleColors.blue : AppleColors.grayDark,
          ),
        ),
      ),
    );
  }

  Widget _buildGroupsSection() {
    if (groups.isEmpty) {
      return Container(
        padding: const EdgeInsets.all(48),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppleColors.gray.withOpacity(0.3)),
        ),
        child: const Center(
          child: Column(
            children: [
              Text(
                "No groups yet",
                style: TextStyle(color: Color(0xFF9CA3AF)),
              ),
            ],
          ),
        ),
      );
    }

    return Column(
      children: groups.map((group) {
        return Container(
          margin: const EdgeInsets.only(bottom: 16),
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppleColors.gray.withOpacity(0.3)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    group.name,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                      color: AppleColors.grayDarker,
                    ),
                  ),
                  Text(
                    "${group.members.length} members",
                    style: const TextStyle(
                      fontSize: 14,
                      color: AppleColors.grayDark,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              ...group.members.map((member) {
                return Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        member.name,
                        style: const TextStyle(
                          fontSize: 14,
                          color: AppleColors.grayDarker,
                        ),
                      ),
                      Text(
                        "${member.netAmount >= 0 ? "+" : ""}\$${member.netAmount.abs().toStringAsFixed(0)}",
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: member.netAmount >= 0
                              ? const Color(0xFF10B981)
                              : const Color(0xFFDC2626),
                        ),
                      ),
                    ],
                  ),
                );
              }),
              const Divider(height: 32),
              const Text(
                "View details →",
                style: TextStyle(
                  fontSize: 14,
                  color: AppleColors.blue,
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }

  Widget _buildPeopleSection() {
    if (people.isEmpty) {
      return Container(
        padding: const EdgeInsets.all(48),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppleColors.gray.withOpacity(0.3)),
        ),
        child: const Center(
          child: Column(
            children: [
              Text(
                "No people to split with yet",
                style: TextStyle(color: Color(0xFF9CA3AF)),
              ),
            ],
          ),
        ),
      );
    }

    return Column(
      children: people.map((person) {
        return Container(
          margin: const EdgeInsets.only(bottom: 16),
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppleColors.gray.withOpacity(0.3)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 48,
                        height: 48,
                        decoration: BoxDecoration(
                          color: AppleColors.blueSubtle,
                          borderRadius: BorderRadius.circular(24),
                        ),
                        child: Center(
                          child: Text(
                            person.name[0].toUpperCase(),
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w500,
                              color: AppleColors.grayDarker,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            person.name,
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w600,
                              color: AppleColors.grayDarker,
                            ),
                          ),
                          if (person.email != null)
                            Text(
                              person.email!,
                              style: const TextStyle(
                                fontSize: 14,
                                color: AppleColors.grayDark,
                              ),
                            ),
                        ],
                      ),
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(
                        "${person.netAmount >= 0 ? "+" : ""}\$${person.netAmount.abs().toStringAsFixed(0)}",
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                          color: person.netAmount >= 0
                              ? const Color(0xFF10B981)
                              : const Color(0xFFDC2626),
                        ),
                      ),
                      Text(
                        person.netAmount >= 0 ? "owes you" : "you owe",
                        style: const TextStyle(
                          fontSize: 12,
                          color: AppleColors.grayDark,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              const Divider(height: 32),
              const Text(
                "View history →",
                style: TextStyle(
                  fontSize: 14,
                  color: AppleColors.blue,
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }
}


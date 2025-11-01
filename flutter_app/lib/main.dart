import 'package:flutter/material.dart';
import 'screens/home_screen.dart';
import 'screens/budget_screen.dart';
import 'screens/chat_screen.dart';
import 'screens/split_screen.dart';
import 'screens/social_screen.dart';
import 'constants/colors.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Finance App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppleColors.blue,
          primary: AppleColors.blue,
          secondary: AppleColors.blueLight,
        ),
        useMaterial3: true,
        scaffoldBackgroundColor: AppleColors.grayLight,
      ),
      home: const MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const HomeScreen(),
    const BudgetScreen(),
    const ChatScreen(),
    const SplitScreen(),
    const SocialScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_currentIndex],
      bottomNavigationBar: Container(
        margin: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.8),
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: AppleColors.gray.withOpacity(0.5)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 16,
              offset: const Offset(0, 4),
            ),
            BoxShadow(
              color: Colors.black.withOpacity(0.04),
              blurRadius: 2,
              offset: const Offset(0, 1),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(24),
          child: BottomNavigationBar(
            currentIndex: _currentIndex,
            onTap: (index) {
              setState(() {
                _currentIndex = index;
              });
            },
            type: BottomNavigationBarType.fixed,
            backgroundColor: Colors.transparent,
            selectedItemColor: AppleColors.blue,
            unselectedItemColor: AppleColors.grayDark,
            selectedFontSize: 12,
            unselectedFontSize: 12,
            elevation: 0,
            items: const [
              BottomNavigationBarItem(
                icon: Text("🏠", style: TextStyle(fontSize: 24)),
                label: "Dashboard",
              ),
              BottomNavigationBarItem(
                icon: Text("💰", style: TextStyle(fontSize: 24)),
                label: "Budget",
              ),
              BottomNavigationBarItem(
                icon: Text("💬", style: TextStyle(fontSize: 24)),
                label: "AI",
              ),
              BottomNavigationBarItem(
                icon: Text("🤝", style: TextStyle(fontSize: 24)),
                label: "Split",
              ),
              BottomNavigationBarItem(
                icon: Text("👥", style: TextStyle(fontSize: 24)),
                label: "Social",
              ),
            ],
          ),
        ),
      ),
    );
  }
}

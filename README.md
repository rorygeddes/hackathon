# Save2See - Finance App

A beautiful, Apple-inspired web application for tracking savings goals and getting actionable financial insights.

## Features

- **Goal Visualization**: Track your savings goals with visual progress indicators
- **Smart Goal Calculator**: Calculate realistic timelines for achieving your financial goals
- **Actionable Insights**: Get positive recommendations instead of negative advice
- **AI Chat Assistant**: Get personalized financial advice through an AI-powered chat interface

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Apple Design System** - Inspired by Apple's clean, minimalist design

## Project Structure

```
src/
  app/
    layout.tsx      # Root layout
    page.tsx        # Main dashboard
    globals.css     # Global styles
  components/
    GoalCard.tsx           # Goal display card
    GoalCalculator.tsx     # Goal calculation modal
    InsightsPanel.tsx      # Insights display
    ChatInterface.tsx     # AI chat interface
  types/
    index.ts        # TypeScript type definitions
```

## Features in Detail

### Goal Visualization
- Visual progress tracking with percentage indicators
- Beautiful card-based UI
- Real-time savings updates

### Goal Calculator
- Natural language goal input (e.g., "I want to buy an M5")
- Realistic timeline calculations
- Honest financial advice ("You need to make more money")
- Actionable steps breakdown

### Insights Panel
- Positive alternatives instead of restrictions
- Recipe suggestions and money-saving tips
- Monthly savings estimates

### Chat Interface
- AI-powered financial advice
- Context-aware responses
- Clean, chat-like interface

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Future Enhancements

- Bank account integration (Plaid API)
- Multiple account support
- Investment tracking
- Image generation for goals (DALL-E integration)
- Advanced analytics beyond pie charts
- Real-time transaction syncing

## Design Philosophy

This app follows Apple's design principles:
- **Clarity**: Simple, easy-to-understand interface
- **Deference**: Content first, UI supports the user
- **Depth**: Visual hierarchy and meaningful motion

Built with ❤️ for non-technical users who want beautiful, intuitive financial tools.


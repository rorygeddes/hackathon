"use client";

import { useState } from "react";
import { ChatMessage, ActionBubble } from "@/types";

type Mode = "chat" | "agent";

export default function ChatPage() {
  const [mode, setMode] = useState<Mode>("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm Luni AI. I can help you with your finances. Ask me anything!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [runningActions, setRunningActions] = useState<ActionBubble[]>([]);

  const suggestedQuestions = [
    "How much did I spend on food this month?",
    "What's my current balance?",
    "Show me uncategorized transactions",
    "How am I doing on my goals?",
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Auto-switch to Agent mode if question needs data access
    const needsAgent = input.toLowerCase().includes("spend") ||
      input.toLowerCase().includes("balance") ||
      input.toLowerCase().includes("transaction") ||
      input.toLowerCase().includes("goal");

    if (needsAgent && mode === "chat") {
      setMode("agent");
    }

    // Simulate action bubbles in Agent mode
    if (mode === "agent" || needsAgent) {
      const actions: ActionBubble[] = [
        { id: "1", tool: "get_spending_by_category", status: "running" },
        { id: "2", tool: "get_account_balances", status: "running" },
      ];
      setRunningActions(actions);

      // Simulate tools running
      setTimeout(() => {
        setRunningActions([
          { id: "1", tool: "get_spending_by_category", status: "completed", result: { food: 650 } },
          { id: "2", tool: "get_account_balances", status: "completed", result: { total: 16220 } },
        ]);

        setTimeout(() => {
          const response = generateResponse(input, {
            food: 650,
            total: 16220,
          });

          const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: response,
            timestamp: new Date(),
            actionBubbles: [
              { id: "1", tool: "get_spending_by_category", status: "completed", result: { food: 650 } },
              { id: "2", tool: "get_account_balances", status: "completed", result: { total: 16220 } },
            ],
          };

          setMessages((prev) => [...prev, assistantMessage]);
          setRunningActions([]);
        }, 1000);
      }, 1500);
    } else {
      // Simple chat response
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'd be happy to help! For detailed financial analysis, try asking about your spending or balances.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }, 500);
    }
  };

  const generateResponse = (question: string, data: any): string => {
    if (question.toLowerCase().includes("food") || question.toLowerCase().includes("spend")) {
      return `You've spent $${data.food.toLocaleString()} on food this month. That's within your budget of $800! 🎉`;
    }
    if (question.toLowerCase().includes("balance")) {
      return `Your total balance across all accounts is $${data.total.toLocaleString()}.`;
    }
    return "Here's what I found based on your data...";
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold text-gray-900">Luni AI</h1>
          <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setMode("chat")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === "chat"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setMode("agent")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === "agent"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              Agent
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          {mode === "chat"
            ? "Basic help and questions"
            : "I can read your data and analyze transactions"}
        </p>
      </div>

      {/* Suggested Questions */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => {
                setInput(question);
                setTimeout(() => handleSend(), 100);
              }}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6">
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            <div
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
            {/* Action Bubbles */}
            {message.actionBubbles && message.actionBubbles.length > 0 && (
              <div className="flex flex-wrap gap-2 ml-4">
                {message.actionBubbles.map((bubble) => (
                  <div
                    key={bubble.id}
                    className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs text-blue-700"
                  >
                    {bubble.tool} ✓
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {/* Running Actions */}
        {runningActions.length > 0 && (
          <div className="flex flex-wrap gap-2 ml-4">
            {runningActions.map((action) => (
              <div
                key={action.id}
                className="px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs text-gray-700 flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                {action.tool}...
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything about your finances..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <button
            onClick={handleSend}
            className="px-6 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}


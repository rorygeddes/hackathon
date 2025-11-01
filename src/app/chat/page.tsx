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
      content: "Hi! I'm AI. I can help you with your finances. Ask me anything!",
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
    const currentInput = input;
    setInput("");

    // Auto-switch to Agent mode if question needs data access
    const needsAgent = currentInput.toLowerCase().includes("spend") ||
      currentInput.toLowerCase().includes("balance") ||
      currentInput.toLowerCase().includes("transaction") ||
      currentInput.toLowerCase().includes("goal");

    if (needsAgent && mode === "chat") {
      setMode("agent");
    }

    // Show loading state
    const loadingMessageId = (Date.now() + 1).toString();
    setRunningActions([
      { id: "1", tool: "thinking", status: "running" },
    ]);

    try {
      // Prepare messages for API (exclude the initial welcome message for cleaner context)
      const messagesForAPI = [
        ...messages.filter(m => m.role !== "assistant" || m.id !== "1"),
        { role: "user", content: currentInput },
      ].map(m => ({
        role: m.role,
        content: m.content,
      }));

      // Call OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messagesForAPI,
          mode: mode,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || error.error || 'Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: loadingMessageId,
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setRunningActions([]);
    } catch (error: any) {
      console.error('Error calling OpenAI:', error);
      const errorMessage: ChatMessage = {
        id: loadingMessageId,
        role: "assistant",
        content: `Sorry, I encountered an error: ${error.message || 'Unknown error'}. Please try again.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setRunningActions([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold text-apple-gray-darker">AI</h1>
          <div className="flex items-center gap-2 bg-apple-gray rounded-full p-1">
            <button
              onClick={() => setMode("chat")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                mode === "chat"
                  ? "bg-white text-apple-blue shadow-apple"
                  : "text-apple-gray-dark hover:text-apple-blue"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setMode("agent")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                mode === "agent"
                  ? "bg-white text-apple-blue shadow-apple"
                  : "text-apple-gray-dark hover:text-apple-blue"
              }`}
            >
              Agent
            </button>
          </div>
        </div>
        <p className="text-sm text-apple-gray-dark">
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
              className="px-4 py-2 rounded-full bg-white border border-apple-gray/50 hover:border-apple-blue/50 hover:bg-apple-blue-subtle/50 text-sm text-apple-gray-darker transition-all duration-200 shadow-apple"
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
                    ? "bg-apple-blue text-white"
                    : "bg-apple-gray-light text-apple-gray-darker"
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
                    className="px-3 py-1.5 rounded-full bg-apple-blue-subtle border border-apple-blue/30 text-xs text-apple-blue"
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
                className="px-3 py-1.5 rounded-full bg-apple-gray-light border border-apple-gray text-xs text-apple-gray-darker flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-apple-blue rounded-full animate-pulse"></span>
                {action.tool}...
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-apple-gray pt-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything about your finances..."
            className="flex-1 px-4 py-3 rounded-2xl border border-apple-gray focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent bg-white shadow-apple"
          />
          <button
            onClick={handleSend}
            className="px-6 py-3 rounded-2xl bg-apple-blue text-white hover:bg-apple-blue-dark transition-all duration-200 font-medium shadow-apple"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}


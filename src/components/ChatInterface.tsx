"use client";

import React, { useState } from "react";
import { ChatMessage } from "@/types";

interface ChatInterfaceProps {
  onClose: () => void;
}

export default function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm here to help you with your financial goals. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your spending patterns, I'd recommend focusing on meal prep to save money while eating well. Would you like a simple recipe guide?",
        "Great question! For your M5 goal, you're making good progress. Consider these three things: 1) Increase income through side projects, 2) Reduce dining out by 50%, 3) Review subscription services.",
        "I noticed you spend a lot on coffee. Instead of cutting it out, try this: make your own premium lattes at home. It takes 5 minutes and saves you $150/month!",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages([...updatedMessages, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center md:justify-center">
      <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full md:w-[500px] md:max-w-[90vw] h-[600px] md:max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Financial Advisor</h3>
            <p className="text-sm text-gray-500">AI-powered insights</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
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
          ))}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200">
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
    </div>
  );
}


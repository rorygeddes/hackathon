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
        <div className="p-6 border-b border-apple-gray flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-apple-gray-darker">Financial Advisor</h3>
            <p className="text-sm text-apple-gray-dark">AI-powered insights</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-apple-gray-light hover:bg-apple-gray flex items-center justify-center transition-colors text-apple-gray-darker"
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
                    ? "bg-apple-blue text-white"
                    : "bg-apple-gray-light text-apple-gray-darker"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-apple-gray">
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
    </div>
  );
}


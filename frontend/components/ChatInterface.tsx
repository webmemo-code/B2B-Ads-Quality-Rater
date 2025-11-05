"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import type { AdQualityReport } from "@/lib/types";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  report?: AdQualityReport;
  isLoading?: boolean;
  agentLogs?: string[];
}

interface ChatInterfaceProps {
  onAnalyze: (adUrl: string | File, lpUrl: string, guidelines?: string) => void;
  messages: Message[];
  isAnalyzing: boolean;
}

export default function ChatInterface({
  onAnalyze,
  messages,
  isAnalyzing,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-w-5xl mx-auto">
      {/* Messages Container */}
      <Card className="flex-1 overflow-hidden flex flex-col border-gray-200 shadow-lg">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-6 shadow-xl">
                <span className="text-4xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Willkommen beim Ads Quality Rater
              </h2>
              <p className="text-gray-600 max-w-md mb-6">
                Ich analysiere deine Werbeanzeigen und Landingpages auf Kohärenz,
                Qualität und Markenkonformität.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 max-w-md text-left text-sm">
                <p className="font-medium text-gray-700 mb-2">Zum Starten benötige ich:</p>
                <ul className="space-y-1 text-gray-600">
                  <li>• URL zu deinem Ad-Motiv (Bild-URL)</li>
                  <li>• URL zur Landingpage</li>
                  <li>• Optional: Brand Guidelines als JSON</li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <ChatInput onSubmit={onAnalyze} isAnalyzing={isAnalyzing} />
        </div>
      </Card>
    </div>
  );
}

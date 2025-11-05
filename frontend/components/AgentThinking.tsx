"use client";

import { useEffect, useRef } from "react";

interface AgentThinkingProps {
  logs: string[];
}

export default function AgentThinking({ logs }: AgentThinkingProps) {
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Parse agent activity from logs
  const parseAgentActivity = (log: string): { agent: string; activity: string } | null => {
    // Match patterns like "[Agent Name] Starting task: ..."
    const agentMatch = log.match(/\[([^\]]+)\]/);
    if (agentMatch) {
      return {
        agent: agentMatch[1],
        activity: log.replace(agentMatch[0], "").trim(),
      };
    }

    // Match Crew AI specific patterns
    if (log.includes("Agent:")) {
      const parts = log.split("Agent:");
      if (parts[1]) {
        const [agent, ...rest] = parts[1].split(/\s+-\s+|:\s+/);
        return {
          agent: agent.trim(),
          activity: rest.join(" - ").trim(),
        };
      }
    }

    return null;
  };

  const getAgentEmoji = (agent: string): string => {
    const lower = agent.toLowerCase();
    if (lower.includes("visual") || lower.includes("image")) return "🎨";
    if (lower.includes("copy") || lower.includes("content")) return "✍️";
    if (lower.includes("brand")) return "🏷️";
    if (lower.includes("manager") || lower.includes("coordinator")) return "👨‍💼";
    if (lower.includes("analyst")) return "📊";
    return "🤖";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm shadow-sm p-4 max-w-[85%]">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl animate-pulse">🤖</span>
        <span className="text-sm font-medium text-gray-700">Agents am Arbeiten</span>
        <div className="flex gap-1 ml-auto">
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 max-h-[300px] overflow-y-auto space-y-2 font-mono text-xs">
        {logs.length === 0 ? (
          <div className="text-gray-400 text-center py-4">
            Starte Analyse...
          </div>
        ) : (
          <>
            {logs.map((log, idx) => {
              const parsed = parseAgentActivity(log);
              if (parsed) {
                return (
                  <div key={idx} className="flex items-start gap-2 text-gray-700 bg-white p-2 rounded border border-gray-200">
                    <span className="text-base flex-shrink-0">{getAgentEmoji(parsed.agent)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-primary text-xs">{parsed.agent}</div>
                      <div className="text-gray-600 break-words">{parsed.activity}</div>
                    </div>
                  </div>
                );
              }
              return (
                <div key={idx} className="text-gray-500 break-words">
                  {log}
                </div>
              );
            })}
            <div ref={logsEndRef} />
          </>
        )}
      </div>
    </div>
  );
}

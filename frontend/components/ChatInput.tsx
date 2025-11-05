"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSubmit: (
    adUrl: string | File,
    lpUrl: string,
    targetAudience?: string,
    campaignGoal?: string,
    guidelines?: string
  ) => void;
  isAnalyzing: boolean;
}

export default function ChatInput({ onSubmit, isAnalyzing }: ChatInputProps) {
  const [adUrl, setAdUrl] = useState("");
  const [adFile, setAdFile] = useState<File | null>(null);
  const [lpUrl, setLpUrl] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [campaignGoal, setCampaignGoal] = useState("");
  const [guidelines, setGuidelines] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [inputMode, setInputMode] = useState<"url" | "file">("file");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adInput = inputMode === "file" ? adFile : adUrl.trim();
    if (adInput && lpUrl.trim()) {
      onSubmit(
        adInput,
        lpUrl,
        targetAudience || undefined,
        campaignGoal || undefined,
        guidelines || undefined
      );
      setAdUrl("");
      setAdFile(null);
      setLpUrl("");
      setTargetAudience("");
      setCampaignGoal("");
      setGuidelines("");
      setShowAdvanced(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setAdFile(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Mode Toggle */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 w-fit">
        <button
          type="button"
          onClick={() => setInputMode("file")}
          disabled={isAnalyzing}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            inputMode === "file"
              ? "bg-white text-primary shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          📤 Ad hochladen
        </button>
        <button
          type="button"
          onClick={() => setInputMode("url")}
          disabled={isAnalyzing}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            inputMode === "url"
              ? "bg-white text-primary shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          🔗 URL eingeben
        </button>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Ad Input - File or URL */}
          {inputMode === "file" ? (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Ad-Motiv hochladen
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isAnalyzing}
                required
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {adFile && (
                <div className="text-xs text-gray-600 flex items-center gap-2">
                  <span>✓</span>
                  <span>{adFile.name} ({(adFile.size / 1024).toFixed(0)} KB)</span>
                </div>
              )}
            </div>
          ) : (
            <Input
              type="url"
              placeholder="Ad-Motiv URL (z.B. https://...)"
              value={adUrl}
              onChange={(e) => setAdUrl(e.target.value)}
              disabled={isAnalyzing}
              required
              className="bg-white"
            />
          )}

          <Input
            type="url"
            placeholder="Landingpage URL"
            value={lpUrl}
            onChange={(e) => setLpUrl(e.target.value)}
            disabled={isAnalyzing}
            required
            className="bg-white"
          />
        </div>

        {/* Target Audience and Campaign Goal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            type="text"
            placeholder="🎯 Zielgruppe (z.B. B2B Entscheider, 35-50 Jahre)"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            disabled={isAnalyzing}
            className="bg-white"
          />

          <Input
            type="text"
            placeholder="🎁 Kampagnenziel (z.B. Lead-Generierung, Brand Awareness)"
            value={campaignGoal}
            onChange={(e) => setCampaignGoal(e.target.value)}
            disabled={isAnalyzing}
            className="bg-white"
          />
        </div>
      </div>

      {showAdvanced && (
        <Textarea
          placeholder='Brand Guidelines (JSON, optional)&#10;z.B. {"tone_of_voice": ["professionell"], "prohibited_words": ["billig"]}'
          value={guidelines}
          onChange={(e) => setGuidelines(e.target.value)}
          disabled={isAnalyzing}
          rows={3}
          className="bg-white font-mono text-xs"
        />
      )}

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          disabled={isAnalyzing}
          className="text-xs"
        >
          {showAdvanced ? "− Weniger" : "+ Brand Guidelines"}
        </Button>

        <Button
          type="submit"
          disabled={
            isAnalyzing ||
            !lpUrl.trim() ||
            (inputMode === "file" ? !adFile : !adUrl.trim())
          }
          className="ml-auto px-8"
        >
          {isAnalyzing ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Analysiere...
            </>
          ) : (
            <>
              <span className="mr-2">🚀</span>
              Analyse starten
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

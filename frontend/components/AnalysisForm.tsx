"use client";

import { useState } from "react";
import { Loader2, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/api";
import type { AdQualityReport } from "@/lib/types";

interface AnalysisFormProps {
  onAnalysisComplete: (report: AdQualityReport) => void;
  onAnalysisStart?: () => void;
  onLogReceived?: (log: string) => void;
}

export default function AnalysisForm({
  onAnalysisComplete,
  onAnalysisStart,
  onLogReceived
}: AnalysisFormProps) {
  const [adInputMode, setAdInputMode] = useState<"url" | "upload">("upload");
  const [adUrl, setAdUrl] = useState("");
  const [adFile, setAdFile] = useState<File | null>(null);
  const [adPreview, setAdPreview] = useState<string>("");
  const [lpUrl, setLpUrl] = useState("");
  const [guidelines, setGuidelines] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Parse guidelines if provided
      let parsedGuidelines = undefined;
      if (guidelines.trim()) {
        try {
          parsedGuidelines = JSON.parse(guidelines);
        } catch (e) {
          setError("Brand Guidelines müssen gültiges JSON sein");
          setIsLoading(false);
          return;
        }
      }

      // Validate inputs
      const hasAdUrl = adInputMode === "url" && adUrl;
      const hasAdFile = adInputMode === "upload" && adFile;

      if (!hasAdUrl && !hasAdFile) {
        setError("Bitte Ad-URL eingeben oder Screenshot hochladen");
        setIsLoading(false);
        return;
      }

      // Notify parent that analysis started
      onAnalysisStart?.();

      // Use streaming API if log callback is provided
      if (onLogReceived) {
        apiClient.analyzeAdStream(
          {
            ad_url: adInputMode === "url" ? adUrl : undefined,
            landing_page_url: lpUrl,
            brand_guidelines: parsedGuidelines,
          },
          adInputMode === "upload" ? adFile : null,  // Pass File directly!
          (log) => {
            onLogReceived(log);
          },
          (report) => {
            onAnalysisComplete(report);
            setIsLoading(false);
          },
          (error) => {
            setError(error);
            setIsLoading(false);
          }
        );
      } else {
        // Fallback to regular API (not used with streaming)
        const response = await apiClient.analyzeAd({
          ad_url: adUrl || "",
          landing_page_url: lpUrl,
          brand_guidelines: parsedGuidelines,
        });

        if (response.report) {
          onAnalysisComplete(response.report);
        } else {
          setError(response.error || "Analyse fehlgeschlagen");
        }
        setIsLoading(false);
      }
    } catch (err: any) {
      // Handle error safely - ensure we convert to string
      let errorMessage = "Verbindung zum Server fehlgeschlagen";

      if (err.response?.data?.detail) {
        // Handle Pydantic validation errors or API errors
        const detail = err.response.data.detail;
        if (typeof detail === 'string') {
          errorMessage = detail;
        } else if (Array.isArray(detail)) {
          // Pydantic validation errors are arrays
          errorMessage = detail.map((e: any) =>
            typeof e === 'string' ? e : e.msg || JSON.stringify(e)
          ).join(', ');
        } else if (typeof detail === 'object') {
          errorMessage = JSON.stringify(detail);
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-primary">Neue Analyse starten</CardTitle>
        <CardDescription>
          Analysiere die Qualität und Konsistenz zwischen Ad und Landingpage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ad Input Mode Tabs */}
          <div className="space-y-3">
            <Label>
              Ad-Motiv <span className="text-red-500">*</span>
            </Label>
            <Tabs
              value={adInputMode}
              onValueChange={(v) => setAdInputMode(v as "url" | "upload")}
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="upload" className="gap-2">
                  <Loader2 className="h-4 w-4" />
                  Screenshot hochladen
                </TabsTrigger>
                <TabsTrigger value="url" className="gap-2">
                  <Link2 className="h-4 w-4" />
                  URL eingeben
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-4">
                <FileUpload
                  onFileSelect={(file, preview) => {
                    setAdFile(file);
                    setAdPreview(preview);
                  }}
                  onClear={() => {
                    setAdFile(null);
                    setAdPreview("");
                  }}
                  preview={adPreview}
                />
              </TabsContent>

              <TabsContent value="url" className="mt-4">
                <Input
                  id="ad-url"
                  type="url"
                  placeholder="https://example.com/ad-image.jpg"
                  value={adUrl}
                  onChange={(e) => setAdUrl(e.target.value)}
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-2">
                  URL zum Werbemotiv (JPG, PNG, etc.)
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Landing Page URL */}
          <div className="space-y-2">
            <Label htmlFor="lp-url">
              Landingpage-URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lp-url"
              type="url"
              placeholder="https://example.com/landing-page"
              value={lpUrl}
              onChange={(e) => setLpUrl(e.target.value)}
              required
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500">
              URL zur Zielseite nach Ad-Klick
            </p>
          </div>

          {/* Brand Guidelines */}
          <div className="space-y-2">
            <Label htmlFor="guidelines">Brand Guidelines (optional)</Label>
            <Textarea
              id="guidelines"
              placeholder='{"tone_of_voice": ["professionell", "freundlich"], "prohibited_words": ["billig"]}'
              value={guidelines}
              onChange={(e) => setGuidelines(e.target.value)}
              disabled={isLoading}
              rows={6}
              className="font-mono text-xs"
            />
            <p className="text-xs text-gray-500">
              JSON-Format. Beispiel:{" "}
              <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                config/brand_guidelines/example_brand.json
              </code>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700 font-medium">❌ Fehler</p>
              <p className="text-sm text-red-600 mt-1 whitespace-pre-wrap">{String(error)}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyse läuft...
              </>
            ) : (
              "Analyse starten"
            )}
          </Button>

          {isLoading && (
            <div className="text-center text-sm text-gray-600">
              <p>⏳ Die Analyse kann bis zu 60 Sekunden dauern...</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

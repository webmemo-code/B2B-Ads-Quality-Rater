"use client";

import { AlertCircle, CheckCircle2, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { formatScore, getScoreColor, getScoreBgColor, formatTimestamp } from "@/lib/utils";
import type { AdQualityReport } from "@/lib/types";
import BrandComplianceTab from "./tabs/BrandComplianceTab";
import CopywritingTab from "./tabs/CopywritingTab";
import VisualTab from "./tabs/VisualTab";

interface ResultsViewProps {
  report: AdQualityReport;
}

export default function ResultsView({ report }: ResultsViewProps) {
  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ad-quality-report-${report.report_id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 mt-8">
      {/* Overall Score Card */}
      <Card className={getScoreBgColor(report.overall_score)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Gesamt-Score</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Report-ID: {report.report_id} • {formatTimestamp(report.timestamp)}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleDownloadJSON}>
              <Download className="mr-2 h-4 w-4" />
              JSON Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className={`text-7xl font-bold ${getScoreColor(report.overall_score)}`}>
              {formatScore(report.overall_score)}
            </div>
            <p className="text-lg text-gray-600 mt-2">von 100 Punkten</p>

            {/* Confidence Level */}
            <div className="mt-4 inline-flex items-center gap-2">
              {report.confidence_level === "High" && (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              )}
              {report.confidence_level === "Medium" && (
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              )}
              {report.confidence_level === "Low" && (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <span className="text-sm font-medium">
                Confidence: {report.confidence_level}
              </span>
            </div>

            {/* Processing Time */}
            <p className="text-sm text-gray-500 mt-2">
              Verarbeitet in {report.processing_time_seconds.toFixed(1)}s
            </p>
          </div>

          {/* Score Breakdown */}
          {report.score_breakdown && (
            <div className="mt-6 grid grid-cols-3 gap-4">
              {Object.entries(report.score_breakdown).map(([key, breakdown]) => (
                <div
                  key={key}
                  className="text-center p-3 bg-white/50 rounded-lg"
                >
                  <p className="text-xs font-medium text-gray-600 uppercase">
                    {key === "visual" && "Visuell"}
                    {key === "copywriting" && "Copywriting"}
                    {key === "brand" && "Marke"}
                  </p>
                  <p className={`text-2xl font-bold ${getScoreColor(breakdown.score)}`}>
                    {formatScore(breakdown.score)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(breakdown.weight * 100).toFixed(0)}% Gewicht
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Errors & Warnings */}
          {(report.errors.length > 0 || report.warnings.length > 0) && (
            <div className="mt-6 space-y-2">
              {report.errors.map((error, idx) => (
                <div
                  key={`error-${idx}`}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-sm text-red-700">❌ {error}</p>
                </div>
              ))}
              {report.warnings.map((warning, idx) => (
                <div
                  key={`warning-${idx}`}
                  className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <p className="text-sm text-yellow-700">⚠️ {warning}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Tabs */}
      <Tabs defaultValue="branding">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="branding">Marke</TabsTrigger>
          <TabsTrigger value="copywriting">Copywriting</TabsTrigger>
          <TabsTrigger value="visual">Visuell</TabsTrigger>
        </TabsList>

        <TabsContent value="branding">
          {report.brand_compliance ? (
            <BrandComplianceTab data={report.brand_compliance} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500">Keine Brand-Analyse verfügbar</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="copywriting">
          {report.copywriting_feedback ? (
            <CopywritingTab data={report.copywriting_feedback} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500">Keine Copywriting-Analyse verfügbar</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="visual">
          {report.visual_analysis ? (
            <VisualTab data={report.visual_analysis} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-500">Keine visuelle Analyse verfügbar</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

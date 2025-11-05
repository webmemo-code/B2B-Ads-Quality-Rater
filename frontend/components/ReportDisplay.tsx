"use client";

import { AdQualityReport } from "@/lib/types";

interface ReportDisplayProps {
  report: AdQualityReport;
}

export default function ReportDisplay({ report }: ReportDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 80) return "🎉";
    if (score >= 60) return "👍";
    return "⚠️";
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "High") return "bg-red-100 text-red-700 border-red-300";
    if (priority === "Medium") return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-blue-100 text-blue-700 border-blue-300";
  };

  return (
    <div className="space-y-6">
      {/* Header Score */}
      <div className="text-center py-4 border-b border-gray-200">
        <div className="text-5xl mb-2">{getScoreEmoji(report.overall_score)}</div>
        <div className="text-4xl font-bold text-gray-800 mb-1">
          {report.overall_score.toFixed(1)}
          <span className="text-2xl text-gray-500">/100</span>
        </div>
        <div className="text-sm text-gray-500">
          Confidence: {report.confidence_level} • {report.processing_time_seconds.toFixed(1)}s
        </div>
      </div>

      {/* Score Breakdown */}
      {report.score_breakdown && Object.keys(report.score_breakdown).length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm">📊 Score Breakdown</h3>
          <div className="space-y-2">
            {Object.entries(report.score_breakdown).map(([key, data]: [string, any]) => {
              // Validate data structure
              if (!data || typeof data.score !== 'number' || typeof data.weight !== 'number') {
                return null;
              }
              return (
                <div key={key} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="capitalize font-medium text-gray-700">{key}</span>
                    <span className="text-xs text-gray-400">
                      ({(data.weight * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <div className={`px-2 py-1 rounded font-medium ${getScoreColor(data.score)}`}>
                    {data.score.toFixed(1)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Visual Analysis */}
      {report.visual_analysis && (
        <div className="space-y-2 border-t pt-4">
          <h3 className="font-semibold text-gray-800 text-sm">🎨 Visuelle Analyse</h3>
          <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
            {report.visual_analysis.composition_quality && (
              <div className="flex justify-between">
                <span className="text-gray-600">Komposition:</span>
                <span className="font-medium text-gray-800">
                  {report.visual_analysis.composition_quality}
                </span>
              </div>
            )}
            {report.visual_analysis.emotional_tone && (
              <div className="flex justify-between">
                <span className="text-gray-600">Emotionaler Ton:</span>
                <span className="font-medium text-gray-800">
                  {report.visual_analysis.emotional_tone}
                </span>
              </div>
            )}
            {report.visual_analysis.cta_visibility !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-600">CTA Sichtbarkeit:</span>
                <span className="font-medium text-gray-800">
                  {report.visual_analysis.cta_visibility.toFixed(0)}%
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Copywriting */}
      {report.copywriting_feedback && (
        <div className="space-y-2 border-t pt-4">
          <h3 className="font-semibold text-gray-800 text-sm">✍️ Copywriting</h3>
          <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
            {report.copywriting_feedback.message_consistency_score !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-600">Message Consistency:</span>
                <span className="font-medium text-gray-800">
                  {report.copywriting_feedback.message_consistency_score.toFixed(0)}%
                </span>
              </div>
            )}
            {report.copywriting_feedback.tone_description && (
              <div className="flex justify-between">
                <span className="text-gray-600">Ton:</span>
                <span className="font-medium text-gray-800">
                  {report.copywriting_feedback.tone_description}
                </span>
              </div>
            )}
            {report.copywriting_feedback.cta_alignment && (
              <div className="flex justify-between">
                <span className="text-gray-600">CTA Alignment:</span>
                <span className="font-medium text-gray-800">
                  {report.copywriting_feedback.cta_alignment}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Brand Compliance */}
      {report.brand_compliance && (
        <div className="space-y-2 border-t pt-4">
          <h3 className="font-semibold text-gray-800 text-sm">🏷️ Brand Compliance</h3>
          <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
            {report.brand_compliance.brand_score !== undefined && (
              <div className="flex justify-between">
                <span className="text-gray-600">Brand Score:</span>
                <span className={`font-medium px-2 py-1 rounded ${getScoreColor(report.brand_compliance.brand_score)}`}>
                  {report.brand_compliance.brand_score.toFixed(1)}
                </span>
              </div>
            )}
            {report.brand_compliance.tone_alignment && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tone Alignment:</span>
                <span className="font-medium text-gray-800">
                  {report.brand_compliance.tone_alignment}
                </span>
              </div>
            )}
            {report.brand_compliance.visual_alignment && (
              <div className="flex justify-between">
                <span className="text-gray-600">Visual Alignment:</span>
                <span className="font-medium text-gray-800">
                  {report.brand_compliance.visual_alignment}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {report.recommendations && report.recommendations.length > 0 && (
        <div className="space-y-2 border-t pt-4">
          <h3 className="font-semibold text-gray-800 text-sm">💡 Empfehlungen</h3>
          <div className="space-y-2">
            {report.recommendations.map((rec: any, idx: number) => (
              <div
                key={idx}
                className={`border rounded-lg p-3 ${getPriorityColor(rec.priority)}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-medium text-sm">{rec.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded border border-current">
                    {rec.priority}
                  </span>
                </div>
                <p className="text-sm opacity-90">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Errors/Warnings */}
      {(report.errors?.length > 0 || report.warnings?.length > 0) && (
        <div className="space-y-2 border-t pt-4">
          {report.errors && report.errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="font-medium text-red-700 text-sm mb-1">❌ Fehler</div>
              <ul className="text-sm text-red-600 space-y-1">
                {report.errors.map((err, idx) => (
                  <li key={idx}>• {err}</li>
                ))}
              </ul>
            </div>
          )}
          {report.warnings && report.warnings.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="font-medium text-yellow-700 text-sm mb-1">⚠️ Warnungen</div>
              <ul className="text-sm text-yellow-600 space-y-1">
                {report.warnings.map((warn, idx) => (
                  <li key={idx}>• {warn}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Download JSON */}
      <div className="border-t pt-4">
        <button
          onClick={() => {
            const blob = new Blob([JSON.stringify(report, null, 2)], {
              type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `report-${report.report_id}.json`;
            a.click();
          }}
          className="text-sm text-primary hover:underline"
        >
          📥 JSON Export herunterladen
        </button>
      </div>
    </div>
  );
}

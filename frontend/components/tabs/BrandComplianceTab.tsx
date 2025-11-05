import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatScore, getScoreColor } from "@/lib/utils";
import type { BrandCompliance } from "@/lib/types";

interface BrandComplianceTabProps {
  data: BrandCompliance;
}

export default function BrandComplianceTab({ data }: BrandComplianceTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Brand Compliance</CardTitle>
          <div className="text-right">
            <p className={`text-3xl font-bold ${getScoreColor(data.brand_score)}`}>
              {formatScore(data.brand_score)}
            </p>
            <p className="text-sm text-gray-600">Brand Score</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tone Alignment */}
        <div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">Tonalität</h4>
              <p className="text-sm text-gray-700 mt-1">{data.tone_alignment}</p>
            </div>
          </div>
        </div>

        {/* Visual Alignment */}
        <div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">Visuelle Konformität</h4>
              <p className="text-sm text-gray-700 mt-1">{data.visual_alignment}</p>
            </div>
          </div>
        </div>

        {/* Prohibited Elements */}
        {data.prohibited_elements.length > 0 && (
          <div>
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-red-700">
                  Verstöße gegen Guidelines ({data.prohibited_elements.length})
                </h4>
                <ul className="mt-2 space-y-1">
                  {data.prohibited_elements.map((element, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-red-700 bg-red-50 px-3 py-2 rounded"
                    >
                      • {element}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Improvement Suggestions */}
        {data.improvement_suggestions.length > 0 && (
          <div>
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm">Verbesserungsvorschläge</h4>
                <ul className="mt-2 space-y-2">
                  {data.improvement_suggestions.map((suggestion, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-700 bg-accent/10 px-3 py-2 rounded"
                    >
                      💡 {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Guideline Coverage */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Guideline Coverage</span>
            <span className="text-sm font-bold">
              {formatScore(data.guideline_coverage)}%
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${data.guideline_coverage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {formatScore(data.guideline_coverage)}% der Guidelines konnten geprüft werden
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

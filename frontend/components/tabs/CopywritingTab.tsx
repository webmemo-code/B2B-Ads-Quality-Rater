import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatScore, getScoreColor } from "@/lib/utils";
import type { CopywritingFeedback } from "@/lib/types";

interface CopywritingTabProps {
  data: CopywritingFeedback;
}

export default function CopywritingTab({ data }: CopywritingTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Copywriting Analyse</CardTitle>
          <div className="text-right">
            <p
              className={`text-3xl font-bold ${getScoreColor(data.message_consistency_score)}`}
            >
              {formatScore(data.message_consistency_score)}
            </p>
            <p className="text-sm text-gray-600">Message Consistency</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tone Match */}
        <div>
          <div className="flex items-start gap-3">
            {data.tone_match ? (
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <h4 className="font-semibold text-sm">
                Tonalität {data.tone_match ? "stimmt überein" : "inkonsistent"}
              </h4>
              <p className="text-sm text-gray-700 mt-1">{data.tone_description}</p>
            </div>
          </div>
        </div>

        {/* CTA Alignment */}
        <div>
          <h4 className="font-semibold text-sm mb-2">CTA-Alignment</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">{data.cta_alignment}</p>
          </div>
        </div>

        {/* Pain Point Coverage */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Pain Point Coverage</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">{data.pain_point_coverage}</p>
          </div>
        </div>

        {/* Persuasion Quality */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Persuasion Quality</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">{data.persuasion_quality}</p>
          </div>
        </div>

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
      </CardContent>
    </Card>
  );
}

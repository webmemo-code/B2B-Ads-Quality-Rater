import { Palette, Eye, Heart, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatScore, getScoreColor } from "@/lib/utils";
import type { VisualAnalysis } from "@/lib/types";

interface VisualTabProps {
  data: VisualAnalysis;
}

export default function VisualTab({ data }: VisualTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visuelle Analyse</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Palette */}
        <div>
          <div className="flex items-start gap-3">
            <Palette className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-2">Farbpalette</h4>
              <div className="flex flex-wrap gap-2">
                {data.color_palette.map((color, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-lg border-2 border-gray-200 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs font-mono text-gray-600">
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Composition */}
        <div>
          <div className="flex items-start gap-3">
            <Eye className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">Komposition</h4>
                <span
                  className={`text-xl font-bold ${getScoreColor(data.composition_score)}`}
                >
                  {formatScore(data.composition_score)}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">{data.composition_quality}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emotional Tone */}
        <div>
          <div className="flex items-start gap-3">
            <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-2">Emotionale Tonalität</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">{data.emotional_tone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Visibility */}
        <div>
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">CTA-Sichtbarkeit</h4>
                <span
                  className={`text-xl font-bold ${getScoreColor(data.cta_visibility)}`}
                >
                  {formatScore(data.cta_visibility)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${data.cta_visibility}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Elements */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Markenelemente</h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(data.brand_element_presence).map(([key, present]) => (
              <div
                key={key}
                className={`p-3 rounded-lg border-2 ${
                  present
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {present ? (
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-white text-xs">✗</span>
                    </div>
                  )}
                  <span className="text-sm font-medium capitalize">{key}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

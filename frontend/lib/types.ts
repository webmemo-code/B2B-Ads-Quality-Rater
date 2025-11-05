/**
 * TypeScript types for Ads Quality Rater
 * Matches backend Pydantic models
 */

export interface VisualAnalysis {
  color_palette: string[];
  composition_quality: string;
  composition_score: number;
  emotional_tone: string;
  cta_visibility: number;
  brand_element_presence: Record<string, boolean>;
}

export interface CopywritingFeedback {
  message_consistency_score: number;
  tone_match: boolean;
  tone_description: string;
  cta_alignment: string;
  pain_point_coverage: string;
  persuasion_quality: string;
  improvement_suggestions: string[];
}

export interface BrandCompliance {
  brand_score: number;
  tone_alignment: string;
  visual_alignment: string;
  prohibited_elements: string[];
  improvement_suggestions: string[];
  guideline_coverage: number;
}

export interface ScoreBreakdown {
  score: number;
  weight: number;
}

export interface Recommendation {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
}

export interface AdQualityReport {
  report_id: string;
  timestamp: string;
  ad_url: string;
  landing_page_url: string;
  overall_score: number;
  visual_analysis?: VisualAnalysis;
  copywriting_feedback?: CopywritingFeedback;
  brand_compliance?: BrandCompliance;
  success: boolean;
  errors: string[];
  warnings: string[];
  processing_time_seconds: number;
  confidence_level: "High" | "Medium" | "Low";
  score_breakdown?: Record<string, ScoreBreakdown>;
  recommendations?: Recommendation[];
}

export interface AnalysisRequest {
  ad_url: string;
  landing_page_url: string;
  brand_guidelines?: BrandGuidelines;
  target_audience?: string;
}

export interface BrandGuidelines {
  brand_name?: string;
  tone_of_voice?: string[];
  prohibited_words?: string[];
  color_palette?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  visual_style?: string;
  values?: string[];
  typography?: {
    allowed_fonts?: string[];
    prohibited_fonts?: string[];
  };
}

export interface AnalysisResponse {
  analysis_id: string;
  status: "pending" | "completed" | "failed";
  report?: AdQualityReport;
  error?: string;
}

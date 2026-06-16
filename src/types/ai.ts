export type AiConfidenceLevel = "LOW" | "MEDIUM" | "HIGH";

export type AiPrediagnosis = {
  summary: string;
  recommendation: string;
  confidence: number;
  confidenceLevel: AiConfidenceLevel;
};

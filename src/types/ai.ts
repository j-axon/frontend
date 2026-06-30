/**
 * Tipos de dominio para AI / Diagnóstico — alineados con el frontend de los compañeros.
 */

export type AiConfidenceLevel = "LOW" | "MEDIUM" | "HIGH";

export type AiRecommendation = {
  title: string;
  rationale: string;
  steps: string[];
  relatedKbUrl?: string;
};

export type AiDiagnosticResponse = {
  summary: string;
  recommendation: AiRecommendation;
  confidence: number;
  confidenceLevel: AiConfidenceLevel;
  generatedAt: string;
};

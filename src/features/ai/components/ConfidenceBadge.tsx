import * as React from "react";
import { Badge } from "@shared/components/ui/Badge";
import type { AiConfidenceLevel } from "@features/ai/types/ai.types";

const labels: Record<AiConfidenceLevel, string> = {
  LOW: "Confianza baja",
  MEDIUM: "Confianza media",
  HIGH: "Confianza alta"
};

const tones: Record<AiConfidenceLevel, "warning" | "info" | "success"> = {
  LOW: "warning",
  MEDIUM: "info",
  HIGH: "success"
};

export function ConfidenceBadge({
  level,
  score
}: {
  level: AiConfidenceLevel;
  score: number;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <Badge tone={tones[level]}>
        <span aria-hidden>{iconFor(level)}</span>
        {labels[level]}
      </Badge>
      <span className="font-mono text-xs text-fg-soft">
        {(score * 100).toFixed(0)}%
      </span>
    </div>
  );
}

function iconFor(level: AiConfidenceLevel) {
  return level === "HIGH" ? "🟢" : level === "MEDIUM" ? "🔵" : "🟡";
}

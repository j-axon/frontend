"use client";

import * as React from "react";
import { Card } from "@shared/components/ui/Card";
import { Button } from "@shared/components/ui/Button";
import { ConfidenceBadge } from "./ConfidenceBadge";
import type { AiDiagnosticResponse } from "@features/ai/types/ai.types";
import { useGenerateDiagnosis } from "@features/ai/hooks/useGenerateDiagnosis";

type AiDiagnosisCardProps = {
  ticketId: string;
  initial?: AiDiagnosticResponse | null;
};

export function AiDiagnosisCard({ ticketId, initial }: AiDiagnosisCardProps) {
  const mutation = useGenerateDiagnosis(ticketId);
  const [result, setResult] = React.useState<AiDiagnosticResponse | null>(initial ?? null);

  React.useEffect(() => {
    if (initial) setResult(initial);
  }, [initial]);

  const onGenerate = async () => {
    const r = await mutation.mutateAsync();
    setResult(r);
  };

  return (
    <Card
      title="Diagnóstico IA"
      description="Sugerencia automática con nivel de confianza visible."
      actions={
        result ? (
          <ConfidenceBadge level={result.confidenceLevel} score={result.confidence} />
        ) : undefined
      }
    >
      {!result ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-fg-soft">
            Solicita a la IA una sugerencia basada en la descripción del ticket.
          </p>
          <Button onClick={onGenerate} loading={mutation.isPending}>
            🤖 Generar diagnóstico
          </Button>
          {mutation.isError && (
            <p role="alert" className="text-sm text-danger">
              No fue posible obtener el diagnóstico.
            </p>
          )}
        </div>
      ) : (
        <article className="flex flex-col gap-3">
          <p className="text-sm text-fg">{result.summary}</p>
          <div>
            <h4 className="text-sm font-semibold text-fg">
              {result.recommendation.title}
            </h4>
            <p className="mt-1 text-sm text-fg-soft">
              {result.recommendation.rationale}
            </p>
            <ol className="mt-2 ml-5 list-decimal text-sm text-fg-soft">
              {result.recommendation.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
            {result.recommendation.relatedKbUrl && (
              <a
                className="mt-2 inline-block text-sm text-accent hover:underline"
                href={result.recommendation.relatedKbUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Documento relacionado →
              </a>
            )}
          </div>
          <footer className="flex items-center justify-between text-xs text-fg-soft">
            <span>
              Generado el {new Date(result.generatedAt).toLocaleString()}
            </span>
            <button
              type="button"
              className="text-accent hover:underline"
              onClick={onGenerate}
            >
              Regenerar
            </button>
          </footer>
        </article>
      )}
    </Card>
  );
}
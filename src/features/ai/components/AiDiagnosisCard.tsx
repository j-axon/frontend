import { ConfidenceIndicator } from "@/features/ai/components/ConfidenceIndicator";

export type AiDiagnosis = {
  id: string;
  summary: string;
  suggestedActions: string[];
  confidence: number;
  createdAt: string;
};

type AiDiagnosisCardProps = {
  diagnosis: AiDiagnosis | null;
};

export function AiDiagnosisCard({ diagnosis }: AiDiagnosisCardProps) {
  if (!diagnosis) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
        <p>No hay diagnóstico IA disponible para este ticket.</p>
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-900">Diagnóstico IA</h3>
        <ConfidenceIndicator confidence={diagnosis.confidence} />
      </div>

      <div className="mb-4 space-y-2">
        <p className="text-sm font-medium text-slate-900">Resumen:</p>
        <p className="text-sm text-slate-600">{diagnosis.summary}</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-900">Acciones sugeridas:</p>
        <ul className="list-inside list-disc space-y-1 text-sm text-slate-600">
          {diagnosis.suggestedActions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-500">
          Generado: {new Date(diagnosis.createdAt).toLocaleString("es-CO", {
            dateStyle: "medium",
            timeStyle: "short"
          })}
        </p>
      </div>

      <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-3">
        <p className="text-xs text-amber-800">
          <strong>Advertencia:</strong> Este diagnóstico es generado por IA y debe usarse como apoyo. Verifica la información antes de tomar decisiones.
        </p>
      </div>
    </section>
  );
}

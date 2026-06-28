type ConfidenceIndicatorProps = {
  confidence: number;
};

function getConfidenceColor(confidence: number): string {
  if (confidence >= 80) {
    return "bg-emerald-100 text-emerald-800 border-emerald-300";
  }
  if (confidence >= 60) {
    return "bg-amber-100 text-amber-800 border-amber-300";
  }
  return "bg-rose-100 text-rose-800 border-rose-300";
}

function getConfidenceLabel(confidence: number): string {
  if (confidence >= 80) {
    return "Alta";
  }
  if (confidence >= 60) {
    return "Media";
  }
  return "Baja";
}

export function ConfidenceIndicator({ confidence }: ConfidenceIndicatorProps) {
  const colorClass = getConfidenceColor(confidence);
  const label = getConfidenceLabel(confidence);

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-24 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full bg-slate-900 transition-all duration-300"
          style={{ width: `${confidence}%` }}
        />
      </div>
      <span
        className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${colorClass}`}
        data-testid="confidence-badge"
      >
        {label} ({confidence}%)
      </span>
    </div>
  );
}

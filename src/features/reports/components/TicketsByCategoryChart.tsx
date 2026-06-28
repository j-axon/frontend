"use client";

import type { TicketsByCategory } from "@/types/reports";

export type TicketsByCategoryChartProps = {
  data: TicketsByCategory[];
};

export function TicketsByCategoryChart({ data }: TicketsByCategoryChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-gray-50">
        <div className="text-gray-500">No hay datos disponibles</div>
      </div>
    );
  }

  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Tickets por Categoría
      </h3>
      <div className="flex h-64 flex-col justify-between gap-2">
        {data.map((item) => {
          const percentage = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
          
          return (
            <div key={item.category} className="flex items-center gap-3">
              <span className="w-24 min-w-24 text-sm font-medium text-gray-700 truncate">
                {item.category}
              </span>
              <div className="flex-1">
                <div className="h-6 w-full overflow-hidden rounded bg-gray-100">
                  <div
                    className="h-full rounded bg-blue-600 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <span className="w-12 min-w-12 text-right text-sm font-semibold text-gray-900">
                {item.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
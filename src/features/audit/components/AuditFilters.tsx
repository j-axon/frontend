"use client";

import * as React from "react";
import { Input } from "@shared/components/ui/Input";
import { Button } from "@shared/components/ui/Button";

export type AuditFiltersValue = {
  actor?: string;
  action?: string;
  from?: string;
  to?: string;
};

type Props = {
  initial?: AuditFiltersValue;
  onApply: (value: AuditFiltersValue) => void;
};

export function AuditFilters({ initial, onApply }: Props) {
  const [v, setV] = React.useState<AuditFiltersValue>(initial ?? {});
  return (
    <form
      className="grid gap-3 sm:grid-cols-4"
      onSubmit={(e) => {
        e.preventDefault();
        onApply(v);
      }}
    >
      <Input
        label="Actor"
        placeholder="usuario@empresa.com"
        value={v.actor ?? ""}
        onChange={(e) => setV({ ...v, actor: e.target.value })}
      />
      <Input
        label="Acción"
        placeholder="LOGIN, CREATE_TICKET..."
        value={v.action ?? ""}
        onChange={(e) => setV({ ...v, action: e.target.value })}
      />
      <Input
        label="Desde"
        type="date"
        value={v.from ?? ""}
        onChange={(e) => setV({ ...v, from: e.target.value })}
      />
      <Input
        label="Hasta"
        type="date"
        value={v.to ?? ""}
        onChange={(e) => setV({ ...v, to: e.target.value })}
      />
      <div className="sm:col-span-4">
        <Button type="submit">Aplicar filtros</Button>
      </div>
    </form>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { AssetQrPrefillData } from "@/features/assets/types/asset-qr.types";
import {
  createTicketSchema,
  type CreateTicketFormValues
} from "@/features/tickets/schemas/create-ticket.schema";
import {
  createTicketFromQr,
  TicketCreateForbiddenError
} from "@/features/tickets/services/ticket.service";
import {
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
  type CreateTicketResponse
} from "@/features/tickets/types/ticket.types";
import { AssetPrefillCard } from "@/features/tickets/components/AssetPrefillCard";

type TicketFromQrFormProps = {
  asset: AssetQrPrefillData;
};

export function TicketFromQrForm({ asset }: TicketFromQrFormProps) {
  const [result, setResult] = useState<CreateTicketResponse | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      descripcion: "",
      categoria: undefined,
      prioridad: "MEDIUM"
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    setResult(null);

    try {
      const response = await createTicketFromQr({
        assetUuid: asset.assetUuid,
        descripcion: values.descripcion,
        categoria: values.categoria,
        prioridad: values.prioridad
      });

      setResult(response);
      reset({
        descripcion: "",
        categoria: undefined,
        prioridad: "MEDIUM"
      });
    } catch (error) {
      if (error instanceof TicketCreateForbiddenError) {
        setSubmitError("No autorizado para reportar sobre este activo.");
        return;
      }

      setSubmitError("No se pudo crear el ticket. Intenta nuevamente.");
    }
  });

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Reportar falla del activo</h1>
        <p className="text-sm text-slate-600">
          Los datos tecnicos del activo son de solo lectura y se cargan automaticamente desde el QR.
        </p>
      </header>

      <AssetPrefillCard asset={asset} />

      <form className="grid gap-4" onSubmit={onSubmit}>
        <label className="grid gap-1 text-sm text-slate-700" htmlFor="descripcion">
          Descripcion de la falla
          <textarea
            id="descripcion"
            className="min-h-32 rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
            placeholder="Describe la falla observada"
            {...register("descripcion")}
          />
          {errors.descripcion && (
            <span className="text-xs text-rose-700">{errors.descripcion.message}</span>
          )}
        </label>

        <label className="grid gap-1 text-sm text-slate-700" htmlFor="categoria">
          Categoria
          <select
            id="categoria"
            className="rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
            defaultValue=""
            {...register("categoria")}
          >
            <option value="" disabled>
              Selecciona una categoria
            </option>
            {TICKET_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.categoria && <span className="text-xs text-rose-700">{errors.categoria.message}</span>}
        </label>

        <label className="grid gap-1 text-sm text-slate-700" htmlFor="prioridad">
          Prioridad
          <select
            id="prioridad"
            className="rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-500"
            {...register("prioridad")}
          >
            {TICKET_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>

        <p className="text-xs text-slate-500">Adjuntos: reservados para habilitacion futura.</p>

        {submitError && (
          <p className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{submitError}</p>
        )}

        {result && (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            Ticket creado correctamente: {result.codigo}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition enabled:hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Enviando..." : "Crear ticket"}
        </button>
      </form>
    </section>
  );
}

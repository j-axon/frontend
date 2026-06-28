"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AssetQrResponse } from "@/features/assets/types/asset-qr.types";
import { isForbiddenError } from "@/lib/api/http-error";
import {
  createTicketSchema,
  type CreateTicketInput,
} from "../schemas/create-ticket.schema";
import { AssetPrefillCard } from "./AssetPrefillCard";
import { createTicket } from "../services/ticket.service";
import {
  TICKET_CATEGORIES,
  TICKET_PRIORITIES,
} from "../types/ticket.types";

interface TicketFromQrFormProps {
  asset: AssetQrResponse;
}

export function TicketFromQrForm({ asset }: TicketFromQrFormProps) {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTicketInput>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      assetUuid: asset.id,
    },
  });

  const onSubmit = async (data: CreateTicketInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await createTicket(data);
      setSubmitSuccess(true);
    } catch (error) {
      if (isForbiddenError(error)) {
        setSubmitError(
          "No tienes permisos para reportar una falla en este activo. Por favor, contacta al administrador."
        );
      } else {
        setSubmitError(
          "Error al crear el ticket. Por favor, intenta nuevamente."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div
        className="rounded-lg border border-green-200 bg-green-50 p-6 text-center"
        data-testid="ticket-success-message"
      >
        <div className="mb-4 text-4xl">✓</div>
        <h3 className="mb-2 text-xl font-semibold text-green-800">
          ¡Ticket creado con éxito!
        </h3>
        <p className="text-green-700">
          El equipo de soporte revisará tu reporte pronto.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      data-testid="ticket-from-qr-form"
    >
      <input type="hidden" {...register("assetUuid")} />

      <AssetPrefillCard asset={asset} />

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Reportar Falla</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Descripción <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows={4}
              className="mt-1 w-full rounded-md border border-input px-3 py-2 text-sm"
              placeholder="Describe detalladamente la falla encontrada..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              {...register("category")}
              className="mt-1 w-full rounded-md border border-input px-3 py-2 text-sm"
            >
              <option value="">Selecciona una categoría</option>
              {TICKET_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium">
              Prioridad
            </label>
            <select
              id="priority"
              {...register("priority")}
              className="mt-1 w-full rounded-md border border-input px-3 py-2 text-sm"
            >
              <option value="">Selecciona una prioridad (opcional)</option>
              {TICKET_PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            {errors.priority && (
              <p className="mt-1 text-sm text-red-500" role="alert">
                {errors.priority.message}
              </p>
            )}
          </div>

          {submitError && (
            <div
              className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800"
              role="alert"
              data-testid="ticket-submit-error"
            >
              {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Creando ticket..." : "Crear Ticket"}
          </button>
        </div>
      </div>
    </form>
  );
}

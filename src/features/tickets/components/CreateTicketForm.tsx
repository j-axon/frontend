"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@shared/components/ui/Input";
import { Button } from "@shared/components/ui/Button";
import { createTicketSchema, type CreateTicketFormValues } from "@features/tickets/schemas/ticketSchemas";
import { useCreateTicketFromQr } from "@features/tickets/hooks/useCreateTicketFromQr";
import { ApiRequestError } from "@shared/lib/http/errors";
import { ROUTES } from "@/constants/routes";

type CreateTicketFormProps = {
  qrUuid: string;
  onSuccess?: () => void;
};

export function CreateTicketForm({ qrUuid, onSuccess }: CreateTicketFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      qrUuid,
      title: "",
      description: "",
      category: "HARDWARE",
      priority: "MEDIUM"
    }
  });

  const mutation = useCreateTicketFromQr();
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    setErrorMsg(null);
    try {
      const created = await mutation.mutateAsync(values);
      onSuccess?.();
      router.push(ROUTES.ticketDetail(created.id));
    } catch (err) {
      if (err instanceof ApiRequestError) setErrorMsg(err.message);
      else setErrorMsg("No fue posible crear el ticket.");
    }
  });

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <input type="hidden" {...register("qrUuid")} />
      <Input
        label="Título"
        placeholder="Ej. No enciende el monitor"
        {...register("title")}
        error={errors.title?.message}
      />

      <div className="grid gap-2">
        <label htmlFor="description" className="text-sm font-medium text-fg-soft">
          Descripción
        </label>
        <textarea
          id="description"
          rows={4}
          {...register("description")}
          aria-invalid={Boolean(errors.description) || undefined}
          className={`rounded-lg border bg-muted px-3 py-2 text-fg placeholder:text-slate-500 ${
            errors.description ? "border-danger" : "border-border focus:border-accent"
          }`}
          placeholder="Describe el problema observado..."
        />
        {errors.description?.message && (
          <p role="alert" className="text-xs text-danger">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Categoría"
          {...register("category")}
          error={errors.category?.message}
        >
          <option value="HARDWARE">Hardware</option>
          <option value="SOFTWARE">Software</option>
          <option value="NETWORK">Red</option>
          <option value="PERIPHERAL">Periférico</option>
          <option value="OTHER">Otro</option>
        </SelectField>
        <SelectField
          label="Prioridad"
          {...register("priority")}
          error={errors.priority?.message}
        >
          <option value="LOW">Baja</option>
          <option value="MEDIUM">Media</option>
          <option value="HIGH">Alta</option>
          <option value="CRITICAL">Crítica</option>
        </SelectField>
      </div>

      {errorMsg && (
        <div role="alert" className="rounded-md border border-danger/50 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {errorMsg}
        </div>
      )}

      <Button type="submit" loading={mutation.isPending} disabled={mutation.isPending}>
        Crear ticket
      </Button>
    </form>
  );
}

function SelectField({
  label,
  children,
  error,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
}) {
  const reactId = React.useId();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={reactId} className="text-sm font-medium text-fg-soft">
        {label}
      </label>
      <select
        id={reactId}
        {...rest}
        className={`h-11 rounded-lg border bg-muted px-3 text-fg ${
          error ? "border-danger" : "border-border focus:border-accent"
        }`}
      >
        {children}
      </select>
      {error && (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

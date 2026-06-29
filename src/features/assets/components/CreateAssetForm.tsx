"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@shared/components/ui/Input";
import { Button } from "@shared/components/ui/Button";
import { assetSchema, type AssetFormValues } from "@features/assets/schemas/assetsSchemas";
import { adminAssetsService } from "@features/assets/services/adminAssetsService";
import { ApiRequestError } from "@shared/lib/http/errors";
import { ROUTES } from "@/constants/routes";

export function CreateAssetForm() {
  const router = useRouter();
  const qc = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AssetFormValues>({
    resolver: zodResolver(assetSchema),
    defaultValues: { code: "", name: "", serialNumber: "", description: "", assignedUserId: "" }
  });
  const [serverError, setServerError] = React.useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (values: AssetFormValues) =>
      adminAssetsService.create({
        code: values.code,
        name: values.name,
        serialNumber: values.serialNumber || undefined,
        description: values.description || undefined,
        assignedUserId: values.assignedUserId || undefined
      })
  });

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      const created = await mutation.mutateAsync(values);
      await qc.invalidateQueries({ queryKey: ["assets"] });
      router.push(ROUTES.adminAssets);
      // eslint-disable-next-line no-console
      console.info("Activo creado", created);
    } catch (err) {
      if (err instanceof ApiRequestError) setServerError(err.message);
      else setServerError("No fue posible crear el activo.");
    }
  });

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <Input label="Código inventario" {...register("code")} error={errors.code?.message} />
      <Input label="Nombre" {...register("name")} error={errors.name?.message} />
      <Input
        label="Número de serie (opcional)"
        {...register("serialNumber")}
        error={errors.serialNumber?.message}
      />
      <Input
        label="Descripción (opcional)"
        {...register("description")}
        error={errors.description?.message}
      />
      <Input
        label="ID del usuario asignado (opcional)"
        {...register("assignedUserId")}
        error={errors.assignedUserId?.message}
        placeholder="uuid del usuario"
      />

      {serverError && (
        <div role="alert" className="rounded-md border border-danger/50 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {serverError}
        </div>
      )}

      <Button type="submit" loading={mutation.isPending}>
        Crear activo
      </Button>
    </form>
  );
}

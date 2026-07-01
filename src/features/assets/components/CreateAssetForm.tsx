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
    defaultValues: {
      codigoInventario: "",
      nombre: "",
      tipo: "",
      marca: "",
      modelo: "",
      serial: "",
      ubicacion: ""
    }
  });
  const [serverError, setServerError] = React.useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (values: AssetFormValues) =>
      adminAssetsService.create({
        codigoInventario: values.codigoInventario,
        nombre: values.nombre,
        tipo: values.tipo || undefined,
        marca: values.marca || undefined,
        modelo: values.modelo || undefined,
        serial: values.serial || undefined,
        ubicacion: values.ubicacion || undefined
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
      <Input
        label="Código inventario"
        {...register("codigoInventario")}
        error={errors.codigoInventario?.message}
        required
      />
      <Input
        label="Nombre"
        {...register("nombre")}
        error={errors.nombre?.message}
        required
      />
      <Input
        label="Tipo (opcional)"
        {...register("tipo")}
        error={errors.tipo?.message}
        placeholder="Laptop, Desktop, Servidor…"
      />
      <Input
        label="Marca (opcional)"
        {...register("marca")}
        error={errors.marca?.message}
        placeholder="Lenovo, Dell, HP…"
      />
      <Input
        label="Modelo (opcional)"
        {...register("modelo")}
        error={errors.modelo?.message}
      />
      <Input
        label="Número de serie (opcional)"
        {...register("serial")}
        error={errors.serial?.message}
      />
      <Input
        label="Ubicación (opcional)"
        {...register("ubicacion")}
        error={errors.ubicacion?.message}
        placeholder="Oficina, depósito, sala de servidores…"
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

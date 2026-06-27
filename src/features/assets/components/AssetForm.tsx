"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminAssetsService } from "@/features/assets/services/admin-assets.service";

export function AssetForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    assignedToUserId: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await adminAssetsService.createAsset(formData);
      router.push("/admin/assets");
    } catch (error) {
      console.error("Error creating asset:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-slate-900 mb-2">
              Código *
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
              placeholder="Ej: PC-001"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
              placeholder="Ej: Laptop Dell Latitude"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-900 mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
              placeholder="Descripción detallada del activo..."
            />
          </div>

          <div>
            <label htmlFor="assignedToUserId" className="block text-sm font-medium text-slate-900 mb-2">
              Asignar a usuario
            </label>
            <select
              id="assignedToUserId"
              name="assignedToUserId"
              value={formData.assignedToUserId}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            >
              <option value="">Sin asignar</option>
              <option value="user-1">Juan Perez</option>
              <option value="user-2">Maria Garcia</option>
              <option value="user-3">Carlos Lopez</option>
            </select>
            <p className="mt-1 text-xs text-slate-500">Opcional: asigna el activo a un usuario al crearlo</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md border border-slate-900 bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {isSubmitting ? "Guardando..." : "Guardar activo"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/assets")}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:border-slate-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}

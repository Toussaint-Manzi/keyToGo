"use client";

import { useCallback, useEffect, useState } from "react";
import { apiGet, apiMutate } from "@/lib/dashboard-api";
import { IconEdit, IconTrash } from "@/components/dashboard/icons";
import {
  DeleteModal,
  FormFooter,
  LoadingCenter,
  ModalShell,
  PageHeader,
  PublishedPill,
  ToggleSwitch,
  inputClass,
  labelClass,
} from "@/components/dashboard/ui";

export type CrudField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "switch";
  required?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
};

export type CrudColumn<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
};

type CrudPageProps<T extends { id: string; published?: boolean }> = {
  resourceLabel: string;
  resourceLabelPlural: string;
  apiPath: string;
  addButtonLabel: string;
  columns: CrudColumn<T>[];
  fields: CrudField[];
  emptyForm: Record<string, unknown>;
  rowToForm: (row: T) => Record<string, unknown>;
  showPublishedToggle?: boolean;
  wideModal?: boolean;
};

export function CrudPage<T extends { id: string; published?: boolean }>({
  resourceLabel,
  resourceLabelPlural,
  apiPath,
  addButtonLabel,
  columns,
  fields,
  emptyForm,
  rowToForm,
  showPublishedToggle = true,
  wideModal = false,
}: CrudPageProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiGet<T[]>(apiPath);
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [apiPath]);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    setError(null);
    setShowForm(true);
  };

  const openEdit = (row: T) => {
    setForm(rowToForm(row));
    setEditingId(row.id);
    setError(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = { ...form };
      if (payload.sortOrder !== undefined) {
        payload.sortOrder = Number(payload.sortOrder) || 0;
      }
      if (editingId) {
        await apiMutate(`${apiPath}/${editingId}`, "PUT", payload);
      } else {
        await apiMutate(apiPath, "POST", payload);
      }
      closeForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await apiMutate(`${apiPath}/${id}`, "DELETE");
    setDeleteConfirm(null);
    await load();
  };

  const togglePublished = async (row: T) => {
    if (row.published === undefined) return;
    await apiMutate(`${apiPath}/${row.id}`, "PUT", {
      ...rowToForm(row),
      published: !row.published,
    });
    await load();
  };

  const setField = (name: string, value: unknown) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  if (loading) return <LoadingCenter />;

  const formFields = fields.filter((f) => f.type !== "switch");
  const switchFields = fields.filter((f) => f.type === "switch");

  return (
    <div>
      <PageHeader
        countLabel={`${items.length} ${resourceLabelPlural.toLowerCase()} total`}
        addLabel={addButtonLabel}
        onAdd={openCreate}
      />

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className="px-4 py-4 text-xs font-medium tracking-wide text-slate-400 uppercase sm:px-6"
                  >
                    {col.header}
                  </th>
                ))}
                {showPublishedToggle && (
                  <th className="px-4 py-4 text-xs font-medium tracking-wide text-slate-400 uppercase sm:px-6">
                    Status
                  </th>
                )}
                <th className="px-4 py-4 text-xs font-medium tracking-wide text-slate-400 uppercase sm:px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.id} className="border-b border-slate-50 last:border-0">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-4 sm:px-6">
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key as string] ?? "")}
                    </td>
                  ))}
                  {showPublishedToggle && row.published !== undefined && (
                    <td className="px-4 py-4 sm:px-6">
                      <button type="button" onClick={() => togglePublished(row)}>
                        <PublishedPill published={!!row.published} />
                      </button>
                    </td>
                  )}
                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(row)}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700"
                        title="Edit"
                      >
                        <IconEdit />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirm(row.id)}
                        className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        title="Delete"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length + (showPublishedToggle ? 2 : 1)}
                    className="px-6 py-12 text-center text-sm text-slate-400"
                  >
                    No {resourceLabelPlural.toLowerCase()} yet. Create your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteConfirm && (
        <DeleteModal
          title={`Delete ${resourceLabel}`}
          onCancel={() => setDeleteConfirm(null)}
          onConfirm={() => handleDelete(deleteConfirm)}
        />
      )}

      {showForm && (
        <ModalShell
          title={editingId ? `Edit ${resourceLabel}` : `Add ${resourceLabel}`}
          onClose={closeForm}
          wide={wideModal}
        >
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              {formFields
                .filter((f) => f.type !== "switch")
                .map((field) => (
                  <div
                    key={field.name}
                    className={field.fullWidth || field.type === "textarea" ? "sm:col-span-2" : ""}
                  >
                    <label className={labelClass}>{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={String(form[field.name] ?? "")}
                        onChange={(e) => setField(field.name, e.target.value)}
                        required={field.required}
                        rows={4}
                        placeholder={field.placeholder}
                        className={`${inputClass} resize-none`}
                      />
                    ) : (
                      <input
                        type={field.type === "number" ? "number" : "text"}
                        value={
                          field.type === "number"
                            ? String(form[field.name] ?? 0)
                            : String(form[field.name] ?? "")
                        }
                        onChange={(e) =>
                          setField(
                            field.name,
                            field.type === "number"
                              ? parseInt(e.target.value, 10) || 0
                              : e.target.value,
                          )
                        }
                        required={field.required}
                        placeholder={field.placeholder}
                        className={inputClass}
                      />
                    )}
                  </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-6">
              {switchFields.map((field) => {
                if (field.name === "published" && !showPublishedToggle) return null;
                return (
                  <ToggleSwitch
                    key={field.name}
                    checked={Boolean(form[field.name])}
                    onChange={(v) => setField(field.name, v)}
                    label={field.label}
                  />
                );
              })}
            </div>
            <FormFooter
              onCancel={closeForm}
              submitLabel={editingId ? `Update ${resourceLabel}` : `Create ${resourceLabel}`}
              saving={saving}
            />
          </form>
        </ModalShell>
      )}
    </div>
  );
}

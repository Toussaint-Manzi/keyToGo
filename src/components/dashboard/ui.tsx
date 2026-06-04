"use client";

import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";

export const labelClass =
  "mb-1.5 block text-xs font-medium tracking-wide text-slate-500 uppercase";

export function Spinner({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-blue-600 border-t-transparent ${className}`}
    />
  );
}

export function LoadingCenter() {
  return (
    <div className="flex items-center justify-center py-20">
      <Spinner />
    </div>
  );
}

export function PageHeader({
  countLabel,
  addLabel,
  onAdd,
}: {
  countLabel: string;
  addLabel: string;
  onAdd: () => void;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-slate-500">{countLabel}</p>
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:bg-blue-700"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        {addLabel}
      </button>
    </div>
  );
}

export function PublishedPill({ published }: { published: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        published
          ? "bg-emerald-50 text-emerald-600"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

export function ToggleSwitch({
  checked,
  onChange,
  label = "Published",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <div className="h-6 w-11 rounded-full bg-slate-200 transition-colors peer-checked:bg-blue-600" />
        <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
      </div>
      <span className="text-sm font-medium text-slate-900">{label}</span>
    </label>
  );
}

export function DeleteModal({
  title,
  onCancel,
  onConfirm,
}: {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden />
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-500">
          Are you sure? This action cannot be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export function ModalShell({
  title,
  onClose,
  children,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white p-6 shadow-xl sm:p-8 ${
          wide ? "max-w-2xl" : "max-w-lg"
        }`}
      >
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export function FormFooter({
  onCancel,
  submitLabel,
  saving,
  disabled,
}: {
  onCancel: () => void;
  submitLabel: string;
  saving?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-3 pt-2">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={saving || disabled}
        className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-medium text-white transition-opacity hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : submitLabel}
      </button>
    </div>
  );
}

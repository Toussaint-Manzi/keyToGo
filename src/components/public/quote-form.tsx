"use client";

import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  resetQuoteForm,
  setFormError,
  setSubmitting,
  setSuccess,
} from "@/store/slices/quote-form-slice";
import { fr } from "@/lib/public-i18n";

type Option = { id: string; label: string };

export function QuoteForm({ options }: { options: Option[] }) {
  const dispatch = useDispatch();
  const { submitting, success, error, fieldErrors } = useSelector(
    (s: RootState) => s.quoteForm,
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setSubmitting(true));
    dispatch(setFormError({}));

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      company: String(form.get("company") ?? ""),
      phone: String(form.get("phone") ?? ""),
      service: String(form.get("service") ?? ""),
      message: String(form.get("message") ?? ""),
    };

    const res = await fetch("/api/public/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    dispatch(setSubmitting(false));

    if (!json.ok) {
      dispatch(
        setFormError({
          message: json.message ?? fr.quote.error,
          fieldErrors: json.errors,
        }),
      );
      return;
    }

    dispatch(setSuccess(true));
    e.currentTarget.reset();
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center">
        <CheckCircle className="mx-auto text-teal-600" size={48} />
        <p className="mt-4 text-lg font-medium text-slate-800">
          {fr.quote.success}
        </p>
        <button
          type="button"
          className="mt-6 text-teal-700 underline"
          onClick={() => dispatch(resetQuoteForm())}
        >
          {fr.quote.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && !Object.keys(fieldErrors).length && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 p-4 text-red-700">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={fr.quote.fullName} name="name" error={fieldErrors.name} />
        <Field label={fr.quote.email} name="email" type="email" error={fieldErrors.email} />
        <Field label={fr.quote.company} name="company" error={fieldErrors.company} />
        <Field label={fr.quote.phone} name="phone" error={fieldErrors.phone} />
      </div>

      <div>
        <label htmlFor="service" className="mb-1 block text-sm font-medium text-slate-700">
          {fr.quote.service}
        </label>
        <select
          id="service"
          name="service"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            {fr.quote.selectService}
          </option>
          {options.map((o) => (
            <option key={o.id} value={o.label}>
              {o.label}
            </option>
          ))}
        </select>
        {fieldErrors.service && <p className="mt-1 text-sm text-red-600">{fieldErrors.service}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
          {fr.quote.details}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={fr.quote.detailsPlaceholder}
          className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 focus:outline-none"
        />
        {fieldErrors.message && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-slate-600 px-6 py-3 font-semibold text-white transition hover:from-teal-600 hover:to-slate-700 disabled:opacity-60 sm:w-auto"
      >
        {submitting && <Loader2 className="animate-spin" size={20} />}
        {fr.quote.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={label.includes("*") || label.includes(" *")}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 focus:outline-none"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

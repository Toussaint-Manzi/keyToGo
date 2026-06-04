"use client";

import { useEffect, useState } from "react";
import { apiGet, apiMutate } from "@/lib/dashboard-api";
import {
  FormFooter,
  LoadingCenter,
  ModalShell,
  inputClass,
  labelClass,
} from "@/components/dashboard/ui";

type Settings = {
  companyName: string;
  legalName?: string | null;
  tagline?: string | null;
  heroTitle: string;
  heroSubtitle?: string | null;
  heroTypingPhrases: string[];
  introParagraphs: string[];
  contactEmail: string;
  contactPhone?: string | null;
  contactAddress?: string | null;
  countriesLine?: string | null;
  metaDescription?: string | null;
  footerText?: string | null;
};

export default function DashboardSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<Settings>("/api/admin/settings")
      .then((data) => {
        setSettings(data);
        setForm(data);
      })
      .catch(() => setSettings(null))
      .finally(() => setLoading(false));
  }, []);

  const openEdit = () => {
    if (settings) {
      setForm({ ...settings });
      setShowForm(true);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await apiMutate<Settings>("/api/admin/settings", "PUT", form);
      setSettings(updated);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const updatePhrase = (index: number, value: string) => {
    if (!form) return;
    const phrases = [...form.heroTypingPhrases];
    phrases[index] = value;
    setForm({ ...form, heroTypingPhrases: phrases });
  };

  const updateIntro = (index: number, value: string) => {
    if (!form) return;
    const paras = [...form.introParagraphs];
    paras[index] = value;
    setForm({ ...form, introParagraphs: paras });
  };

  if (loading) return <LoadingCenter />;

  if (!settings) {
    return (
      <p className="text-sm text-slate-500">
        No site settings found. Run the database seed first.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">Homepage hero, contact info, and SEO</p>
        <button
          type="button"
          onClick={openEdit}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Edit settings
        </button>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Company
            </dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">{settings.companyName}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Contact email
            </dt>
            <dd className="mt-1 text-sm text-slate-700">{settings.contactEmail}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Hero title
            </dt>
            <dd className="mt-1 text-sm text-slate-700">{settings.heroTitle}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Hero phrases
            </dt>
            <dd className="mt-1 text-sm text-slate-600">
              {settings.heroTypingPhrases.join(" · ")}
            </dd>
          </div>
        </dl>
      </div>

      {showForm && form && (
        <ModalShell title="Edit site settings" onClose={() => setShowForm(false)} wide>
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass}>Company name</label>
                <input
                  className={inputClass}
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Hero headline</label>
                <input
                  className={inputClass}
                  value={form.heroTitle}
                  onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Hero subtitle</label>
                <input
                  className={inputClass}
                  value={form.heroSubtitle ?? ""}
                  onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClass}>Contact email</label>
                <input
                  type="email"
                  className={inputClass}
                  value={form.contactEmail}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Contact phone</label>
                <input
                  className={inputClass}
                  value={form.contactPhone ?? ""}
                  onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Hero typing phrases</label>
              {form.heroTypingPhrases.map((phrase, i) => (
                <input
                  key={i}
                  className={`${inputClass} mb-2`}
                  value={phrase}
                  onChange={(e) => updatePhrase(i, e.target.value)}
                />
              ))}
              <button
                type="button"
                className="text-xs font-medium text-blue-600"
                onClick={() =>
                  setForm({
                    ...form,
                    heroTypingPhrases: [...form.heroTypingPhrases, ""],
                  })
                }
              >
                + Add phrase
              </button>
            </div>

            <div>
              <label className={labelClass}>Introduction paragraphs</label>
              {form.introParagraphs.map((p, i) => (
                <textarea
                  key={i}
                  rows={3}
                  className={`${inputClass} mb-2 resize-none`}
                  value={p}
                  onChange={(e) => updateIntro(i, e.target.value)}
                />
              ))}
              <button
                type="button"
                className="text-xs font-medium text-blue-600"
                onClick={() =>
                  setForm({
                    ...form,
                    introParagraphs: [...form.introParagraphs, ""],
                  })
                }
              >
                + Add paragraph
              </button>
            </div>

            <FormFooter
              onCancel={() => setShowForm(false)}
              submitLabel="Save settings"
              saving={saving}
            />
          </form>
        </ModalShell>
      )}
    </div>
  );
}

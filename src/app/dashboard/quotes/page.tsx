"use client";

import { useCallback, useEffect, useState } from "react";
import { apiGet, apiMutate } from "@/lib/dashboard-api";
import { DeleteModal, LoadingCenter } from "@/components/dashboard/ui";

type Quote = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function DashboardQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await apiGet<Quote[]>("/api/admin/quotes");
      setQuotes(Array.isArray(data) ? data : []);
    } catch {
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const setStatus = async (id: string, status: string) => {
    await apiMutate(`/api/admin/quotes/${id}`, "PATCH", { status });
    await load();
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-CA", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const unreadCount = quotes.filter((q) => q.status === "new").length;

  if (loading) return <LoadingCenter />;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <p className="text-sm text-slate-500">{quotes.length} quote requests</p>
        {unreadCount > 0 && (
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            {unreadCount} new
          </span>
        )}
      </div>

      <div className="space-y-2">
        {quotes.map((q) => {
          const isNew = q.status === "new";
          return (
            <div
              key={q.id}
              className={`overflow-hidden rounded-2xl bg-white shadow-sm ${
                isNew ? "border-l-4 border-blue-600" : ""
              }`}
            >
              <div
                className="flex cursor-pointer items-center gap-3 px-4 py-4 sm:gap-4 sm:px-6"
                onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
              >
                <div className="flex w-3 shrink-0 justify-center">
                  {isNew && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <p
                      className={`truncate text-sm ${isNew ? "font-bold text-slate-900" : "font-medium text-slate-800"}`}
                    >
                      {q.name}
                    </p>
                    <span className="shrink-0 text-xs text-slate-400">{q.email}</span>
                  </div>
                  <p
                    className={`mt-0.5 truncate text-sm ${isNew ? "font-medium text-slate-600" : "text-slate-500"}`}
                  >
                    {q.service}
                  </p>
                </div>
                <span className="hidden shrink-0 text-xs text-slate-400 sm:inline">
                  {formatDate(q.createdAt)}
                </span>
                <svg
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${
                    expandedId === q.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>

              {expandedId === q.id && (
                <div className="border-t border-slate-100 px-4 py-5 sm:px-6">
                  <p className="text-xs text-slate-500 sm:hidden">{formatDate(q.createdAt)}</p>
                  {q.company && (
                    <p className="mb-2 text-xs text-slate-500">
                      <span className="font-medium">Company:</span> {q.company}
                    </p>
                  )}
                  {q.phone && (
                    <p className="mb-2 text-xs text-slate-500">
                      <span className="font-medium">Phone:</span> {q.phone}
                    </p>
                  )}
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                    {q.message}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <select
                      value={q.status}
                      onChange={(e) => setStatus(q.id, e.target.value)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="archived">Archived</option>
                    </select>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirm(q.id);
                      }}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {quotes.length === 0 && (
          <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
            <svg
              className="mx-auto mb-3 h-10 w-10 text-slate-200"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <p className="text-sm text-slate-400">No quote requests yet</p>
          </div>
        )}
      </div>

      {deleteConfirm && (
        <DeleteModal
          title="Delete quote request"
          onCancel={() => setDeleteConfirm(null)}
          onConfirm={async () => {
            await apiMutate(`/api/admin/quotes/${deleteConfirm}`, "DELETE");
            setDeleteConfirm(null);
            if (expandedId === deleteConfirm) setExpandedId(null);
            await load();
          }}
        />
      )}
    </div>
  );
}

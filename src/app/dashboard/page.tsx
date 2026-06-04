"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/dashboard-api";
import { LoadingCenter } from "@/components/dashboard/ui";
import { dashboardNav } from "@/lib/dashboard-nav";

type Stats = {
  quotesNew: number;
  servicesCount: number;
  expertiseCount: number;
  officesCount: number;
};

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<Stats>("/api/admin/dashboard")
      .then(setStats)
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingCenter />;

  const cards = [
    { label: "New quote requests", value: stats?.quotesNew ?? 0, href: "/dashboard/quotes" },
    { label: "Services", value: stats?.servicesCount ?? 0, href: "/dashboard/services" },
    { label: "Expertise areas", value: stats?.expertiseCount ?? 0, href: "/dashboard/expertise" },
    { label: "Offices", value: stats?.officesCount ?? 0, href: "/dashboard/offices" },
  ];

  return (
    <div>
      <p className="mb-6 text-sm text-slate-500">
        Welcome back. Pick a section below to update your website content.
      </p>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-3xl font-bold text-blue-600">{card.value}</p>
            <p className="mt-1 text-sm font-medium text-slate-700">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Quick links
        </h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {dashboardNav
            .filter((n) => n.href !== "/dashboard")
            .map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-5 text-sm text-slate-600">
        <strong className="text-slate-800">Tip:</strong> Use &quot;Published&quot; toggles to hide
        items on the live site without deleting them. Lower sort order numbers appear first.
      </div>
    </div>
  );
}

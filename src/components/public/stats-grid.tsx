import { TrendingUp, Users, Briefcase, Clock } from "lucide-react";

type Stat = { id: string; label: string; value: string };

const iconFor = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("client")) return Users;
  if (l.includes("projet") || l.includes("project")) return Briefcase;
  if (l.includes("année") || l.includes("expert") || l.includes("year")) return TrendingUp;
  if (l.includes("support") || l.includes("24")) return Clock;
  return TrendingUp;
};

export function StatsGrid({ stats }: { stats: Stat[] }) {
  if (!stats.length) return null;

  return (
    <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-5 md:grid-cols-4">
      {stats.map((s) => {
        const Icon = iconFor(s.label);
        return (
          <article
            key={s.id}
            className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200/80 hover:shadow-lg sm:p-6"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-slate-500 opacity-80" />
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-50 to-slate-50 text-teal-600 transition group-hover:scale-105 sm:h-12 sm:w-12">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
            </div>
            <p className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              <span className="gradient-text">{s.value}</span>
            </p>
            <p className="mt-2 text-xs leading-snug text-slate-600 sm:text-sm">{s.label}</p>
          </article>
        );
      })}
    </div>
  );
}

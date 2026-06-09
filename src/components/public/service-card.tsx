import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DynamicIcon } from "@/lib/icons";
import { en } from "@/lib/public-i18n";

type ServiceCardProps = {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
  bulletPoints?: unknown;
  ctaLabel?: string | null;
  ctaHref?: string | null;
};

export function ServiceCard({
  title,
  description,
  icon,
  bulletPoints,
  ctaLabel,
  ctaHref,
}: ServiceCardProps) {
  const bullets = Array.isArray(bulletPoints) ? (bulletPoints as string[]) : [];
  const hasCta = Boolean(ctaHref);

  const cta = hasCta ? (
    <Link
      href={ctaHref!}
      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition hover:text-teal-700"
    >
      {ctaLabel ?? en.sections.exploreMore}
      <ArrowRight className="h-4 w-4" />
    </Link>
  ) : null;

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl sm:p-6">
      <DynamicIcon
        name={icon}
        className="mb-3 h-5 w-5 text-teal-600 sm:mb-4 sm:h-6 sm:w-6"
      />
      <h4 className="text-base font-semibold sm:text-lg">{title}</h4>
      <p className="mt-2 flex-1 text-xs text-slate-600 sm:text-sm">{description}</p>
      {bullets.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs text-slate-500 sm:mt-4 sm:text-sm">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-teal-500">•</span>
              {b}
            </li>
          ))}
        </ul>
      )}
      {cta}
    </article>
  );
}

import { Quote } from "lucide-react";
import { en } from "@/lib/public-i18n";

type Testimonial = {
  id: string;
  authorName: string;
  authorRole: string | null;
  company: string | null;
  content: string;
  rating: number | null;
};

export function TestimonialsSection({
  testimonials,
  embedded = false,
}: {
  testimonials: Testimonial[];
  embedded?: boolean;
}) {
  if (!testimonials.length) return null;

  const inner = (
    <>
      <h2 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        {en.sections.testimonialsTitle}{" "}
        <span className="gradient-text">{en.sections.testimonialsHighlight}</span>
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 sm:mt-4 sm:text-base">
        {en.sections.testimonialsSubtitle}
      </p>
      <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <article
            key={t.id}
            className="relative rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
          >
            <Quote className="h-6 w-6 text-teal-500/40 sm:h-8 sm:w-8" aria-hidden />
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              &ldquo;{t.content}&rdquo;
            </p>
            {t.rating != null && t.rating > 0 && (
              <p className="mt-3 text-xs text-amber-500 sm:text-sm">
                {"★".repeat(Math.min(5, t.rating))}
              </p>
            )}
            <div className="mt-4 border-t border-slate-100 pt-4">
              <p className="text-sm font-semibold text-slate-800">{t.authorName}</p>
              {(t.authorRole || t.company) && (
                <p className="text-xs text-slate-500">
                  {[t.authorRole, t.company].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );

  if (embedded) {
    return <div className="mx-auto max-w-7xl">{inner}</div>;
  }

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 bg-gradient-to-b from-slate-50 to-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">{inner}</div>
    </section>
  );
}

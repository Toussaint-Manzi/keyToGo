import Image from "next/image";
import { en } from "@/lib/public-i18n";
import { Handshake } from "lucide-react";

type Partner = {
  id: string;
  name: string;
  logoUrl: string | null;
  role: string | null;
};

export function PartnersSection({ partners }: { partners: Partner[] }) {
  if (!partners.length) return null;

  return (
    <section id="partners" className="scroll-mt-24 bg-slate-50/80 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          {en.sections.partnersTitle}{" "}
          <span className="gradient-text">{en.sections.partnersHighlight}</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 sm:mt-4 sm:text-base">
          {en.sections.partnersSubtitle}
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5 lg:grid-cols-3">
          {partners.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300/50 hover:shadow-md sm:p-8"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-50 to-slate-50 ring-1 ring-slate-100 transition group-hover:ring-teal-200 sm:h-20 sm:w-20">
                {p.logoUrl ? (
                  <div className="relative h-10 w-20 sm:h-12 sm:w-24">
                    <Image
                      src={p.logoUrl}
                      alt={p.name}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                ) : (
                  <span className="text-xl font-bold text-teal-700 sm:text-2xl">
                    {p.name.charAt(0)}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-slate-900 sm:text-base">{p.name}</p>
              {p.role && (
                <p className="mt-2 flex items-center justify-center gap-1 text-xs text-slate-500 sm:text-sm">
                  <Handshake className="h-3.5 w-3.5 shrink-0 text-teal-500" aria-hidden />
                  {p.role}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

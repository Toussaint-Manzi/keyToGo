"use client";

import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { VideoModal } from "@/components/public/video-modal";
import { en } from "@/lib/public-i18n";
import type { ProductPageItem } from "@/lib/product-page-types";

export function GovConnectClient({
  products,
  videoUrl,
}: {
  products: ProductPageItem[];
  videoUrl: string | null;
}) {
  const [demoOpen, setDemoOpen] = useState(false);

  if (products.length === 0) {
    return (
      <p className="mt-10 text-center text-slate-500">
        Product information is not configured. Run <code>npm run db:seed</code>.
      </p>
    );
  }

  return (
    <>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {products.map((product) => {
          const isComingSoon = product.comingSoon || !product.href;

          return (
            <article
              key={product.key}
              className={`flex flex-col rounded-2xl border p-6 shadow-sm sm:p-8 ${
                isComingSoon
                  ? "border-dashed border-slate-200 bg-slate-50/80"
                  : "border-slate-100 bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold text-slate-900">{product.title}</h3>
                {isComingSoon && (
                  <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                    {en.sections.comingSoon}
                  </span>
                )}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base">
                {product.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {!isComingSoon && product.href && (
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-500"
                  >
                    {en.sections.visitPlatform}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {product.hasDemo && videoUrl && (
                  <button
                    type="button"
                    onClick={() => setDemoOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-teal-300 hover:text-teal-700"
                  >
                    <Play className="h-4 w-4" />
                    {en.sections.watchDemo}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {videoUrl && (
        <VideoModal
          open={demoOpen}
          onClose={() => setDemoOpen(false)}
          title={en.govconnect.demoTitle}
          videoUrl={videoUrl}
        />
      )}
    </>
  );
}

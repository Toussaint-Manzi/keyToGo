import { GovConnectClient } from "@/components/public/govconnect-client";
import { SiteFooter } from "@/components/public/site-footer";
import { en } from "@/lib/public-i18n";
import { parseProductPageItems } from "@/lib/product-page-types";
import { getProductPage, getPublicContent } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export default async function GovConnectPage() {
  const [page, content] = await Promise.all([
    getProductPage("govconnect"),
    getPublicContent(),
  ]);

  const settings = content.settings;
  const products = page ? parseProductPageItems(page.products) : [];

  return (
    <div className="min-h-screen bg-white pt-20">
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
            IT Solutions
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            {page?.title ?? "govCONNECT"}
          </h1>
          {page?.subtitle && (
            <p className="mt-4 text-lg text-slate-600">{page.subtitle}</p>
          )}
          <p className="mt-6 text-base leading-relaxed text-slate-600">
            {page?.description ??
              "Digital government and healthcare administration platforms for modern public-sector operations."}
          </p>
        </div>

        <section className="mt-14 sm:mt-20">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            {en.govconnect.productsTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            {en.govconnect.productsSubtitle}
          </p>

          <GovConnectClient
            products={products}
            videoUrl={page?.videoUrl ?? null}
          />
        </section>
      </main>

      {settings && (
        <SiteFooter
          companyName={settings.companyName}
          tagline={settings.tagline}
          footerText={settings.footerText}
          contactEmail={settings.contactEmail}
          contactPhone={settings.contactPhone}
          contactAddress={settings.contactAddress}
        />
      )}
    </div>
  );
}

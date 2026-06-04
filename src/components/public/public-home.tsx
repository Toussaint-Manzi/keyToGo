import type { PublicContent } from "@/lib/public-data";
import { DynamicIcon } from "@/lib/icons";
import { fr } from "@/lib/public-i18n";
import { HeroShell } from "@/components/public/hero-shell";
import { PartnersSection } from "@/components/public/partners-section";
import { QuoteForm } from "@/components/public/quote-form";
import { SiteFooter } from "@/components/public/site-footer";
import { StatsGrid } from "@/components/public/stats-grid";
import { TestimonialsSection } from "@/components/public/testimonials-section";
import { Mail, MapPin, Phone } from "lucide-react";

const sectionScroll = "scroll-mt-24";

export function PublicHome({ content }: { content: PublicContent }) {
  const { settings } = content;
  if (!settings) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 pt-24 text-center">
        <p>{fr.empty.seed}</p>
      </div>
    );
  }

  const intro = settings.introParagraphs as string[];
  const phrases = settings.heroTypingPhrases as string[];
  const vision = content.visionMission.filter((v) => v.type === "vision");
  const mission = content.visionMission.filter((v) => v.type === "mission");

  return (
    <>
      <div id="home">
        <HeroShell
          title={settings.heroTitle}
          subtitle={settings.heroSubtitle}
          phrases={phrases}
          countriesLine={settings.countriesLine}
        />
        <section className="mx-auto max-w-7xl bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl space-y-4 text-center text-sm text-slate-600 sm:space-y-6 sm:text-base md:text-lg">
            {intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <StatsGrid stats={content.stats} />
        </section>
      </div>

      <main className="bg-white">
        <section
          id="services"
          className={`bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 ${sectionScroll}`}
        >
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
              {fr.sections.servicesTitle}{" "}
              <span className="gradient-text">{fr.sections.servicesHighlight}</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 sm:mt-4 sm:text-base">
              {fr.sections.servicesSubtitle}
            </p>
            <div className="mt-10 space-y-12 sm:mt-16 sm:space-y-20">
              {content.categories.map((cat) => (
                <div key={cat.id}>
                  <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700 sm:h-12 sm:w-12 sm:rounded-xl">
                      <DynamicIcon name={cat.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold sm:text-xl md:text-2xl">{cat.name}</h3>
                      <p className="text-sm text-slate-600 sm:text-base">{cat.description}</p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {cat.services.map((svc) => (
                      <article
                        key={svc.id}
                        className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl sm:p-6"
                      >
                        <DynamicIcon
                          name={svc.icon}
                          className="mb-3 h-5 w-5 text-teal-600 sm:mb-4 sm:h-6 sm:w-6"
                        />
                        <h4 className="text-base font-semibold sm:text-lg">{svc.title}</h4>
                        <p className="mt-2 text-xs text-slate-600 sm:text-sm">{svc.description}</p>
                        {Array.isArray(svc.bulletPoints) && svc.bulletPoints.length > 0 && (
                          <ul className="mt-3 space-y-1 text-xs text-slate-500 sm:mt-4 sm:text-sm">
                            {(svc.bulletPoints as string[]).map((b) => (
                              <li key={b} className="flex gap-2">
                                <span className="text-teal-500">•</span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="expertise"
          className={`mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 ${sectionScroll}`}
        >
          <h2 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
            {fr.sections.expertiseTitle}
            <span className="gradient-text">{fr.sections.expertiseHighlight}</span>
          </h2>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {content.expertise.map((area) => (
              <article
                key={area.id}
                className="group rounded-xl border border-slate-100 p-4 transition hover:border-teal-200 hover:shadow-lg sm:rounded-2xl sm:p-6"
              >
                <DynamicIcon
                  name={area.icon}
                  className="h-5 w-5 text-teal-600 transition group-hover:scale-110 sm:h-6 sm:w-6"
                />
                <h3 className="mt-3 text-sm font-semibold sm:mt-4 sm:text-base">{area.title}</h3>
                {area.tagline && (
                  <p className="mt-1 text-xs font-medium text-teal-700 sm:text-sm">{area.tagline}</p>
                )}
                <p className="mt-2 line-clamp-4 text-xs text-slate-600 sm:text-sm">
                  {area.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <PartnersSection partners={content.partners} />

        <TestimonialsSection testimonials={content.testimonials} />

        <section
          id="about"
          className={`bg-slate-900 px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20 ${sectionScroll}`}
        >
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
              {fr.sections.visionTitle}{" "}
              <span className="text-teal-400">{fr.sections.visionHighlight}</span>
            </h2>
            <div className="mt-8 grid gap-8 sm:mt-12 lg:grid-cols-2 lg:gap-12">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-teal-300 sm:mb-6 sm:text-xl">
                  {fr.sections.vision}
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {vision.map((item) => (
                    <div key={item.id} className="rounded-xl bg-white/5 p-3 sm:p-4">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-teal-400 sm:text-xs">
                        {item.pillar}
                      </p>
                      <p className="mt-1 text-sm font-semibold sm:text-base">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-300 sm:text-sm">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold text-teal-300 sm:mb-6 sm:text-xl">
                  {fr.sections.mission}
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {mission.map((item) => (
                    <div key={item.id} className="rounded-xl bg-white/5 p-3 sm:p-4">
                      <p className="text-[10px] font-medium uppercase tracking-wide text-teal-400 sm:text-xs">
                        {item.pillar}
                      </p>
                      <p className="mt-1 text-sm font-semibold sm:text-base">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-300 sm:text-sm">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            {fr.sections.whyTitle}{" "}
            <span className="gradient-text">{fr.sections.whyHighlight}</span>?
          </h2>
          <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {content.whyChoose.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 rounded-xl border border-slate-100 p-4 shadow-sm sm:gap-4 sm:rounded-2xl sm:p-6"
              >
                <DynamicIcon
                  name={item.icon}
                  className="h-5 w-5 shrink-0 text-teal-600 sm:h-6 sm:w-6"
                />
                <div>
                  <h3 className="text-sm font-semibold sm:text-base">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-600 sm:text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {content.staffingSkills.length > 0 && (
          <section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="mx-auto max-w-7xl text-center">
              <h2 className="text-xl font-bold sm:text-2xl">{fr.sections.staffingTitle}</h2>
              <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3">
                {content.staffingSkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="rounded-full border border-teal-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 sm:px-4 sm:py-2 sm:text-sm"
                  >
                    {skill.title}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        <section
          id="contact"
          className={`mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 ${sectionScroll}`}
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                {fr.sections.contactTitle}{" "}
                <span className="gradient-text">{fr.sections.contactHighlight}</span>
              </h2>
              <p className="mt-3 text-sm text-slate-600 sm:mt-4 sm:text-base">
                {fr.sections.contactSubtitle}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700 sm:mt-8 sm:space-y-4">
                <li className="flex items-center gap-2 sm:gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-teal-600 sm:h-5 sm:w-5" />
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="hover:text-teal-600"
                  >
                    {settings.contactEmail}
                  </a>
                </li>
                {settings.contactPhone && (
                  <li className="flex items-center gap-2 sm:gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-teal-600 sm:h-5 sm:w-5" />
                    <span>{settings.contactPhone}</span>
                  </li>
                )}
                {settings.contactAddress && (
                  <li className="flex items-start gap-2 sm:gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 sm:h-5 sm:w-5" />
                    <span>{settings.contactAddress}</span>
                  </li>
                )}
              </ul>
              {content.offices.length > 0 && (
                <div className="mt-8 sm:mt-10">
                  <h3 className="text-sm font-semibold sm:text-base">{fr.sections.offices}</h3>
                  <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                    {content.offices.map((office) => (
                      <div
                        key={office.id}
                        className="rounded-lg border border-slate-100 p-3 text-xs sm:p-4 sm:text-sm"
                      >
                        <p className="font-medium">
                          {office.city ? `${office.city}, ` : ""}
                          {office.country}
                          {office.isHeadquarters && (
                            <span className="ml-2 text-teal-600">{fr.sections.hq}</span>
                          )}
                        </p>
                        {office.address && (
                          <p className="text-slate-600">{office.address}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-lg sm:rounded-2xl sm:p-6 md:p-8">
              <QuoteForm options={content.quoteOptions} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter
        companyName={settings.companyName}
        tagline={settings.tagline}
        footerText={settings.footerText}
        contactEmail={settings.contactEmail}
        contactPhone={settings.contactPhone}
        contactAddress={settings.contactAddress}
      />
    </>
  );
}

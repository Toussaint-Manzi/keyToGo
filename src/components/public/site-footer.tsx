import { Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { en } from "@/lib/public-i18n";

export function SiteFooter({
  companyName,
  tagline,
  footerText,
  contactEmail,
  contactPhone,
  contactAddress,
}: {
  companyName: string;
  tagline?: string | null;
  footerText?: string | null;
  contactEmail: string;
  contactPhone?: string | null;
  contactAddress?: string | null;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLogo variant="footer" />
            {tagline && (
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">{tagline}</p>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-400">
              {en.sections.quickLinks}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                [en.nav.aboutUs, "/#about"],
                [en.nav.services, "/#services"],
                [en.nav.industries, "/#industries"],
                [en.nav.partners, "/#partners"],
                [en.nav.resources, "/#resources"],
                [en.nav.contact, "/#contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="transition hover:text-teal-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-400">
              {en.sections.servicesLinks}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["IT Solutions", "/#services"],
                ["Staffing", "/#services"],
                ["Transport", "/#services"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="transition hover:text-teal-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-teal-400">
              {en.sections.socialMedia}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ["LinkedIn", "https://www.linkedin.com"],
                ["Facebook", "https://www.facebook.com"],
                ["X", "https://x.com"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-teal-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-400">
              {en.sections.contactFooter}
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                <a href={`mailto:${contactEmail}`} className="hover:text-teal-300">
                  {contactEmail}
                </a>
              </li>
              {contactPhone && (
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                  <span>{contactPhone}</span>
                </li>
              )}
              {contactAddress && (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                  <span>{contactAddress}</span>
                </li>
              )}
            </ul>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-teal-400">
              {en.sections.legal}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="transition hover:text-teal-300">
                  {en.sections.privacyPolicy}
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-teal-300">
                  {en.sections.termsConditions}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-4 text-center text-xs text-slate-500 sm:text-sm">
          <p>
            {footerText ?? `© ${year} ${companyName}. ${en.footer.rights}`}
          </p>
        </div>
      </div>
    </footer>
  );
}

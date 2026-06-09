import { ExternalLink } from "lucide-react";
import { en } from "@/lib/public-i18n";

type Resource = {
  id: string;
  title: string;
  category: string;
  excerpt: string | null;
  href: string;
};

const sectionScroll = "scroll-mt-24";

const CATEGORY_ORDER = [
  "Blog",
  "Whitepapers",
  "Industry Reports",
  "Technology Trends",
  "Telecom Insights",
];

export function ResourcesSection({ resources }: { resources: Resource[] }) {
  if (resources.length === 0) return null;

  const categories = CATEGORY_ORDER.filter((cat) =>
    resources.some((r) => r.category === cat),
  );

  return (
    <section
      id="resources"
      className={`bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 ${sectionScroll}`}
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          {en.sections.resourcesTitle}{" "}
          <span className="gradient-text">{en.sections.resourcesHighlight}</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 sm:mt-4 sm:text-base">
          {en.sections.resourcesSubtitle}
        </p>

        <div className="mt-10 space-y-12 sm:mt-14">
          {categories.map((category) => {
            const items = resources
              .filter((r) => r.category === category)
              .slice(0, 3);

            return (
              <div key={category}>
                <h3 className="text-lg font-semibold text-slate-900">{category}</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {items.map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition hover:border-teal-200 hover:shadow-md sm:p-6"
                    >
                      <p className="text-xs font-medium uppercase tracking-wide text-teal-600">
                        {resource.category}
                      </p>
                      <h4 className="mt-2 flex-1 text-base font-semibold text-slate-900 group-hover:text-teal-700">
                        {resource.title}
                      </h4>
                      {resource.excerpt && (
                        <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                          {resource.excerpt}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600">
                        Read article
                        <ExternalLink className="h-3.5 w-3.5" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

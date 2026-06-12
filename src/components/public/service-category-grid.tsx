import { ServiceCard } from "@/components/public/service-card";

type Service = {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
  bulletPoints?: unknown;
  ctaHref?: string | null;
  ctaLabel?: string | null;
};

/** Second-row, second-column placement for balanced 3-column grids (4-card categories). */
const CENTER_SECOND_ROW: Record<string, string[]> = {
  transport: ["Logistics & Courier"],
  staffing: ["Healthcare Staffing"],
};

function placementClass(categorySlug: string, title: string): string {
  const titles = CENTER_SECOND_ROW[categorySlug];
  if (!titles?.includes(title)) return "";
  return "lg:col-start-2";
}

export function ServiceCategoryGrid({
  categorySlug,
  services,
}: {
  categorySlug: string;
  services: Service[];
}) {
  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((svc) => (
        <div key={svc.id} className={placementClass(categorySlug, svc.title)}>
          <ServiceCard
            id={svc.id}
            title={svc.title}
            description={svc.description}
            icon={svc.icon}
            bulletPoints={svc.bulletPoints}
            ctaHref={svc.ctaHref}
            ctaLabel={svc.ctaLabel}
          />
        </div>
      ))}
    </div>
  );
}

"use client";

import { CrudPage } from "@/components/dashboard/crud-page";

type Stat = { id: string; label: string; value: string; sortOrder: number; published: boolean };

export default function DashboardStatsPage() {
  return (
    <CrudPage<Stat>
      resourceLabel="Statistic"
      resourceLabelPlural="Statistics"
      apiPath="/api/admin/stats"
      addButtonLabel="Add statistic"
      columns={[
        { key: "label", header: "Label" },
        { key: "value", header: "Value" },
        { key: "sortOrder", header: "Order" },
      ]}
      fields={[
        { name: "label", label: "Label", required: true },
        { name: "value", label: "Value", required: true },
        { name: "sortOrder", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "switch" },
      ]}
      emptyForm={{ label: "", value: "", sortOrder: 0, published: true }}
      rowToForm={(r) => ({
        label: r.label,
        value: r.value,
        sortOrder: r.sortOrder,
        published: r.published,
      })}
    />
  );
}

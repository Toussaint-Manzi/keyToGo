"use client";

import { CrudPage } from "@/components/dashboard/crud-page";

type Row = {
  id: string;
  name: string;
  logoUrl: string | null;
  role: string | null;
  sortOrder: number;
  published: boolean;
};

export default function DashboardPartnersPage() {
  return (
    <CrudPage<Row>
      resourceLabel="Partner"
      resourceLabelPlural="Partners"
      apiPath="/api/admin/partners"
      addButtonLabel="Add partner"
      columns={[
        { key: "name", header: "Name" },
        { key: "role", header: "Role", render: (r) => r.role ?? "—" },
        { key: "sortOrder", header: "Order" },
      ]}
      fields={[
        { name: "name", label: "Partner name", required: true },
        { name: "role", label: "Role" },
        { name: "logoUrl", label: "Logo URL (optional)", fullWidth: true },
        { name: "sortOrder", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "switch" },
      ]}
      emptyForm={{ name: "", role: "", logoUrl: "", sortOrder: 0, published: true }}
      rowToForm={(r) => ({
        name: r.name,
        role: r.role ?? "",
        logoUrl: r.logoUrl ?? "",
        sortOrder: r.sortOrder,
        published: r.published,
      })}
    />
  );
}

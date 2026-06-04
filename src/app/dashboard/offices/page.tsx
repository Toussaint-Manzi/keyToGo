"use client";

import { CrudPage } from "@/components/dashboard/crud-page";

type Row = {
  id: string;
  country: string;
  city: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  isHeadquarters: boolean;
  sortOrder: number;
  published: boolean;
};

export default function DashboardOfficesPage() {
  return (
    <CrudPage<Row>
      resourceLabel="Office"
      resourceLabelPlural="Offices"
      apiPath="/api/admin/offices"
      addButtonLabel="Add office"
      wideModal
      columns={[
        { key: "country", header: "Country" },
        { key: "city", header: "City", render: (r) => r.city ?? "—" },
        {
          key: "isHeadquarters",
          header: "HQ",
          render: (r) => (r.isHeadquarters ? "Yes" : ""),
        },
      ]}
      fields={[
        { name: "country", label: "Country", required: true },
        { name: "city", label: "City" },
        { name: "address", label: "Address", type: "textarea", fullWidth: true },
        { name: "phone", label: "Phone" },
        { name: "email", label: "Email" },
        { name: "isHeadquarters", label: "Headquarters", type: "switch" as const },
        { name: "sortOrder", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "switch" },
      ]}
      emptyForm={{
        country: "",
        city: "",
        address: "",
        phone: "",
        email: "",
        isHeadquarters: false,
        sortOrder: 0,
        published: true,
      }}
      rowToForm={(r) => ({
        country: r.country,
        city: r.city ?? "",
        address: r.address ?? "",
        phone: r.phone ?? "",
        email: r.email ?? "",
        isHeadquarters: r.isHeadquarters,
        sortOrder: r.sortOrder,
        published: r.published,
      })}
      showPublishedToggle
    />
  );
}

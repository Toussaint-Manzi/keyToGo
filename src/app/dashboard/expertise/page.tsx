"use client";

import { CrudPage } from "@/components/dashboard/crud-page";

type Row = {
  id: string;
  title: string;
  tagline: string | null;
  description: string;
  icon: string | null;
  sortOrder: number;
  published: boolean;
};

export default function DashboardExpertisePage() {
  return (
    <CrudPage<Row>
      resourceLabel="Expertise area"
      resourceLabelPlural="Expertise areas"
      apiPath="/api/admin/expertise"
      addButtonLabel="Add expertise"
      wideModal
      columns={[
        { key: "title", header: "Title" },
        {
          key: "tagline",
          header: "Tagline",
          render: (r) => (
            <span className="text-slate-500">{r.tagline ?? "—"}</span>
          ),
        },
        { key: "sortOrder", header: "Order" },
      ]}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "tagline", label: "Tagline" },
        { name: "description", label: "Description", type: "textarea", required: true, fullWidth: true },
        { name: "icon", label: "Icon name (e.g. Factory)" },
        { name: "sortOrder", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "switch" },
      ]}
      emptyForm={{
        title: "",
        tagline: "",
        description: "",
        icon: "",
        sortOrder: 0,
        published: true,
      }}
      rowToForm={(r) => ({
        title: r.title,
        tagline: r.tagline ?? "",
        description: r.description,
        icon: r.icon ?? "",
        sortOrder: r.sortOrder,
        published: r.published,
      })}
    />
  );
}

"use client";

import { CrudPage } from "@/components/dashboard/crud-page";

type Row = {
  id: string;
  section: string;
  title: string;
  description: string;
  icon: string | null;
  sortOrder: number;
  published: boolean;
};

export default function DashboardWhyChoosePage() {
  return (
    <CrudPage<Row>
      resourceLabel="Item"
      resourceLabelPlural="Why choose us items"
      apiPath="/api/admin/why-choose"
      addButtonLabel="Add item"
      wideModal
      columns={[
        { key: "section", header: "Section" },
        { key: "title", header: "Title" },
        { key: "sortOrder", header: "Order" },
      ]}
      fields={[
        { name: "section", label: "Section (general or transport)", required: true },
        { name: "title", label: "Title", required: true },
        { name: "description", label: "Description", type: "textarea", required: true, fullWidth: true },
        { name: "icon", label: "Icon name" },
        { name: "sortOrder", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "switch" },
      ]}
      emptyForm={{
        section: "general",
        title: "",
        description: "",
        icon: "",
        sortOrder: 0,
        published: true,
      }}
      rowToForm={(r) => ({
        section: r.section,
        title: r.title,
        description: r.description,
        icon: r.icon ?? "",
        sortOrder: r.sortOrder,
        published: r.published,
      })}
    />
  );
}

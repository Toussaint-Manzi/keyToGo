"use client";

import { CrudPage } from "@/components/dashboard/crud-page";

type Row = {
  id: string;
  pillar: string;
  type: string;
  title: string;
  body: string;
  sortOrder: number;
  published: boolean;
};

export default function DashboardVisionMissionPage() {
  return (
    <CrudPage<Row>
      resourceLabel="Item"
      resourceLabelPlural="Vision & mission items"
      apiPath="/api/admin/vision-mission"
      addButtonLabel="Add item"
      wideModal
      columns={[
        { key: "pillar", header: "Pillar" },
        { key: "type", header: "Type" },
        { key: "title", header: "Title" },
      ]}
      fields={[
        { name: "pillar", label: "Pillar (e.g. IT Solutions)", required: true },
        { name: "type", label: "Type (vision or mission)", required: true },
        { name: "title", label: "Title", required: true },
        { name: "body", label: "Description", type: "textarea", required: true, fullWidth: true },
        { name: "sortOrder", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "switch" },
      ]}
      emptyForm={{
        pillar: "",
        type: "vision",
        title: "",
        body: "",
        sortOrder: 0,
        published: true,
      }}
      rowToForm={(r) => ({
        pillar: r.pillar,
        type: r.type,
        title: r.title,
        body: r.body,
        sortOrder: r.sortOrder,
        published: r.published,
      })}
    />
  );
}

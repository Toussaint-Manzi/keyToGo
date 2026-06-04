"use client";

import { SimpleCrudPage } from "@/components/admin/simple-crud-page";

export default function AdminVisionMissionPage() {
  return (
    <SimpleCrudPage
      title="Vision & Mission"
      description="Statements grouped by pillar (IT, Transport, Staffing)."
      apiPath="/api/admin/vision-mission"
      columns={[
        { title: "Pillar", dataIndex: "pillar" },
        { title: "Type", dataIndex: "type" },
        { title: "Title", dataIndex: "title" },
        { title: "Order", dataIndex: "sortOrder" },
      ]}
      fields={[
        { name: "pillar", label: "Pillar (e.g. IT Solutions)", required: true },
        { name: "type", label: "Type (vision or mission)", required: true },
        { name: "title", label: "Title", required: true },
        { name: "body", label: "Description", type: "textarea", required: true },
        { name: "sortOrder", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "switch" },
      ]}
    />
  );
}

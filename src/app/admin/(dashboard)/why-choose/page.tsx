"use client";

import { SimpleCrudPage } from "@/components/admin/simple-crud-page";

export default function AdminWhyChoosePage() {
  return (
    <SimpleCrudPage
      title="Why choose us"
      description="Benefits and differentiators shown on the homepage."
      apiPath="/api/admin/why-choose"
      columns={[
        { title: "Section", dataIndex: "section" },
        { title: "Title", dataIndex: "title" },
        { title: "Order", dataIndex: "sortOrder" },
      ]}
      fields={[
        { name: "section", label: "Section (general or transport)", required: true },
        { name: "title", label: "Title", required: true },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "icon", label: "Icon name" },
        { name: "sortOrder", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "switch" },
      ]}
    />
  );
}

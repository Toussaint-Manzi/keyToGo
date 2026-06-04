"use client";

import { SimpleCrudPage } from "@/components/admin/simple-crud-page";

export default function AdminExpertisePage() {
  return (
    <SimpleCrudPage
      title="Areas of expertise"
      description="Industry sectors displayed on the homepage."
      apiPath="/api/admin/expertise"
      columns={[
        { title: "Title", dataIndex: "title" },
        { title: "Tagline", dataIndex: "tagline" },
        { title: "Order", dataIndex: "sortOrder" },
      ]}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "tagline", label: "Short tagline" },
        { name: "description", label: "Description", type: "textarea", required: true },
        { name: "icon", label: "Icon name (e.g. Factory, Cloud)" },
        { name: "sortOrder", label: "Sort order", type: "number" },
        { name: "published", label: "Published", type: "switch" },
      ]}
    />
  );
}

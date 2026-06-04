"use client";

import { SimpleCrudPage } from "@/components/admin/simple-crud-page";

export default function AdminStatsPage() {
  return (
    <SimpleCrudPage
      title="Homepage statistics"
      description="Numbers shown below the introduction (e.g. years of experience, clients)."
      apiPath="/api/admin/stats"
      columns={[
        { title: "Label", dataIndex: "label" },
        { title: "Value", dataIndex: "value" },
        { title: "Order", dataIndex: "sortOrder" },
        { title: "Published", dataIndex: "published" },
      ]}
      fields={[
        { name: "label", label: "Label", required: true },
        { name: "value", label: "Value", required: true },
        { name: "sortOrder", label: "Sort order", type: "number" },
        { name: "published", label: "Published on website", type: "switch" },
      ]}
    />
  );
}
